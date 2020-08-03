/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sinon from "sinon";
import * as _ from "lodash";
import * as fsextra from "fs-extra";
import { mockVscode } from "./mockUtil";

const oRegisteredCommands: any = {};
const outputChannel = { appendLine: () => "" };
const statusBarItem = { show: () => "" };

const testVscode = {
    StatusBarAlignment: { Left: "left" },
    commands: {
        registerCommand: (id: string, cmd: any) => { oRegisteredCommands[id] = cmd; return Promise.resolve(oRegisteredCommands); }
    },
    workspace: {
        createFileSystemWatcher: () => {
            return {
                onDidChange: () => { return; },
                onDidCreate: () => { return; },
                onDidDelete: () => { return; }
            };
        }
    },
    window: {
        showQuickPick: () => Promise.reject(),
        registerTreeDataProvider: () => "",
        createOutputChannel: () => outputChannel,
        createStatusBarItem: () => ""
    },
    extensions: {
        getExtension: () => { return; }
    },
    TreeItem: class MockTreeItem { },
    EventEmitter: class MockEventEmitter {
        public fire(): any { return; }
    }
};
mockVscode(testVscode, "src/extension.ts");
mockVscode(testVscode, "src/cfView.ts");
mockVscode(testVscode, "src/utils.ts");
import * as extension from "../src/extension";
import * as cflocal from "@sap/cf-tools/out/src/cf-local";
import { messages } from "../src/messages";
import * as commands from "../src/commands";
import * as cfViewCommands from "../src/cfViewCommands";
import { DependencyHandler } from "../src/run-configuration";
import { expect } from "chai";

describe('Extension unit test', () => {
    let sandbox: any;
    let commandsMock: any;
    let windowMock: any;
    let fsExtraMock: any;
    let mockOutputChannel: any;
    let mockCfLocal: any;
    let mockStatusBarItem: any;
    let extensionsMock: any;
    const dependencyHandler: any = new DependencyHandler("cf-tools-rsource-dependency");
    const commandsMap = {
        "cf.login": commands.cmdLogin,
        "cf.target.set": cfViewCommands.cmdSetCurrentTarget,
        "cf.services.create": commands.cmdCreateService,
        "cf.services.bind.local": cfViewCommands.cmdBindLocal,
        "cf.services.unbind": dependencyHandler.unbind,
        "cf.services.bind": dependencyHandler.bind,
        "cf.set.orgspace": commands.cmdCFSetOrgSpace,
        "cf.targets.create": commands.cmdCreateTarget,
        "cf.target.delete": cfViewCommands.cmdDeleteTarget,
        "cf.targets.reload": cfViewCommands.cmdReloadTargets,
        "cf.select.space": commands.cmdSelectSpace,
        "cf.deploy-service.api": cfViewCommands.cmdDeployServiceAPI,
        "cf.services.binding.state" : dependencyHandler.getBindState
    };

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        commandsMock = sandbox.mock(testVscode.commands);
        windowMock = sandbox.mock(testVscode.window);
        fsExtraMock = sandbox.mock(fsextra);
        mockOutputChannel = sandbox.mock(outputChannel);
        mockCfLocal = sandbox.mock(cflocal);
        mockStatusBarItem = sandbox.mock(statusBarItem);
        extensionsMock = sandbox.mock(testVscode.extensions);
    });

    afterEach(() => {
        commandsMock.verify();
        windowMock.verify();
        fsExtraMock.verify();
        mockOutputChannel.verify();
        mockCfLocal.verify();
        mockStatusBarItem.verify();
        extensionsMock.verify();
    });

    describe("deactivate", () => {
        it("unwatchFile called", () => {
            fsExtraMock.expects("unwatchFile").withArgs(cflocal.cfGetConfigFilePath());
            extension.deactivate();
        });

        it("unwatchFile not called", () => {
            mockCfLocal.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("unwatchFile").never();
            extension.deactivate();
        });
    });

    describe("activate", () => {
        let testContext: any;
        const extensionName = "vscode-wing-cf-tools";
        const runConfigExtName = "sap.vscode-wing-run-config";

        beforeEach(() => {
            mockOutputChannel.expects("appendLine").withExactArgs(messages.activation_extension(extensionName));
            windowMock.expects("registerTreeDataProvider").withArgs("cfView");
            mockOutputChannel.expects("appendLine").withExactArgs(messages.extension_active(extensionName));

            testContext = { "subscriptions": [] };
            _.forEach(commandsMap, (command, commandName) => {
                if (commandName !== "cf.services.unbind" && commandName !== "cf.services.bind" &&  commandName !== "cf.services.binding.state" ) {
                    commandsMock.expects("registerCommand").withExactArgs(commandName, command);
                }
            });

            mockStatusBarItem.expects("show");
            windowMock.expects("createStatusBarItem").returns(statusBarItem).withExactArgs(testVscode.StatusBarAlignment.Left, 100);
        });

        it("cfConfigFilePath does not exist", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("watchFile").never();
            mockOutputChannel.expects("appendLine").withExactArgs(messages.ext_not_set(runConfigExtName));
            extension.activate(testContext);
        });

        it("cfConfigFilePath exists", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");

            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            mockOutputChannel.expects("appendLine").withExactArgs(messages.ext_not_set(runConfigExtName));
            extension.activate(testContext);
        });

        it("platform extension defined", () => {
            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").atLeast(1).resolves({ Name: "testName1" });
            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("SpaceFields").atLeast(1).resolves({ Name: "testName2" });
            mockCfLocal.expects("cfGetConfigFilePath").returns("");
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns({
                exports: {
                    registerDependency: () => ""
                }
            });
            commandsMock.expects("registerCommand").withExactArgs("cf.services.unbind", commandsMap["cf.services.unbind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.bind", commandsMap["cf.services.bind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.binding.state", commandsMap["cf.services.binding.state"]);
            extension.activate(testContext);
        });
    });

    
    it("onCFConfigFileChange", () => {
        mockOutputChannel.expects("appendLine").withExactArgs(messages.cf_config_changed);
        mockCfLocal.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
        mockCfLocal.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
        extension.onCFConfigFileChange();
    });

    it("onCFConfigFileChange - not targeted", () => {
        mockOutputChannel.expects("appendLine").withExactArgs(messages.cf_config_changed);
        mockCfLocal.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "" });
        mockCfLocal.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "" });
        extension.onCFConfigFileChange();
    });

    it("No service found message composed", () => {
        const planName = "my-plan {1}";
        expect(_.size(messages.no_services_found(planName))).to.be.gt(1);
    });

    it("Service bound successful", () => {
        expect(_.size(messages.service_bound_successful('planName', '/root/path'))).to.be.gt(1);
    });

});
