// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as extension from "../extension";
import * as path from "path";
import * as fs from "fs";
import { RpcExtension } from "@sap-devx/webview-rpc/out.ext/rpc-extension";
import { getModuleLogger } from "../logger/logger-wrapper";
import {
  cfGetAvailableOrgs,
  cfGetAvailableSpaces,
  cfGetConfigFileField,
  cfGetTarget,
  cfLogin,
  cfLogout,
  CredentialsLoginOptions,
  ITarget,
  OK,
  SSOLoginOptions,
  Organization,
  cfSetOrgSpace,
  Space,
} from "@sap/cf-tools";
import * as _ from "lodash";
import { messages } from "../messages";
import { join, sep } from "path";

export let _rpc: RpcExtension;

let currentTarget: ITarget | undefined;
let initTarget: { endpoint: string | undefined; org?: string | undefined; space?: string | undefined };

const LOGGER_MODULE = "loginTargetView";

export function openLoginView(endpoint?: string, org?: string, space?: string): Promise<string | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initTarget = {
    endpoint: endpoint,
    org: org,
    space: space,
  };

  const panel = vscode.window.createWebviewPanel("cfLogin", "Cloud Foundry Sign In", vscode.ViewColumn.Beside, {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.file(path.join(extension.getPath(), "dist", "media"))],
  });

  const extensionPath = extension.getPath();
  const mediaPath = join(extensionPath, "dist", "media");
  const htmlFileName = "index.html";

  let indexHtml = fs.readFileSync(join(mediaPath, htmlFileName), "utf8");
  if (indexHtml) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.file(join(mediaPath, sep));
    const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

    // TODO: very fragile: assuming double quotes and src is first attribute
    // specifically, doesn't work when building vue for development (vue-cli-service build --mode development)
    indexHtml = indexHtml
      .replace(/<link href=/g, `<link href=${scriptUri.toString()}`)
      .replace(/<script src=/g, `<script src=${scriptUri.toString()}`)
      .replace(/<img src=/g, `<img src=${scriptUri.toString()}`);
  }

  panel.webview.html = indexHtml;

  _rpc = new RpcExtension(panel.webview);
  _rpc.registerMethod({ func: init });
  _rpc.registerMethod({ func: loginClick });
  _rpc.registerMethod({ func: logoutClick });
  _rpc.registerMethod({ func: getSelectedTarget });
  _rpc.registerMethod({ func: getOrgs });
  _rpc.registerMethod({ func: getSpaces });
  _rpc.registerMethod({ func: applyTarget });

  return Promise.resolve("");
}

async function init() {
  currentTarget = await getTarget();

  initTarget.endpoint = initTarget?.endpoint
    ? initTarget?.endpoint
    : currentTarget && currentTarget["api endpoint"]
    ? currentTarget["api endpoint"]
    : await getCFDefaultLandscape();

  return {
    defaultEndpoint: initTarget.endpoint,
    isLoggedIn: currentTarget !== undefined,
    passcodeUrl: calculatePasscodeUrl(initTarget.endpoint),
  };
}

async function getTarget(): Promise<ITarget | undefined> {
  // TODO: need to pass the endpoint to check if logged-in to correct endpoint.
  try {
    const target = (await invokeLongFunctionWithProgressForm(cfGetTarget, false)) as ITarget;
    return target;
  } catch (e) {
    // getModuleLogger(LOGGER_MODULE).error("no auth token", { exception: toText(e) }, { options: options });
    console.log("need to login...");
    // not logged in so need to show the login section
    return undefined;
  }
  //logged in then need to show the target section
}

async function getCFDefaultLandscape(): Promise<string> {
  const apiFromEnv = _.get(process, "env.CF_API_ENDPOINT", "") as string;
  const apiFromFile = (await cfGetConfigFileField("Target")) as string;

  return apiFromEnv || apiFromFile;
}

function calculatePasscodeUrl(endpoint: string): string {
  return endpoint.replace(/api./g, "login.") + "/passcode";
}

async function loginClick(payload: SSOLoginOptions | CredentialsLoginOptions) {
  const result: string = await invokeLongFunctionWithProgressForm(cfLogin, payload);
  if (OK !== result) {
    throw new Error(messages.authentication_failed(result));
  }
  void vscode.window.showInformationMessage(messages.login_success);
  getModuleLogger(LOGGER_MODULE).debug("executeLogin: login succeeded");

  return true;
}

async function logoutClick() {
  try {
    await invokeLongFunctionWithProgressForm(cfLogout);
    currentTarget = undefined;
    getModuleLogger(LOGGER_MODULE).debug("executeLogout: logout succeeded");
  } catch (error) {
    getModuleLogger(LOGGER_MODULE).error("executeLogout: logout error", error);
    return false;
  }
  return true;
}

function getSelectedTarget() {
  return {
    endpoint: currentTarget?.["api endpoint"],
    org: currentTarget?.org,
    space: currentTarget?.space,
  };
}

function getOrgs(): Promise<Organization[]> {
  try {
    const orgs: Promise<Organization[]> = invokeLongFunctionWithProgressForm(cfGetAvailableOrgs);
    getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableOrgs: get avaliable orgs succeeded");
    return orgs;
  } catch (error) {
    getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableOrgs: get avaliable orgs failed", error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Promise.resolve([]);
  }
}

async function getSpaces(org: string): Promise<Space[]> {
  try {
    const spaces: Promise<Space[]> = invokeLongFunctionWithProgressForm(cfGetAvailableSpaces, org);
    getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableSpaces: get avaliable spaces succeeded");
    return spaces;
  } catch (error) {
    getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableSpaces: get avaliable spaces failed", error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Promise.resolve([]);
  }
}

async function applyTarget(org: string, space: string) {
  try {
    await invokeLongFunctionWithProgressForm(cfSetOrgSpace, org, space);
    getModuleLogger(LOGGER_MODULE).debug("executeSetOrgSpace: set org & spaces succeeded");
  } catch (error) {
    getModuleLogger(LOGGER_MODULE).error("executeSetOrgSpace: set org & spaces failed", error);
    return "Error";
  }
}

export async function invokeLongFunctionWithProgressForm(longFunction: Function, ...args: any): Promise<any> {
  await _rpc.invoke("setBusyIndicator", [true]);
  try {
    const ret = await longFunction(...args);
    await _rpc.invoke("setBusyIndicator", [false]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ret;
  } catch (error) {
    await _rpc.invoke("setBusyIndicator", [false]);
    throw error;
  }
}
