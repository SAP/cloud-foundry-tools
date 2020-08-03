/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode"; // NOSONAR
import * as _ from "lodash";
import { CFView } from "./cfView";
import { messages } from "./messages";
import {
	cmdLogin, cmdCreateService, cmdCreateTarget,
	cmdCFSetOrgSpace, cmdSelectSpace
} from "./commands";
import { cmdDeployServiceAPI, cmdSetCurrentTarget, cmdDeleteTarget, cmdBindLocal, cmdReloadTargets } from "./cfViewCommands";

import { cfGetConfigFilePath, cfGetConfigFileField } from "@sap/cf-tools";
import * as fsextra from "fs-extra";
import { DependencyHandler } from "./run-configuration";
/** import { RunConfigHandler } from "./run-configuration-example"; */
import { IRunConfigRegistry } from "@sap/wing-run-config-types";
import { getOutputChannel } from "./utils";

let cfStatusBarItem: vscode.StatusBarItem;
const extensionName = "vscode-wing-cf-tools";
const runConfigExtName = "sap.vscode-wing-run-config";
let treeDataProvider: CFView;

async function updateStatusBar() {
	const results = await Promise.all([cfGetConfigFileField("OrganizationFields"), cfGetConfigFileField("SpaceFields")]);
	const orgField = _.get(results, "[0].Name");
	const spaceField = _.get(results, "[1].Name");
	const notTargeted: boolean = _.isEmpty(orgField) && _.isEmpty(spaceField);
	_.set(cfStatusBarItem, "text", (notTargeted ? messages.not_targeted : messages.targeting(orgField, spaceField)));
}

export function onCFConfigFileChange() {
	getOutputChannel().appendLine(messages.cf_config_changed);
	updateStatusBar();
	if (treeDataProvider) {  // unneccessary: keep it because tests
		treeDataProvider.refresh();
	}
}

export function activate(context: vscode.ExtensionContext) {
	getOutputChannel().appendLine(messages.activation_extension(extensionName));
	const cfConfigFilePath: string = cfGetConfigFilePath();

	treeDataProvider = new CFView(context, cfConfigFilePath);
	vscode.window.registerTreeDataProvider("cfView", treeDataProvider);

	getOutputChannel().appendLine(messages.extension_active(extensionName));

	const loginCmdId = "cf.login";
	context.subscriptions.push(vscode.commands.registerCommand(loginCmdId, cmdLogin));
	cfStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(cfStatusBarItem);

	cfStatusBarItem.command = loginCmdId;
	updateStatusBar();

	if (!_.isEmpty(cfConfigFilePath)) {
		fsextra.watchFile(cfConfigFilePath, onCFConfigFileChange);
	}

	cfStatusBarItem.show();

	context.subscriptions.push(vscode.commands.registerCommand("cf.target.set", cmdSetCurrentTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.create", cmdCreateService));
	context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind.local", cmdBindLocal));
	context.subscriptions.push(vscode.commands.registerCommand("cf.set.orgspace", cmdCFSetOrgSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.create", cmdCreateTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.target.delete", cmdDeleteTarget));
	context.subscriptions.push(vscode.commands.registerCommand("cf.targets.reload", cmdReloadTargets));
	context.subscriptions.push(vscode.commands.registerCommand("cf.select.space", cmdSelectSpace));
	context.subscriptions.push(vscode.commands.registerCommand("cf.deploy-service.api", cmdDeployServiceAPI));

	const platformExtension: vscode.Extension<IRunConfigRegistry> = vscode.extensions.getExtension<IRunConfigRegistry>(runConfigExtName);
	// register dependency handler
	if (platformExtension) {
		/** platformExtension.exports.registerRunConfig(new RunConfigHandler("cf-handler")); */
		const genericDependencyHandler = new DependencyHandler("cf-tools-rsource-dependency");
		platformExtension.exports.registerDependency(genericDependencyHandler);
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.bind", genericDependencyHandler.bind));
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.unbind", genericDependencyHandler.unbind));
		context.subscriptions.push(vscode.commands.registerCommand("cf.services.binding.state", genericDependencyHandler.getBindState));
	}
	else {
		getOutputChannel().appendLine(messages.ext_not_set(runConfigExtName));
	}
}

export function deactivate() {
	const cfConfigFilePath = cfGetConfigFilePath();
	if (cfConfigFilePath) {
		fsextra.unwatchFile(cfConfigFilePath);
	}
}

export function getExtensionName(): string {
	return extensionName;
}
