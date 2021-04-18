/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as _ from "lodash";
import * as fsextra from "fs-extra";
import * as path from "path";
import * as nsVsMock from "./ext/mockVscode";
import { mockVscode } from "./ext/mockUtil";

const statusBarItem = { show: () => "" };

mockVscode(nsVsMock.testVscode, "src/extension.ts");
mockVscode(nsVsMock.testVscode, "src/commands.ts");
mockVscode(nsVsMock.testVscode, "src/cfViewCommands.ts");
mockVscode(nsVsMock.testVscode, "src/run-configuration.ts");
import * as extension from "../src/extension";
import * as commands from "../src/commands";
import * as cfViewCommands from "../src/cfViewCommands";
import * as cflocal from "@sap/cf-tools/out/src/cf-local";
import * as cflocalUnits from "@sap/cf-tools/out/src/utils";
import * as loggerWrapper from "../src/logger/logger-wrapper";
import { cfGetConfigFilePath, ITarget, OK } from "@sap/cf-tools";
import { expect } from "chai";
import { createSandbox, SinonMock, SinonSandbox } from "sinon";
import { CFTargetTI } from "../src/cfView";

describe('extension unit test', () => {
    const runConfigExtName = "sap.vscode-wing-run-config";
    let sandbox: SinonSandbox;
    let windowMock: SinonMock;
    let viewCommandsMock: SinonMock;
    let fsExtraMock: SinonMock;
    let mockCfLocal: SinonMock;
    let mockCfLocalUnits: SinonMock;
    let mockStatusBarItem: SinonMock;
    let extensionsMock: SinonMock;
    let loggerWrapperMock: SinonMock;

    before(() => {
        sandbox = createSandbox();
    });

    beforeEach(() => {
        windowMock = sandbox.mock(nsVsMock.testVscode.window);
        viewCommandsMock = sandbox.mock(cfViewCommands);
        fsExtraMock = sandbox.mock(fsextra);
        mockCfLocal = sandbox.mock(cflocal);
        mockCfLocalUnits = sandbox.mock(cflocalUnits);
        mockStatusBarItem = sandbox.mock(statusBarItem);
        extensionsMock = sandbox.mock(nsVsMock.testVscode.extensions);
        loggerWrapperMock = sandbox.mock(loggerWrapper);
    });

    afterEach(() => {
        windowMock.verify();
        viewCommandsMock.verify();
        fsExtraMock.verify();
        mockCfLocal.verify();
        mockCfLocalUnits.verify();
        mockStatusBarItem.verify();
        extensionsMock.verify();
        loggerWrapperMock.verify();
        sandbox.restore();
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

    describe("activate- fake createTreeView", () => {
        let testContext: any;
        const runConfigExtName = "sap.vscode-wing-run-config";

        beforeEach(() => {
            windowMock.expects("createTreeView").withArgs("cfView");
            testContext = { "subscriptions": [], logUri: { fsPath: path.resolve(__dirname) } };
            loggerWrapperMock.expects("initLogger").withExactArgs(testContext).resolves();
            mockStatusBarItem.expects("show").never();
            windowMock.expects("createStatusBarItem").withExactArgs(nsVsMock.testVscode.StatusBarAlignment.Left, 100).returns(statusBarItem);
        });

        it("ok:: cfConfigFilePath does not exist", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("");
            fsExtraMock.expects("watchFile").never();
            await extension.activate(testContext);
            windowMock.verify();
        });

        it("ok:: cfConfigFilePath exists", async () => {
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
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
            await extension.activate(testContext);
            mockExt.verify();
        });
    });

    describe("activate - depended platform extension is defined and activated", () => {
        let testContext: any;
        let mockCommands: SinonMock;

        beforeEach(async () => {
            mockCommands = sandbox.mock(commands);
            testContext = { "subscriptions": [], logUri: { fsPath: path.resolve(__dirname) } };
            loggerWrapperMock.expects("initLogger").withExactArgs(testContext).resolves();
            windowMock.expects("createStatusBarItem").withExactArgs(nsVsMock.testVscode.StatusBarAlignment.Left, 100).returns(statusBarItem);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns({
                isActive: true,
                exports: {
                    registerDependency: () => ""
                }
            });
            await extension.activate(testContext);
        });

        afterEach(() => {
            mockCommands.verify();
        });

        it("ok:: depended platform extension is defined and activated, verify commands", () => {
            _.each(["cf.login", "cf.login.weak", "cf.target.set", "cf.services.create", "cf.services.bind.local",
                "cf.services.unbind", "cf.services.bind", "cf.services.binding.state",
                "cf.set.orgspace", "cf.targets.create", "cf.target.delete", "cf.targets.reload", "cf.select.space",
                "cf.deploy-service.api", "cf.services.get-space-services", "cf.services.get-ups-services",
                "cf.services.get-services", "cf.ups.create"
            ], cmd => {
                expect(_.get(nsVsMock.getTestRegisteredCommands(), cmd)).to.be.ok;
            });
        });

        it("ok:: cmdLogin command triggered", async () => {
            const targets = [new CFTargetTI({ label: 'test-target', isCurrent: true, isDirty: false })];
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            mockCommands.expects('cmdLogin').resolves(OK);
            viewCommandsMock.expects('cmdDeleteTarget').withExactArgs(targets[0], { silent: true, 'skip-reload': true }).resolves();
            viewCommandsMock.expects('execSaveTarget').withExactArgs(targets[0], { silent: true, 'skip-reload': true }).resolves();
            viewCommandsMock.expects('execSetTarget').withExactArgs(targets[0], { silent: true }).resolves();
            await _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'login'])();
        });

        it("ok:: cmdLogin command triggered and failed", async () => {
            const targets = [new CFTargetTI({ label: 'test-target', isCurrent: true, isDirty: false })];
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            mockCommands.expects('cmdLogin').resolves('failed');
            viewCommandsMock.expects('cmdDeleteTarget').never();
            await _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'login'])();
        });

        it("ok:: cmdLogin command triggered, canceled", async () => {
            mockCommands.expects('cmdLogin').resolves();
            await _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'login'])();
        });

        it("ok:: cmdLogin command triggered, no active target", async () => {
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getCurrentTarget').returns(undefined);
            mockCommands.expects('cmdLogin').resolves(OK);
            await _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'login'])();
        });

        it("ok:: 'cf.target.set' command triggered", (done) => {
            const targets = [
                new CFTargetTI({ label: 'test-target', isCurrent: false, isDirty: false }),
                new CFTargetTI({ label: 'test-target-active', isCurrent: true, isDirty: false })
            ];
            const cfViewMock = sandbox.mock(nsVsMock.getTestTreeView());
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            cfViewMock.expects('reveal').withExactArgs(targets[1], { select: true, focus: true, expand: true }).resolves();
            viewCommandsMock.expects('cmdSetCurrentTarget').withExactArgs(targets[0]).resolves();
            _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'target', 'set'])(targets[0]);
            setTimeout(() => {
                cfViewMock.verify();
                done();
            }, 600);
        });

        it("ok:: 'cf.target.set' command triggered, reveal item not found", (done) => {
            const targets = [
                new CFTargetTI({ label: 'test-target', isCurrent: false, isDirty: false }),
                new CFTargetTI({ label: 'test-target-active', isCurrent: false, isDirty: false })
            ];
            const cfViewMock = sandbox.mock(nsVsMock.getTestTreeView());
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            cfViewMock.expects('reveal').never();
            viewCommandsMock.expects('cmdSetCurrentTarget').withExactArgs(targets[0]).resolves();
            _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'target', 'set'])(targets[0]);
            setTimeout(() => {
                cfViewMock.verify();
                done();
            }, 600);
        });

        it("ok:: 'cf.targets.create' command triggered", (done) => {
            const targets = [
                new CFTargetTI({ label: 'test-target', isCurrent: false, isDirty: false }),
                new CFTargetTI({ label: 'test-target-active', isCurrent: true, isDirty: false })
            ];
            const cfViewMock = sandbox.mock(nsVsMock.getTestTreeView());
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            cfViewMock.expects('reveal').withExactArgs(targets[1], { select: true, focus: true, expand: true }).resolves();
            mockCommands.expects('cmdCreateTarget').resolves(targets[1].label);
            _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'targets', 'create'])();
            setTimeout(() => {
                cfViewMock.verify();
                done();
            }, 600);
        });

        it("ok:: 'cf.targets.create' command triggered, creation canceled", (done) => {
            const targets = [
                new CFTargetTI({ label: 'test-target', isCurrent: false, isDirty: false }),
                new CFTargetTI({ label: 'test-target-active', isCurrent: true, isDirty: false })
            ];
            const cfViewMock = sandbox.mock(nsVsMock.getTestTreeView());
            sandbox.stub(nsVsMock.getTestTreeProvider(), 'getTargets').returns(targets);
            cfViewMock.expects('reveal').never();
            mockCommands.expects('cmdCreateTarget').resolves();
            _.get(nsVsMock.getTestRegisteredCommands(), ['cf', 'targets', 'create'])();
            setTimeout(() => {
                cfViewMock.verify();
                done();
            }, 600);
        });
    });

    describe("onCFConfigFileChange", () => {
        let testContext: any;
        const target: ITarget = {
            "api endpoint": "endpoint",
            "api version": "3.2.1",
            user: "test",
            org: "org",
            space: "space"
        };

        beforeEach(() => {
            windowMock.expects("createTreeView").withArgs("cfView");
            testContext = { "subscriptions": [], logUri: { fsPath: path.resolve(__dirname) } };
            loggerWrapperMock.expects("initLogger").withExactArgs(testContext).resolves();
            extensionsMock.expects("getExtension").withExactArgs(runConfigExtName).returns(undefined);
            mockCfLocalUnits.expects("cfGetConfigFilePath").returns("testCFConfigFilePath");
            fsExtraMock.expects("watchFile").withArgs("testCFConfigFilePath");
            windowMock.expects("createStatusBarItem").withExactArgs(nsVsMock.testVscode.StatusBarAlignment.Left, 100).returns(statusBarItem);
        });

        it("ok:: verify callback trigger, target updated", async () => {
            await extension.activate(testContext);
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("OrganizationFields").resolves({ Name: "testName1" });
            mockCfLocalUnits.expects("cfGetConfigFileField").withExactArgs("SpaceFields").resolves({ Name: "testName2" });
            mockCfLocal.expects("cfGetTarget").resolves(target);
            setTimeout(() => {
                extension.onCFConfigFileChange();
            }, 100);
            await new Promise(resolve => setTimeout(resolve, 200));
        });

        it("ok:: nothing updated", async () => {
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
