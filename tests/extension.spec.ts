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
import * as cflocalUnits from "@sap/cf-tools/out/src/utils";
import * as commands from "../src/commands";
import * as cfViewCommands from "../src/cfViewCommands";
import { DependencyHandler } from "../src/run-configuration";
import * as loggerWrapper from "../src/logger/logger-wrapper";
import { cfGetConfigFilePath, ITarget } from "@sap/cf-tools";

describe('extension unit test', () => {
    let sandbox: any;
    let commandsMock: any;
    let windowMock: any;
    let fsExtraMock: any;
    let mockCfLocal: any;
    let mockCfLocalUnits: any;
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
        "cf.services.binding.state": dependencyHandler.getBindState,
        "cf.services.get-space-services": cfViewCommands.cmdGetSpaceServices,
        "cf.services.get-ups-services": cfViewCommands.cmdGetUpsServiceInstances,
        "cf.services.get-services": cfViewCommands.cmdGetServiceInstances,
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
        mockCfLocalUnits = sandbox.mock(cflocalUnits);
        mockStatusBarItem = sandbox.mock(statusBarItem);
        extensionsMock = sandbox.mock(nsVsMock.testVscode.extensions);
        loggerWrapperMock = sandbox.mock(loggerWrapper);
    });

    afterEach(() => {
        commandsMock.verify();
        windowMock.verify();
        fsExtraMock.verify();
        mockCfLocal.verify();
        mockCfLocalUnits.verify();
        mockStatusBarItem.verify();
        extensionsMock.verify();
        loggerWrapperMock.verify();
    });

    describe("deactivate", () => {
        it("unwatchFile called", () => {
            fsExtraMock.expects("unwatchFile").withArgs(cfGetConfigFilePath());
            extension.deactivate();
        });

        it("unwatchFile not called", () => {
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("unwatchFile").never();
            extension.deactivate();
        });
    });

    describe("activate", () => {
        let testContext: any;
        const runConfigExtName = "sap.vscode-wing-run-config";

        beforeEach(() => {
            windowMock.expects("registerTreeDataProvider").withArgs("cfView");
            testContext = { "subscriptions": [], logUri: { fsPath: path.resolve(__dirname) } };
            loggerWrapperMock.expects("initLogger").withExactArgs(testContext).resolves();

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

        it("ok:: cfConfigFilePath does not exist", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("watchFile").never();
            await extension.activate(testContext);
        });

        it("ok:: cfConfigFilePath exists", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            await extension.activate(testContext);
        });

        it("ok:: depended platform extension is defined and activated", async () => {
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").atLeast(1).resolves({ Name: "testName1" });
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").atLeast(1).resolves({ Name: "testName2" });
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns({
                isActive: true,
                exports: {
                    registerDependency: () => ""
                }
            });
            commandsMock.expects("registerCommand").withExactArgs("cf.services.unbind", commandsMap["cf.services.unbind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.bind", commandsMap["cf.services.bind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.binding.state", commandsMap["cf.services.binding.state"]);
            await extension.activate(testContext);
        });

        it("ok:: depended platform extension is defined but not activated", async () => {
            const extRun = {
                isActive: false,
                activate: () => Promise.resolve(),
                exports: {
                    registerDependency: () => ""
                }
            };
            const mockExt = sandbox.mock(extRun);
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").atLeast(1).resolves({ Name: "testName1" });
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").atLeast(1).resolves({ Name: "testName2" });
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            mockExt.expects("activate").resolves();
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(extRun);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.unbind", commandsMap["cf.services.unbind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.bind", commandsMap["cf.services.bind"]);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.binding.state", commandsMap["cf.services.binding.state"]);
            await extension.activate(testContext);
            mockExt.verify();
        });

        it("ok:: depended platform extension is defined but can not be not activated", async () => {
            const extRun = {
                isActive: false,
                activate: () => Promise.resolve(),
                exports: {
                    registerDependency: () => ""
                }
            };
            const mockExt = sandbox.mock(extRun);
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").atLeast(1).resolves({ Name: "testName1" });
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").atLeast(1).resolves({ Name: "testName2" });
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            mockExt.expects("activate").rejects(new Error("my error"));
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(extRun);
            commandsMock.expects("registerCommand").withExactArgs("cf.services.unbind", commandsMap["cf.services.unbind"]).never();
            commandsMock.expects("registerCommand").withExactArgs("cf.services.bind", commandsMap["cf.services.bind"]).never();
            commandsMock.expects("registerCommand").withExactArgs("cf.services.binding.state", commandsMap["cf.services.binding.state"]).never();
            await extension.activate(testContext);
            mockExt.verify();
        });
    });

    describe("onCFConfigFileChange", () => {
        let testContext: any;
        const runConfigExtName = "sap.vscode-wing-run-config";
        const target: ITarget = {
            "api endpoint": "endpoint",
            "api version": "3.2.1",
            user: "test",
            org: "org",
            space: "space"
        };

        beforeEach(() => {
            windowMock.expects("registerTreeDataProvider").withArgs("cfView");
            testContext = { "subscriptions": [], logUri: { fsPath: path.resolve(__dirname) } };
            loggerWrapperMock.expects("initLogger").withExactArgs(testContext).resolves();

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

        it("ok:: verify callback trigger, target updated", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            await extension.activate(testContext);
            setTimeout(() => {
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
                mockCfLocal.expects("cfGetTarget").resolves(target);
                extension.onCFConfigFileChange();
            }, 100);
            await new Promise(resolve => setTimeout(resolve, 200));
        });

        it("ok:: nothing updated", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            await extension.activate(testContext);

            setTimeout(() => {
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
                mockCfLocal.expects("cfGetTarget").resolves(target);
                extension.onCFConfigFileChange();
            }, 100);

            setTimeout(() => {
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
                extension.onCFConfigFileChange();
            }, 300);
            await new Promise(resolve => setTimeout(resolve, 500));
        });

        it("ok:: not targeted", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            await extension.activate(testContext);

            setTimeout(() => {
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "" });
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "" });
                mockCfLocal.expects("cfGetTarget").never();
                extension.onCFConfigFileChange();
            }, 100);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        it("ok:: not logged in", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName3" });
            await extension.activate(testContext);

            setTimeout(() => {
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
                mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "" });
                mockCfLocal.expects("cfGetTarget").rejects(undefined);
                extension.onCFConfigFileChange();
            }, 100);
            await new Promise(resolve => setTimeout(resolve, 300));
        });
    });
});
