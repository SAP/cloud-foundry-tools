/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode";
import * as path from "path";
import * as _ from "lodash";
import { cfGetTargets, CFTarget } from "@sap/cf-tools";
import { getAllServiceInstances } from "./utils";
let cfView: CFView;

export class CFTargetTI extends vscode.TreeItem {
	public iconPath = vscode.ThemeIcon.Folder;
	public contextValue = 'cf-target';

	constructor(
		public readonly target: CFTarget
	) {
		super(target.label, target.isCurrent ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed);
		this.tooltip = target.label;
	}

	get description(): string {
		return `${(this.target.isCurrent ? "<- " : "")}${(this.target.isDirty ? "*" : "")}`;
	}
}

export class CFMessageNode extends vscode.TreeItem { }

export class CFLoginNode extends CFMessageNode {
	public command = { title: "Login", command: "cf.login" };
	public contextValue = 'cf-login-required';
	public iconPath = path.join(__dirname, "..", "resources/common/login.svg");

	constructor() {
		super("Login required", vscode.TreeItemCollapsibleState.None);
	}
}

export class CFTargetNotCurrent extends CFMessageNode {
	public contextValue = 'cf-target-not-current';

	constructor() {
		super("Target needs to be current ", vscode.TreeItemCollapsibleState.None);
	}
}

export class CFService extends vscode.TreeItem {
	public iconPath = vscode.ThemeIcon.File;
	public contextValue = 'cf-service';

	constructor(
		public readonly label: string,
		public readonly type: string) {
		super(label, vscode.TreeItemCollapsibleState.None);
	}
}

export class CFFolder extends vscode.TreeItem {
	public iconPath = vscode.ThemeIcon.Folder;

	constructor(public readonly label: string, public readonly parent: CFTargetTI) {
		super(label, vscode.TreeItemCollapsibleState.Collapsed);
		this.contextValue = label;
		this.tooltip = "CF services";
		this.description = "";
	}
}

export class CFView implements vscode.TreeDataProvider<vscode.TreeItem> {
	public static get(): CFView {
		return cfView;
	}

	public readonly privateonDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<vscode.TreeItem | undefined>();
	public readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this.privateonDidChangeTreeData.event;
	public targets?: CFTargetTI[];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(context: vscode.ExtensionContext, configFilePath: string) {
		// this.subscribeOnFileEventsAndRefresh(context, configFilePath);
		this.refresh();
		cfView = this;
	}

	public refresh() {
		this.privateonDidChangeTreeData.fire();
	}

	public getTreeItem(element: vscode.TreeItem): Promise<vscode.TreeItem> {
		return Promise.resolve(element);
	}

	public async getChildren(parent: vscode.TreeItem): Promise<vscode.TreeItem[]> {
		if (parent) {
			if (parent instanceof CFTargetTI) {
				return [new CFFolder("Services", parent), new CFFolder("Applications", parent)];
			} else if (parent instanceof CFFolder && parent.label === "Services") {
				if (_.get(parent, "parent.target.isCurrent", false)) {
					return getAllServiceInstances({ ups: { isShow: true } }).then((servicesInfo) => {
						return _.map(servicesInfo, si => new CFService(si.label, si.serviceName)); // success
					}, () => [new CFLoginNode()]); // failure
				}

				return [new CFTargetNotCurrent()];
			}

			return [];
		}
		// return list of targets
		return cfGetTargets().then((targets) => {
			this.targets = _.map(targets, target => new CFTargetTI(target));
			return this.targets;
		});
	}

	public getCurrentTarget(): CFTarget | undefined {
		if (this.targets) {
			const currTarget = this.targets.find(target => target.target.isCurrent);
			if (currTarget) {
				return currTarget.target;
			}
		}
	}

	public getTarget(label: string): CFTarget | undefined {
		if (this.targets) {
			const t = this.targets.find(target => target.target.label === label);
			if (t) {
				return t.target;
			}
		}
	}

	// keep temporary as a reference for future usage
	// private async subscribeOnFileEventsAndRefresh(context: vscode.ExtensionContext, configFilePath: string) {
	// 	if (_.size(configFilePath) > 0) {
	// 		const fsw = vscode.workspace.createFileSystemWatcher(configFilePath);
	// 		context.subscriptions.push(fsw.onDidChange(() => this.refresh()));
	// 		context.subscriptions.push(fsw.onDidCreate(() => this.refresh()));
	// 		context.subscriptions.push(fsw.onDidDelete(() => this.refresh()));
	// 	}
	// }
}

