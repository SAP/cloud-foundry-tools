/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import * as sinon from "sinon";
import * as path from "path";
import * as _ from "lodash";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonPackage = require("./../../package.json");

import * as nsVsMock from "../ext/mockVscode";
import { mockVscode } from "../ext/mockUtil";

mockVscode(nsVsMock.testVscode, "logger/logger-wrapper.ts");

import * as loggerWrapper from "../../src/logger/logger-wrapper";
import * as vscodeLogger from "@vscode-logging/logger";

describe('logger-wrapper unit tests', () => {
    let sandbox: any;
    let windowMock: any;
    let workspaceMock: any;

    const logPath = path.resolve(__dirname);
    const testContext: any = { "subscriptions": [], logUri: { fsPath: logPath } };

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        windowMock = sandbox.mock(nsVsMock.testVscode.window);
        workspaceMock = sandbox.mock(nsVsMock.testVscode.workspace);
    });

    afterEach(() => {
        windowMock.verify();
        workspaceMock.verify();
    });

    it("dummy logger initialized", () => {
        loggerWrapper.getLogger().fatal("fatal");
        loggerWrapper.getLogger().info("info");
        loggerWrapper.getLogger().trace("trace");
        loggerWrapper.getLogger().debug("debug");
        loggerWrapper.getLogger().error("error");
        loggerWrapper.getLogger().warn("warn");
        loggerWrapper.getLogger().changeLevel("off");
        loggerWrapper.getLogger().changeSourceLocationTracking(false);
        loggerWrapper.getLogger().getChildLogger({ label: "child" });
    });

    describe('logger initialized', () => {
        let loggerMock: any;
        let vscodeLoggerMock: any;

        beforeEach(() => {
            vscodeLoggerMock = sandbox.mock(vscodeLogger);
            loggerMock = sandbox.mock(loggerWrapper.getLogger());
        });

        afterEach(() => {
            loggerMock.verify();
            vscodeLoggerMock.verify();
        });

        it("createLoggerAndSubscribeToLogSettingsChanges - context logUri provided", () => {
            const level = "off";
            const config = {
                get: (section: string) => {
                    return (section === "CloudFoundryTools.loggingLevel") ? level : false;
                }
            };
            const channel = { name: "channel" };
            workspaceMock.expects("getConfiguration").twice().returns(config);
            workspaceMock.expects("onDidChangeConfiguration").returns();
            windowMock.expects("createOutputChannel").withExactArgs(jsonPackage.displayName).returns(channel);
            const opts = {
                extName: jsonPackage.displayName,
                level: level,
                logPath: testContext.logUri.fsPath,
                logOutputChannel: channel,
                sourceLocationTracking: false,
                logConsole: true
            };
            vscodeLoggerMock.expects("getExtensionLogger").withExactArgs(opts).returns(loggerWrapper.dummyLogger);
            loggerMock.expects("info").withExactArgs(`Start Logging in Log Level: <${level}>`).resolves();
            loggerMock.expects("info").withExactArgs(`Full Logs can be found in the <${testContext.logUri.fsPath}> folder`).resolves();
            loggerWrapper.createLoggerAndSubscribeToLogSettingsChanges(testContext);
            expect(_.size(testContext.subscriptions)).to.be.equal(1);
        });

        it("createLoggerAndSubscribeToLogSettingsChanges - context logPath provided", () => {
            const level = "off";
            const config = {
                get: (section: string) => {
                    return (section === "CloudFoundryTools.loggingLevel") ? level : false;
                }
            };
            testContext.subscriptions = [];
            delete testContext.logUri;
            testContext['logPath'] = logPath;
            const channel = { name: "channel" };
            workspaceMock.expects("getConfiguration").twice().returns(config);
            workspaceMock.expects("onDidChangeConfiguration").returns();
            windowMock.expects("createOutputChannel").withExactArgs(jsonPackage.displayName).returns(channel);
            const opts = {
                extName: jsonPackage.displayName,
                level: level,
                logPath: testContext.logPath,
                logOutputChannel: channel,
                sourceLocationTracking: false,
                logConsole: true
            };
            vscodeLoggerMock.expects("getExtensionLogger").withExactArgs(opts).returns(loggerWrapper.dummyLogger);
            loggerMock.expects("info").withExactArgs(`Start Logging in Log Level: <${level}>`).resolves();
            loggerMock.expects("info").withExactArgs(`Full Logs can be found in the <${testContext.logPath}> folder`).resolves();
            loggerWrapper.createLoggerAndSubscribeToLogSettingsChanges(testContext);
            expect(_.size(testContext.subscriptions)).to.be.equal(1);
        });

        it("callbackOnDidChangeConfiguration - login level changed, context logPath provided", () => {
            const event = {
                affectsConfiguration: (section: string) => {
                    return section === "CloudFoundryTools.loggingLevel";
                }
            };
            delete testContext.logUri;
            testContext['logPath'] = logPath;
            const level = "debug";
            const config = {
                get: (section: string) => {
                    return (section === "CloudFoundryTools.loggingLevel") ? level : false;
                }
            };
            workspaceMock.expects("getConfiguration").returns(config);
            loggerMock.expects("changeLevel").withExactArgs(level).resolves();
            loggerMock.expects("info").withExactArgs(`Start Logging in Log Level: <${level}>`).resolves();
            loggerMock.expects("info").withExactArgs(`Full Logs can be found in the <${testContext.logPath}> folder`).resolves();
            loggerWrapper.callbackOnDidChangeConfiguration(event, testContext);
        });

        it("callbackOnDidChangeConfiguration - login level changed, , context logUri provided", () => {
            const event = {
                affectsConfiguration: (section: string) => {
                    return section === "CloudFoundryTools.loggingLevel";
                }
            };
            testContext['logUri'] = {fsPath: logPath};
            delete testContext.logPath;

            const level = "debug";
            const config = {
                get: (section: string) => {
                    return (section === "CloudFoundryTools.loggingLevel") ? level : false;
                }
            };
            workspaceMock.expects("getConfiguration").returns(config);
            loggerMock.expects("changeLevel").withExactArgs(level).resolves();
            loggerMock.expects("info").withExactArgs(`Start Logging in Log Level: <${level}>`).resolves();
            loggerMock.expects("info").withExactArgs(`Full Logs can be found in the <${testContext.logUri.fsPath}> folder`).resolves();
            loggerWrapper.callbackOnDidChangeConfiguration(event, testContext);
        });

        it("callbackOnDidChangeConfiguration - source tracking changed, context logUri provided", () => {
            const event = {
                affectsConfiguration: (section: string) => {
                    return section === "CloudFoundryTools.sourceLocationTracking";
                }
            };
            testContext['logUri'] = { fsPath: logPath };
            delete testContext.logPath;

            const state = "true";
            const config = {
                get: (section: string) => {
                    return (section === "CloudFoundryTools.sourceLocationTracking") ? state : false;
                }
            };
            workspaceMock.expects("getConfiguration").returns(config);
            loggerMock.expects("changeSourceLocationTracking").withExactArgs(state).resolves();
            loggerWrapper.callbackOnDidChangeConfiguration(event, testContext);
        });

        it("callbackOnDidChangeConfiguration - other changed, nothing reacted", () => {
            const event = {
                affectsConfiguration: (section: string) => {
                    return section === "CloudFoundryTools";
                }
            };
            loggerWrapper.callbackOnDidChangeConfiguration(event, testContext);
        });
    });
});
