import * as vscode from "vscode";
import * as path from "path";
import * as _ from "lodash";
import { cfGetApps, cfGetServiceInstancesList, cfGetTargets, CFTarget } from "@sap/cf-tools";
let cfView: CFView;

export class CFTargetTI extends vscode.TreeItem {
	public contextValue = `cf-target${this.target.isCurrent ? '-active' : ''}`;

	constructor(
		public readonly target: CFTarget
	) {
		super({ label: target.label }, target.isCurrent ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed);
		this.tooltip = target.label;
		this.iconPath = {
			light: path.join(__dirname, '..', 'resources', 'light', `cftarget${this.target.isCurrent ? '-a' : ''}.svg`),
			dark: path.join(__dirname, '..', 'resources', 'dark', `cftarget${this.target.isCurrent ? '-a' : ''}.svg`)
		};
	}

	get description(): string {
		return `${(this.target.isCurrent ? "(Active Target)" : "")}${(this.target.isDirty ? "*" : "")}`;
	}
}

export class CFMessageNode extends vscode.TreeItem { }

export class CFLoginNode extends CFMessageNode {
	public command = { title: "Login", command: "cf.login" };
	public contextValue = 'cf-login-required';
	public iconPath = {
		light: path.join(__dirname, '..', 'resources', 'light', 'login.svg'),
		dark: path.join(__dirname, '..', 'resources', 'dark', 'login.svg')
	};
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

export class CFApplication extends vscode.TreeItem {
	public iconPath = vscode.ThemeIcon.File;
	public contextValue = 'cf-application';

	constructor(
		public readonly label: string,
		public readonly state: string) {
		super(label, vscode.TreeItemCollapsibleState.None);
	}
}

export class CFFolder extends vscode.TreeItem {
	public iconPath = vscode.ThemeIcon.Folder;

	constructor(public readonly label: string) {
		super(label, vscode.TreeItemCollapsibleState.Collapsed);
	}
}

export class CFServicesFolder extends CFFolder {
	constructor(public readonly label: string, public readonly parent: CFTargetTI) {
		super(label);
		this.contextValue = 'services';
		this.tooltip = `CF ${label}`;
	}
}

export class CFAppsFolder extends CFFolder {
	constructor(public readonly label: string, public readonly parent: CFTargetTI) {
		super(label);
		this.contextValue = 'apps';
		this.tooltip = `CF ${label}`;
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
		this.privateonDidChangeTreeData.fire(undefined);
	}

	public getTreeItem(element: vscode.TreeItem): Promise<vscode.TreeItem> {
		if (/^cf-(service|application)$/.test(element.contextValue)) {
			const item = _.cloneDeep(element);
			item.label = element.contextValue === 'cf-application'
				? `${element.label} (${(element as CFApplication).state})`
				: `${element.label} (${(element as CFService).type})`;
			return Promise.resolve(item);
		}
		return Promise.resolve(element);
	}

	public async getChildren(parent: vscode.TreeItem): Promise<vscode.TreeItem[]> {
		if (parent) {
			if (parent instanceof CFTargetTI) {
				return [new CFServicesFolder("Services", parent), new CFAppsFolder("Applications", parent)];
			} else if (/^(services|apps)$/.test(parent.contextValue)) {
				if (_.get(parent, "parent.target.isCurrent")) {
					try {
						return parent instanceof CFAppsFolder 
							? _.map(await cfGetApps(), app => new CFApplication(app.name, _.get(app, 'state')))
							: _.map(await cfGetServiceInstancesList(), service => new CFService(service.label, service.serviceName));
					} catch (e) {
						return [new CFLoginNode()];
					}
				} else {
					return [new CFTargetNotCurrent()];
				}
			}
			return [];
		}
		// return list of targets
		this.targets = _.map(await cfGetTargets(), target => new CFTargetTI(target));
		return this.targets;
	}

	public getCurrentTarget(): CFTarget | undefined {
		return _.get(_.find(this.targets, 'target.isCurrent'), 'target');
	}

	// keep temporary as a reference for future usage
	// private subscribeOnFileEventsAndRefresh(context: vscode.ExtensionContext, configFilePath: string) {
	// 	if (_.size(configFilePath) > 0) {
	// 		const fsw = vscode.workspace.createFileSystemWatcher(configFilePath);
	// 		context.subscriptions.push(fsw.onDidChange(() => this.refresh()));
	// 		context.subscriptions.push(fsw.onDidCreate(() => this.refresh()));
	// 		context.subscriptions.push(fsw.onDidDelete(() => this.refresh()));
	// 	}
	// }
}

