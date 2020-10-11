/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sinon from "sinon";
import * as _ from "lodash";
import * as fsextra from "fs-extra";
import * as path from "path";
import * as nsVsMock from "./ext/mockVscode";
import { mockVscode } from "./ext/mockUtil";

const statusBarItem = { show: () => "" };

mockVscode(nsVsMock.testVscode, "src/extension.ts");
mockVscode(nsVsMock.testVscode, "src/cfView.ts");
mockVscode(nsVsMock.testVscode, "src/utils.ts");
import * as extension from "../src/extension";
import * as cflocal from "@sap/cf-tools/out/src/cf-local";
import { messages } from "../src/messages";
import * as commands from "../src/commands";
import * as cfViewCommands from "../src/cfViewCommands";
import { DependencyHandler } from "../src/run-configuration";
import * as loggerWrapper from "../src/logger/logger-wrapper";
import { expect } from "chai";

describe('Extension unit test', () => {
    let sandbox: any;
    let commandsMock: any;
    let windowMock: any;
    let fsExtraMock: any;
    let mockCfLocal: any;
    let mockStatusBarItem: any;
    let extensionsMock: any;
    let loggerWrapperMock: any;
    const dependencyHandler: any = new DependencyHandler("cf-tools-rsource-dependency");
    const commandsMap = {
        "cf.login": commands.cmdLogin,
        "cf.login.weak": commands.cmdLogin.bind(null, true),
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
        "cf.services.binding.state" : dependencyHandler.getBindState,
        "cf.services.get-space-services": cfViewCommands.cmdGetSpaceServices,
        "cf.ups.create": commands.cmdCreateUps
    };

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        commandsMock = sandbox.mock(nsVsMock.testVscode.commands);
        windowMock = sandbox.mock(nsVsMock.testVscode.window);
        fsExtraMock = sandbox.mock(fsextra);
        mockCfLocal = sandbox.mock(cflocal);
        mockStatusBarItem = sandbox.mock(statusBarItem);
        extensionsMock = sandbox.mock(nsVsMock.testVscode.extensions);
        loggerWrapperMock = sandbox.mock(loggerWrapper);
    });

    afterEach(() => {
        commandsMock.verify();
        windowMock.verify();
        fsExtraMock.verify();
        mockCfLocal.verify();
        mockStatusBarItem.verify();
        extensionsMock.verify();
        loggerWrapperMock.verify();
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
        const runConfigExtName = "sap.vscode-wing-run-config";

        beforeEach(() => {
            windowMock.expects("registerTreeDataProvider").withArgs("cfView");
            testContext = { "subscriptions": [], logUri: {fsPath: path.resolve(__dirname)} };
            loggerWrapperMock.expects("createLoggerAndSubscribeToLogSettingsChanges").withExactArgs(testContext).resolves();

            _.forEach(commandsMap, (command, commandName) => {
                if (commandName === "cf.login.weak") {
                    commandsMock.expects("registerCommand").withArgs(commandName);
                } else if (commandName !== "cf.services.unbind" && commandName !== "cf.services.bind" && commandName !== "cf.services.binding.state") {
                    commandsMock.expects("registerCommand").withExactArgs(commandName, command);
                }
            });

            mockStatusBarItem.expects("show");
            windowMock.expects("createStatusBarItem").returns(statusBarItem).withExactArgs(nsVsMock.testVscode.StatusBarAlignment.Left, 100);
        });

        it("cfConfigFilePath does not exist", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("watchFile").never();
            extension.activate(testContext);
        });

        it("cfConfigFilePath exists", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
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

        it("onCFConfigFileChange", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            extension.activate(testContext);

            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
            extension.onCFConfigFileChange();
        });
    
        it("onCFConfigFileChange - not targeted", () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocal.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            extension.activate(testContext);

            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "" });
            mockCfLocal.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "" });
            extension.onCFConfigFileChange();
        });
    
    });

    it("No service found message composed", () => {
        const planName = "my-plan {1}";
        expect(_.size(messages.no_services_found(planName))).to.be.gt(1);
    });

    it("Service bound successful", () => {
        expect(_.size(messages.service_bound_successful('planName'))).to.be.gt(1);
    });

});
