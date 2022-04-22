/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as _ from "lodash";
// eslint-disable-next-line import/no-unresolved
import * as vscode from "vscode";
import * as path from "path";
import { platform } from "os";
export const isWindows = platform().includes("win");

const testRegisteredCommands = {};
export function getTestRegisteredCommands() {
    return testRegisteredCommands;
}

let privateOnDidChangeTreeData: any;
export function getTestPrivateOnDidChangeTreeData() {
    return privateOnDidChangeTreeData;
}
let treeProvider: any;
export function getTestTreeProvider() {
    return treeProvider;
}
const treeView: any = {
    reveal: () => { return; }
};
export function getTestTreeView() {
    return treeView;
}

let aListeners: any[] = [];
export function getTestListeners() {
    return aListeners;
}
export function setTestListeners(data: any[]) {
    aListeners = data;
}

let configs = {};
export function setTestConfigs(data: any) {
    configs = data;
}

class Uri {
    public static file(testpath: string): vscode.Uri {
        return new Uri("file", "", testpath || (isWindows ? '\\' : '/'), "", "");
    } public readonly path: string;
    public readonly scheme: string;
    public readonly authority: string;
    public readonly query: string;
    public readonly fragment: string;
    public readonly fsPath: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private constructor(scheme: string, authority: string, testpath: string, query: string, fragment: string) {
        this.fsPath = testpath; this.scheme = scheme; this.path = ''; this.authority = ''; this.query = ''; this.fragment = '';
    }
    public with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri {
        return new Uri("", "", change.path||'', "", "");
    }
    public toString(skipEncoding?: boolean): string { return ""; }
    public toJSON(): any { return {}; }
}

class RelativePattern {
    base: string;
    pattern: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(base: any, pattern: string) { this.base = base; this.pattern = pattern; }
}

function _path2Uri(extPath: string): { uri: Uri; name: string; index: number } {
    return _.set({ uri: Uri.file(extPath), name: extPath, index: 0 }, ["uri", "fsPath"], extPath);
}
const roots = [
    _path2Uri(path.resolve("workspace")),
    _path2Uri(path.resolve("project-test"))
];

let selectedQuickPicks: any;
export function getTestSelectedQuickPicks() {
    return selectedQuickPicks;
}
export function setTestSelectedQuickPicks(data: any) {
    selectedQuickPicks = data;
}

export const testVscode = {
    Uri,
    RelativePattern,
    Progress: {
        report: () => { return; }
    },
    ProgressLocation: { Window: 10, Notification: 15 },
    debug: {
        startDebugging: () => Promise.resolve()
    },
    TreeItemCollapsibleState: { Collapsed: 1, Expanded: 2, None: 0 },
    commands: {
        registerCommand: (id: string, cmd: any) => { _.set(testRegisteredCommands, id, cmd); return Promise.resolve(testRegisteredCommands); },
        executeCommand: () => Promise.reject()
    },
    window: {
        showTextDocument: (resourcePath: vscode.Uri) => { return; },
        showInformationMessage: () => Promise.resolve(),
        showInputBox: () => Promise.resolve(),
        showErrorMessage: () => Promise.reject(),
        registerTreeDataProvider: (id: string, provider: any) => { return; },
        showQuickPick: () => Promise.resolve(selectedQuickPicks),
        showWarningMessage: (message: string) => { return; },
        withProgress: (options: vscode.ProgressOptions, task: (progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken)
            => Thenable<any>) => Promise.resolve(),
        createTreeView: (id: string, options: any) => {
            treeProvider = options.treeDataProvider;
            privateOnDidChangeTreeData = treeProvider.privateOnDidChangeTreeData;
            privateOnDidChangeTreeData.fire = () => { return; };
            treeProvider.findTreeItem = () => Promise.resolve();
            treeProvider.matchItems = () => Promise.resolve([]);
            return treeView;
        },
        showOpenDialog: () => Promise.reject(),
        createOutputChannel: (name: string) => { return; },
        createStatusBarItem: () => ""
    },
    workspace: {
        rootPath: path.resolve("."),
        workspaceFolders: roots,
        getConfiguration: () => configs,
        onDidChangeWorkspaceFolders: (listener: (e: any) => any) => { aListeners.push(listener); },
        onDidChangeConfiguration: () => { return; },
        onDidChangeTextDocument: (listener: any) => { return; },
        getWorkspaceFolder: (folderPath: vscode.Uri) => {
            const fsPath = _.get(folderPath, "fsPath");
            return _.set({ uri: testVscode.Uri.file(fsPath), name: _.last(_.split(fsPath, "\\")), index: 0 }, ["uri", "fsPath"], fsPath);
        },
        findFiles: () => Promise.reject()
    },
    TreeItem: class MockTreeItem {
        public readonly label?: string;
        public contextValue?: string;
        constructor(label?: string) {
            if (label) {
                this.label = label;
            }
        }
    },
    Position: class MockPossition {
        public readonly line: number;
        public readonly character: number;
        constructor(line: number, character: number) { this.line =line; this.character = character; }
    },
    Selection: class MockSelection {
        constructor(anchor: vscode.Position, active: vscode.Position) { return; }
    },
    Range: class MockRange {
        constructor(begin: number, end: number) { return; }
    },
    EventEmitter: class MockEventEmitter {
        public event: any = { name: "test" };
        public fire() { return; }
    },
    extensions: {
        getExtension: () => { return; }
    },
    StatusBarAlignment: { Left: "left" },
    ThemeIcon: class MockThemeIcon {
        static readonly File: vscode.ThemeIcon;
        static readonly Folder: vscode.ThemeIcon;
        readonly id: string;
        readonly color?: vscode.ThemeColor;
        constructor(id: string, color?: vscode.ThemeColor) { this.id = id; }
    }
};

export function setTestRoots(projects: string[]) {
    testVscode.workspace.workspaceFolders = _.map(projects, project => { return _path2Uri(path.resolve(project)); });
}
