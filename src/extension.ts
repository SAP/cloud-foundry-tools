/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import { CFView } from "./cfView";
import { messages } from "./messages";
import {
	cmdLogin, cmdCreateService, cmdCreateTarget,
	cmdCFSetOrgSpace, cmdSelectSpace, cmdCreateUps
} from "./commands";
import { cmdDeployServiceAPI, cmdSetCurrentTarget, cmdDeleteTarget, cmdBindLocal, cmdReloadTargets, cmdGetSpaceServices } from "./cfViewCommands";

import { cfGetConfigFilePath, cfGetConfigFileField } from "@sap/cf-tools";
import * as fsextra from "fs-extra";
import { DependencyHandler } from "./run-configuration";
import { IRunConfigRegistry } from "@sap/wing-run-config-types";
import { createLoggerAndSubscribeToLogSettingsChanges, getModuleLogger } from "./logger/logger-wrapper";

const LOGGER_MODULE = "extension";
let cfStatusBarItem: vscode.StatusBarItem;
const runConfigExtName = "sap.vscode-wing-run-config";
let treeDataProvider: CFView;

async function updateStatusBar() {
	const results = await Promise.all([cfGetConfigFileField("OrganizationFields"), cfGetConfigFileField("SpaceFields")]);
	const orgField = _.get(results, "[0].Name");
	const spaceField = _.get(results, "[1].Name");
	const updatedText = `$(home) ${ _.isEmpty(orgField) && _.isEmpty(spaceField) ? messages.not_targeted : messages.targeting(orgField, spaceField)}`;

	if (_.get(cfStatusBarItem, 'text') !== updatedText) {
		_.set(cfStatusBarItem, "text", updatedText);
	}
}

export function onCFConfigFileChange() {
	getModuleLogger(LOGGER_MODULE).debug("onCFConfigFileChange: the Cloud Foundry 'config' file has changed. The status bar will be updated");
	updateStatusBar();
	treeDataProvider.refresh();
}

export function activate(context: vscode.ExtensionContext) {
	createLoggerAndSubscribeToLogSettingsChanges(context);

	const cfConfigFilePath: string = cfGetConfigFilePath();
	treeDataProvider = new CFView(context, cfConfigFilePath);
	vscode.window.registerTreeDataProvider("cfView", treeDataProvider);

	const loginCmdId = "cf.login";
	context.subscriptions.push(vscode.commands.registerCommand(loginCmdId, cmdLogin));
	cfStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(cfStatusBarItem);

	// !!!! does not work on theia 1.5.0
	// cfStatusBarItem.command = {command: loginCmdId, arguments: [true], title: ""};
	// start workarround  --> remove following workarround in future theia releases
	context.subscriptions.push(vscode.commands.registerCommand("cf.login.weak", cmdLogin.bind(null, true)));
	cfStatusBarItem.command = "cf.login.weak";
	// end workarround

	updateStatusBar();

	if (!_.isEmpty(cfConfigFilePath)) {
		fsextra.watchFile(cfConfigFilePath, onCFConfigFileChange);
	}

	cfStatusBarItem.show();

	context.subscriptions.push(vscode.commands.registerCommand("cf.target.set", cmdSetCurrentTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.create", cmdCreateService));
	context.subscriptions.push(vscode.commands.registerCommand("cf.ups.create", cmdCreateUps));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind.local", cmdBindLocal));
	context.subscriptions.push(vscode.commands.registerCommand("cf.set.orgspace", cmdCFSetOrgSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.create", cmdCreateTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.target.delete", cmdDeleteTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.reload", cmdReloadTargets));
	context.subscriptions.push(vscode.commands.registerCommand("cf.select.space", cmdSelectSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.deploy-service.api", cmdDeployServiceAPI));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.get-space-services", cmdGetSpaceServices));

	const platformExtension: vscode.Extension<IRunConfigRegistry> = vscode.extensions.getExtension<IRunConfigRegistry>(runConfigExtName);
	if (platformExtension) {
		const genericDependencyHandler = new DependencyHandler("cf-tools-rsource-dependency");
		platformExtension.exports.registerDependency(genericDependencyHandler);
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind", genericDependencyHandler.bind));
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.unbind", genericDependencyHandler.unbind));
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.binding.state", genericDependencyHandler.getBindState));
	}
	else {
		getModuleLogger(LOGGER_MODULE).error("activate: the <%s> extension has not been set", runConfigExtName);
	}
}

export function deactivate() {
	const cfConfigFilePath = cfGetConfigFilePath();
	if (cfConfigFilePath) {
		fsextra.unwatchFile(cfConfigFilePath);
	}
}
