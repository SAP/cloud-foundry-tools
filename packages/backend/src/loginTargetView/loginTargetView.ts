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
import { messages } from "../messages";
import { join, sep } from "path";
import { cfendpoint } from "@sap/bas-sdk";

let loginTarget: LoginTarget | undefined;
// let _rpc: RpcExtension;

// let currentTarget: ITarget | undefined;
let initTarget: { endpoint: string | undefined; org?: string | undefined; space?: string | undefined };
let panel: vscode.WebviewPanel | undefined;
let isLoginOnly: boolean | undefined;
let cmdLoginResult: string | undefined;

const LOGGER_MODULE = "loginTargetView";

export function openLoginView(
  opts: { isSplit: boolean; isLoginOnly?: boolean },
  endpoint?: string,
  org?: string,
  space?: string
): Promise<string | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initTarget = {
    endpoint: endpoint,
    org: org,
    space: space,
  };
  isLoginOnly = opts.isLoginOnly;
  // Every time the view is opened need to recalculate the login result
  cmdLoginResult = undefined;

  return new Promise<string | undefined>((resolve, reject) => {
    try {
      const split = opts.isSplit ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;
      panel = panel
        ? panel
        : vscode.window.createWebviewPanel("cfLogin", "Cloud Foundry Sign In", split, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extension.getPath(), "dist", "media"))],
          });
      panel.reveal();
      panel.onDidDispose(() => {
        resolve(cmdLoginResult);
        panel = undefined;
        loginTarget = undefined;
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

      loginTarget = new LoginTarget(panel);
      // _rpc.registerMethod({ func: init });
      // _rpc.registerMethod({ func: loginClick });
      // _rpc.registerMethod({ func: logoutClick });
      // _rpc.registerMethod({ func: getSelectedTarget });
      // _rpc.registerMethod({ func: getOrgs });
      // _rpc.registerMethod({ func: getSpaces });
      // _rpc.registerMethod({ func: applyTarget });
      // _rpc.registerMethod({ func: openPasscodeLink });
    } catch (e) {
      reject(e.toString());
    }
  });
}

class LoginTarget {
  private rpc: RpcExtension;
  private currentTarget: ITarget | undefined;

  constructor(private readonly panel: vscode.WebviewPanel) {
    this.rpc = new RpcExtension(panel.webview);
    this.rpc.registerMethod({ func: this.init });
    this.rpc.registerMethod({ func: this.loginClick });
    this.rpc.registerMethod({ func: this.logoutClick });
    this.rpc.registerMethod({ func: this.getSelectedTarget });
    this.rpc.registerMethod({ func: this.getOrgs });
    this.rpc.registerMethod({ func: this.getSpaces });
    this.rpc.registerMethod({ func: this.applyTarget });
    this.rpc.registerMethod({ func: this.openPasscodeLink });
  }

  private async getTarget(): Promise<ITarget | undefined> {
    // TODO: need to pass the endpoint to check if logged-in to correct endpoint.
    try {
      const target = (await this.invokeLongFunctionWithProgressForm(cfGetTarget, false)) as ITarget;
      return target;
    } catch (e) {
      // getModuleLogger(LOGGER_MODULE).error("no auth token", { exception: toText(e) }, { options: options });
      console.log("need to login...");
      // not logged in so need to show the login section
      return undefined;
    }
    //logged in then need to show the target section
  }

  private getCFDefaultLandscape(): Promise<string> {
    return cfGetConfigFileField("Target").then((cfgEndpoint: string) => {
      return cfgEndpoint || cfendpoint.getCFEndpoint();
    });
  }

  private calculatePasscodeUrl(endpoint: string): string {
    return endpoint.replace(/api./g, "login.") + "/passcode";
  }

  async init(): Promise<any> {
    this.currentTarget = await this.getTarget();

    initTarget.endpoint = initTarget?.endpoint
      ? initTarget?.endpoint
      : this.currentTarget && this.currentTarget["api endpoint"]
      ? this.currentTarget["api endpoint"]
      : await this.getCFDefaultLandscape();

    return {
      defaultEndpoint: initTarget.endpoint,
      isLoggedIn: this.currentTarget !== undefined,
      passcodeUrl: this.calculatePasscodeUrl(initTarget.endpoint),
      currentOrg: this.currentTarget?.org,
      currentSpace: this.currentTarget?.space,
    };
  }

  async loginClick(payload: SSOLoginOptions | CredentialsLoginOptions) {
    cmdLoginResult = await this.invokeLongFunctionWithProgressForm(cfLogin, payload);
    if (OK !== cmdLoginResult) {
      void vscode.window.showErrorMessage(messages.login_failed);
      return false;
    }
    void vscode.window.showInformationMessage(messages.login_success);
    getModuleLogger(LOGGER_MODULE).debug("executeLogin: login succeeded");

    if (isLoginOnly) {
      setTimeout(() => {
        panel?.dispose();
      });
    }

    return true;
  }

  async logoutClick() {
    try {
      await this.invokeLongFunctionWithProgressForm(cfLogout);
      this.currentTarget = undefined;
      void vscode.window.showInformationMessage(messages.logout_success);
      getModuleLogger(LOGGER_MODULE).debug("executeLogout: logout succeeded");
    } catch (error) {
      getModuleLogger(LOGGER_MODULE).error("executeLogout: logout error", error);
      return false;
    }
    return true;
  }

  getSelectedTarget() {
    return {
      endpoint: this.currentTarget?.["api endpoint"],
      org: this.currentTarget?.org,
      space: this.currentTarget?.space,
    };
  }

  getOrgs(): Promise<Organization[]> {
    return cfGetAvailableOrgs()
      .then((orgs: Organization[]) => {
        getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableOrgs: get avaliable orgs succeeded");
        return orgs;
      })
      .catch((error) => {
        getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableOrgs: get avaliable orgs failed", error);
        return [];
      });
  }

  getSpaces(org: string): Promise<Space[]> {
    return cfGetAvailableSpaces(org)
      .then((spaces: Space[]) => {
        getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableSpaces: get avaliable spaces succeeded");
        return spaces;
      })
      .catch((error) => {
        getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableSpaces: get avaliable spaces failed", error);
        return [];
      });
  }

  async applyTarget(org: string, space: string) {
    try {
      await cfSetOrgSpace(org, space);
      cmdLoginResult = OK;
      void vscode.window.showInformationMessage(messages.success_set_org_space);
      getModuleLogger(LOGGER_MODULE).debug("executeSetOrgSpace: set org & spaces succeeded");
      panel?.dispose();
    } catch (error) {
      cmdLoginResult = undefined;
      getModuleLogger(LOGGER_MODULE).error("executeSetOrgSpace: set org & spaces failed", error);
      return "Error";
    }
  }

  openPasscodeLink(endpoint: string) {
    void vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(this.calculatePasscodeUrl(endpoint)));
  }

  async invokeLongFunctionWithProgressForm(longFunction: Function, ...args: any): Promise<any> {
    try {
      await this.rpc.invoke("setBusyIndicator", [true]);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
      return await longFunction(...args);
    } finally {
      await this.rpc.invoke("setBusyIndicator", [false]);
    }
  }
}

// async function init() {
//   currentTarget = await getTarget();

//   initTarget.endpoint = initTarget?.endpoint
//     ? initTarget?.endpoint
//     : currentTarget && currentTarget["api endpoint"]
//       ? currentTarget["api endpoint"]
//       : await getCFDefaultLandscape();

//   return {
//     defaultEndpoint: initTarget.endpoint,
//     isLoggedIn: currentTarget !== undefined,
//     passcodeUrl: calculatePasscodeUrl(initTarget.endpoint),
//     currentOrg: currentTarget?.org,
//     currentSpace: currentTarget?.space,
//   };
// }

// async function getTarget(): Promise<ITarget | undefined> {
//   // TODO: need to pass the endpoint to check if logged-in to correct endpoint.
//   try {
//     const target = (await invokeLongFunctionWithProgressForm(cfGetTarget, false)) as ITarget;
//     return target;
//   } catch (e) {
//     // getModuleLogger(LOGGER_MODULE).error("no auth token", { exception: toText(e) }, { options: options });
//     console.log("need to login...");
//     // not logged in so need to show the login section
//     return undefined;
//   }
//   //logged in then need to show the target section
// }

// function getCFDefaultLandscape(): Promise<string> {
//   return cfGetConfigFileField("Target").then((cfgEndpoint: string) => {
//     return cfgEndpoint || cfendpoint.getCFEndpoint();
//   });
// }

// function calculatePasscodeUrl(endpoint: string): string {
//   return endpoint.replace(/api./g, "login.") + "/passcode";
// }

// async function loginClick(payload: SSOLoginOptions | CredentialsLoginOptions) {
//   cmdLoginResult = await invokeLongFunctionWithProgressForm(cfLogin, payload);
//   if (OK !== cmdLoginResult) {
//     void vscode.window.showErrorMessage(messages.login_failed);
//     return false;
//   }
//   void vscode.window.showInformationMessage(messages.login_success);
//   getModuleLogger(LOGGER_MODULE).debug("executeLogin: login succeeded");

//   if (isLoginOnly) {
//     setTimeout(() => {
//       panel?.dispose();
//     });
//   }

//   return true;
// }

// async function logoutClick() {
//   try {
//     await invokeLongFunctionWithProgressForm(cfLogout);
//     currentTarget = undefined;
//     void vscode.window.showInformationMessage(messages.logout_success);
//     getModuleLogger(LOGGER_MODULE).debug("executeLogout: logout succeeded");
//   } catch (error) {
//     getModuleLogger(LOGGER_MODULE).error("executeLogout: logout error", error);
//     return false;
//   }
//   return true;
// }

// function getSelectedTarget() {
//   return {
//     endpoint: currentTarget?.["api endpoint"],
//     org: currentTarget?.org,
//     space: currentTarget?.space,
//   };
// }

// function getOrgs(): Promise<Organization[]> {
//   return cfGetAvailableOrgs()
//     .then((orgs: Organization[]) => {
//       getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableOrgs: get avaliable orgs succeeded");
//       return orgs;
//     })
//     .catch((error) => {
//       getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableOrgs: get avaliable orgs failed", error);
//       return [];
//     });
// }

// function getSpaces(org: string): Promise<Space[]> {
//   return cfGetAvailableSpaces(org)
//     .then((spaces: Space[]) => {
//       getModuleLogger(LOGGER_MODULE).debug("executeGetAvaliableSpaces: get avaliable spaces succeeded");
//       return spaces;
//     })
//     .catch((error) => {
//       getModuleLogger(LOGGER_MODULE).error("executeGetAvaliableSpaces: get avaliable spaces failed", error);
//       return [];
//     });
// }

// async function applyTarget(org: string, space: string) {
//   try {
//     await cfSetOrgSpace(org, space);
//     cmdLoginResult = OK;
//     void vscode.window.showInformationMessage(messages.success_set_org_space);
//     getModuleLogger(LOGGER_MODULE).debug("executeSetOrgSpace: set org & spaces succeeded");
//     panel?.dispose();
//   } catch (error) {
//     cmdLoginResult = undefined;
//     getModuleLogger(LOGGER_MODULE).error("executeSetOrgSpace: set org & spaces failed", error);
//     return "Error";
//   }
// }

// function openPasscodeLink(endpoint: string) {
//   void vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(calculatePasscodeUrl(endpoint)));
// }

// export async function invokeLongFunctionWithProgressForm(longFunction: Function, ...args: any): Promise<any> {
//   try {
//     await _rpc?.invoke("setBusyIndicator", [true]);
//     /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
//     return await longFunction(...args);
//   } finally {
//     await _rpc?.invoke("setBusyIndicator", [false]);
//   }
// }

// for testing purpose only
export const internal = {
  // getCFDefaultLandscape,
  // getOrgs,
  // getSpaces,
  // calculatePasscodeUrl,
  // _rpc,
  LoginTarget,
};
