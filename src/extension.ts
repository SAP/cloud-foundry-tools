import * as vscode from "vscode";
import * as _ from "lodash";
import { CFView } from "./cfView";
import { messages } from "./messages";
import {
	cmdLogin, cmdCreateService, cmdCreateTarget,
	cmdCFSetOrgSpace, cmdSelectSpace, cmdCreateUps
} from "./commands";
import {
	cmdDeployServiceAPI, cmdSetCurrentTarget, cmdDeleteTarget, cmdBindLocal, cmdReloadTargets,
	cmdGetSpaceServices, cmdGetUpsServiceInstances, cmdGetServiceInstances, execSetTarget
} from "./cfViewCommands";

import { cfGetConfigFilePath, cfGetConfigFileField, ITarget, cfGetTarget, OK } from "@sap/cf-tools";
import * as fsextra from "fs-extra";
import { DependencyHandler } from "./run-configuration";
import { IRunConfigRegistry } from "@sap/wing-run-config-types";
import { toText } from "./utils";
import { getModuleLogger, initLogger } from "./logger/logger-wrapper";

const LOGGER_MODULE = "extension";
let cfStatusBarItem: vscode.StatusBarItem;
const runConfigExtName = "sap.vscode-wing-run-config";
let treeDataProvider: CFView;

const targetChangedEventEmitter = new vscode.EventEmitter<ITarget | undefined>();
const onDidChangeTarget = targetChangedEventEmitter.event;

async function updateStatusBar(): Promise<boolean | undefined> {
	let isUpdated;
	const beforeText = _.get(cfStatusBarItem, 'text');
	const results = await Promise.all([cfGetConfigFileField("OrganizationFields"), cfGetConfigFileField("SpaceFields")]);
	const orgField = _.get(results, "[0].Name");
	const spaceField = _.get(results, "[1].Name");
	const isNoTarget = _.isEmpty(orgField) && _.isEmpty(spaceField);
	const updatedText = `${isNoTarget ? messages.not_targeted : messages.targeting(orgField, spaceField)}`;

	if (beforeText !== updatedText) {
		_.set(cfStatusBarItem, "text", updatedText);
		if (beforeText) { // eliminate firing event on initialization
			const target = async () => { try { return await cfGetTarget(); } catch (e) { return; } };
			targetChangedEventEmitter.fire(isNoTarget ? undefined : await target());
			isUpdated = true;
		}
	}
	return isUpdated;
}

export function onCFConfigFileChange(): void {
	updateStatusBar().then(isUpdated => {
		if (isUpdated) {
			getModuleLogger(LOGGER_MODULE).debug("onCFConfigFileChange: the Cloud Foundry 'config' file has changed. The status bar will be updated");
			treeDataProvider.refresh();
		}
	});
}

export async function activate(context: vscode.ExtensionContext) {
	await initLogger(context);

	const cfConfigFilePath: string = cfGetConfigFilePath();
	treeDataProvider = new CFView(context, cfConfigFilePath);
	const view = vscode.window.createTreeView("cfView", { treeDataProvider, showCollapseAll: true });

	const loginCmdId = "cf.login";
	context.subscriptions.push(vscode.commands.registerCommand(loginCmdId, async (weak, target) => {
		if (OK === await cmdLogin(weak, target) && false == target) {
			const active = _.find(treeDataProvider.targets, 'target.isCurrent');
			if (active) {
				await execSetTarget(active.target.label);
			}
		}
	}));
	cfStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(cfStatusBarItem);

	// !!!! does not work on theia 1.5.0
	// cfStatusBarItem.command = {command: loginCmdId, arguments: [true], title: ""};
	// start workarround  --> remove following workarround in future theia releases
	context.subscriptions.push(vscode.commands.registerCommand("cf.login.weak", cmdLogin.bind(null, true)));
	// cfStatusBarItem.command = "cf.login.weak";
	// end workarround

	updateStatusBar();

	if (!_.isEmpty(cfConfigFilePath)) {
		fsextra.watchFile(cfConfigFilePath, onCFConfigFileChange);
	}

	// cfStatusBarItem.show();

	context.subscriptions.push(vscode.commands.registerCommand("cf.target.set", cmdSetCurrentTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.create", cmdCreateService));
	context.subscriptions.push(vscode.commands.registerCommand("cf.ups.create", cmdCreateUps));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind.local", cmdBindLocal));
	context.subscriptions.push(vscode.commands.registerCommand("cf.set.orgspace", cmdCFSetOrgSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.create", async () => {
		const target = await cmdCreateTarget();
		if (target) {
			setTimeout(() => {
				const treeItem = _.find(treeDataProvider.targets, ['label', target]);
				if (treeItem) {
					view.reveal(treeItem, { select: true, focus: true, expand: true });
				}
			}, 400);
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand("cf.target.delete", cmdDeleteTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.reload", cmdReloadTargets));
	context.subscriptions.push(vscode.commands.registerCommand("cf.select.space", cmdSelectSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.deploy-service.api", cmdDeployServiceAPI));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.get-space-services", cmdGetSpaceServices));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.get-ups-services", cmdGetUpsServiceInstances));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.get-services", cmdGetServiceInstances));

	let platformExtension: vscode.Extension<IRunConfigRegistry> = vscode.extensions.getExtension<IRunConfigRegistry>(runConfigExtName);
	if (platformExtension) {
		if (!platformExtension.isActive) {
			try {
				await platformExtension.activate();
			} catch (e) {
				platformExtension = undefined;
				getModuleLogger(LOGGER_MODULE).error("activate <%s> extension fails", runConfigExtName, { exception: toText(e) });
			}
		}
		if (platformExtension) {
			const genericDependencyHandler = new DependencyHandler("cf-tools-rsource-dependency");
			platformExtension.exports.registerDependency(genericDependencyHandler);
			context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind", genericDependencyHandler.bind));
			context.subscriptions.push(vscode.commands.registerCommand("cf.services.unbind", genericDependencyHandler.unbind));
			context.subscriptions.push(vscode.commands.registerCommand("cf.services.binding.state", genericDependencyHandler.getBindState));
		}
	}
	else {
		getModuleLogger(LOGGER_MODULE).error("activate: the <%s> extension has not been set", runConfigExtName);
	}
	return {
		// allows to external extensions to listen onDidChangeTarget event 
		onDidChangeTarget
	};
}

export function deactivate() {
	const cfConfigFilePath = cfGetConfigFilePath();
	if (cfConfigFilePath) {
		fsextra.unwatchFile(cfConfigFilePath);
	}
}
