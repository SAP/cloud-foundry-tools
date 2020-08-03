/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import * as _ from "lodash";
import * as sinon from "sinon";
import { mockVscode } from "./mockUtil";
const testVscode = {
    window: {
        showInputBox: () => Promise.reject(),
        showInformationMessage: () => Promise.reject(),
        showWarningMessage: () => Promise.reject(),
        showErrorMessage: () => Promise.reject(),
        withProgress: () => Promise.reject(),
        showQuickPick: () => Promise.reject()
    },
    commands: {
        executeCommand: () => Promise.reject()
    },
    TreeItem: class MockTreeItem { },
    ProgressLocation: {
        Window: 10,
        Notification: 15
    }
};
mockVscode(testVscode, "src/commands.ts");
import * as commands from "../src/commands";
import * as cfViewCommands from "../src/cfViewCommands";
import * as cfLocal from "@sap/cf-tools/out/src/cf-local";
import { ServiceTypeInfo, ServiceInstanceInfo, Cli, CliResult, DEFAULT_TARGET, CF_PAGE_SIZE, OK } from "@sap/cf-tools";
import { messages } from "../src/messages";
import * as cfView from "../src/cfView";
import { fail } from "assert";
import { validateParams } from "../src/utils";

describe("commands unit tests", () => {
    let sandbox: any;
    let vscodeWindowMock: any;
    let vscodeCommandsMock: any;
    let commandsMock: any;
    let cliMock: any;
    let cfLocalMock: any;
    let cfViewMock: any;
    const testCFDefaultLandscape = `https://api.cf.sap.hana.ondemand.com`;
    const testUserEmail = "user@test.com";
    const testUserPassword = "userPassword";
    let originalCFDefaultLandscape: string;
    let bindSpy: any;
    const orgs: any[] = [{ label: "devx", guid: "1" }, { label: "devx2", guid: "2" }, { label: "HRTT", guid: "3" }, { label: "SAP_CoCo_Messaging", guid: "4" }];
    const spaces: any[] = [{ label: "ArchTeam" }, { label: "platform2" }];

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        bindSpy = null;
        vscodeWindowMock = sandbox.mock(testVscode.window);
        vscodeCommandsMock = sandbox.mock(testVscode.commands);
        cfViewMock = sandbox.mock(cfView.CFView);
        commandsMock = sandbox.mock(commands);
        cfLocalMock = sandbox.mock(cfLocal);
        cliMock = sandbox.mock(Cli);
        originalCFDefaultLandscape = _.get(process, "env.CF_API_ENDPOINT");
        _.set(process, "env.CF_API_ENDPOINT", testCFDefaultLandscape);
    });

    afterEach(() => {
        cfLocalMock.verify();
        vscodeWindowMock.verify();
        vscodeCommandsMock.verify();
        commandsMock.verify();
        cliMock.verify();
        cfViewMock.verify();
        _.set(process, "env.CF_API_ENDPOINT", originalCFDefaultLandscape);
        if (bindSpy) {
            bindSpy.restore();
        }
    });

    describe("cmdLogin", () => {
        it("cf endpoint is not entered", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves();
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).never();
            await commands.cmdLogin();
        });

        it("cf endpoint is entered, userEmailName is not entered", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves(testCFDefaultLandscape);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).resolves();
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true }).never();
            await commands.cmdLogin();
        });

        it("cf endpoint and userEmailName are entered, password is not entered", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves(testCFDefaultLandscape);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).resolves(testUserEmail);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true }).resolves();
            vscodeWindowMock.expects("withProgress").never();
            await commands.cmdLogin();
        });

        it("cf endpoint, userEmailName and password are entered, result is OK", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves(testCFDefaultLandscape);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).resolves(testUserEmail);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true }).resolves(testUserPassword);
            bindSpy = sandbox.spy(cfLocal.cfLogin, "bind");
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.loggin_in }).resolves(OK);
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.login_success).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves([]);
            vscodeWindowMock.expects("showWarningMessage").withArgs(messages.no_available_orgs);
            await commands.cmdLogin();
            expect(bindSpy.args[0]).to.have.lengthOf(4);
            expect(bindSpy.args[0][0]).to.be.equal(undefined);
            expect(bindSpy.args[0][1]).to.be.equal(testCFDefaultLandscape);
            expect(bindSpy.args[0][2]).to.be.equal(testUserEmail);
            expect(bindSpy.args[0][3]).to.be.equal(testUserPassword);
        });

        it("cf endpoint, userEmailName and password are entered, result is not OK", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves(testCFDefaultLandscape);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).resolves(testUserEmail);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true }).resolves(testUserPassword);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.loggin_in }).resolves("FAILURE");
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(messages.authentication_failed("FAILURE")).resolves();
            await commands.cmdLogin();
        });

        it("exception thrown", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_cf_endpoint, value: testCFDefaultLandscape, ignoreFocusOut: true }).resolves(testCFDefaultLandscape);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.enter_user_email, ignoreFocusOut: true }).resolves(testUserEmail);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true }).resolves(testUserPassword);
            const error = new Error('my error');
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.loggin_in }).throws(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            await commands.cmdLogin();
        });

    });

    describe("cmdCFSetOrgSpace", () => {
        const testArgs = ["curl", "/v2/spaces"];
        const cliResult: CliResult = {
            stdout: "",
            stderr: "",
            exitCode: 0
        };
        cliResult.stdout = `{
            "resources": [{
                "entity": {
                    "name": "testName",
                    "organization_guid": "2"
                },
                "metadata": {
                    "guid": "testGuid"
                }
            }]
        }`;

        afterEach(() => {
            sandbox.restore();
        });

        it("there are no available orgs", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves();
            bindSpy = sandbox.spy(cfLocal.cfGetAvailableOrgs, "bind");
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.no_available_orgs).resolves();
            await commands.cmdCFSetOrgSpace();
            expect(bindSpy.args[0]).to.have.lengthOf(1);
            expect(bindSpy.args[0][0]).to.be.equal(undefined);
        });

        it("there are available orgs, no org is selected", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves(orgs);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_spaces }).never();
            await commands.cmdCFSetOrgSpace();
        });

        it("org is selected, no available spaces", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves(orgs);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(orgs[1]);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_spaces }).resolves();
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.no_available_spaces).resolves();
            bindSpy = sandbox.spy(cfLocal.cfGetAvailableSpaces, "bind");
            await commands.cmdCFSetOrgSpace();
            expect(bindSpy.args[0]).to.have.lengthOf(2);
            expect(bindSpy.args[0][0]).to.be.equal(undefined);
            expect(bindSpy.args[0][1]).to.be.equal(orgs[1].guid);
        });

        it("org is selected, no space is selected", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves(orgs);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(orgs[1]);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_spaces }).resolves(spaces);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(spaces, { placeHolder: messages.select_space, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.success_set_org_space).never();
            await commands.cmdCFSetOrgSpace();
        });

        it("cmdCFSetOrgSpace - exception thrown", async () => {
            const error = new Error('some');
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).throws(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            await commands.cmdCFSetOrgSpace();
        });

        it("org is selected, space is selected", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_orgs }).resolves(orgs);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(orgs[1]);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.getting_spaces }).resolves(spaces);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(spaces, { placeHolder: messages.select_space, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(spaces[0]);
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.success_set_org_space);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.set_org_space }).resolves();
            bindSpy = sandbox.spy(cfLocal.cfSetOrgSpace, "bind");
            await commands.cmdCFSetOrgSpace();
            expect(bindSpy.args[0]).to.have.lengthOf(3);
            expect(bindSpy.args[0][0]).to.be.equal(undefined);
            expect(bindSpy.args[0][1]).to.be.equal(orgs[1].label);
            expect(bindSpy.args[0][2]).to.be.equal(spaces[0].label);
        });

        it("cmdSelectSpace", async () => {
            cliMock.expects("execute").withExactArgs(testArgs, undefined, undefined).resolves(cliResult);
            const testSpaces = [{ label: "testName", guid: "testGuid", orgGUID: orgs[1].guid }];
            vscodeWindowMock.expects("showQuickPick").withExactArgs(testSpaces, { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves({ label: 'devx2', orgGUID: orgs[1].guid });
            sandbox.stub(cfLocal, 'cfGetAvailableOrgs').resolves(orgs);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Window, title: messages.set_org_space }).resolves(orgs);
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.success_set_org_space);
            await commands.cmdSelectSpace();
        });

        it("cmdSelectSpace - exception", async () => {
            cliMock.expects("execute").withExactArgs(testArgs, undefined, undefined).resolves(cliResult);
            const testSpaces = [{ label: "testName", guid: "testGuid", orgGUID: orgs[1].guid }];
            vscodeWindowMock.expects("showQuickPick").withExactArgs(testSpaces, { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves({ label: 'devx2', orgGUID: orgs[1].guid });
            const error = new Error('my');
            sandbox.stub(cfLocal, 'cfGetAvailableOrgs').rejects(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            await commands.cmdSelectSpace();
        });

        it("cmdSelectSpace - no space", async () => {
            cliMock.expects("execute").withExactArgs(testArgs, undefined, undefined).resolves(cliResult);
            const testSpaces = [{ label: "testName", guid: "testGuid", orgGUID: orgs[1].guid }];
            vscodeWindowMock.expects("showQuickPick").withExactArgs(testSpaces, { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(null);
            vscodeWindowMock.expects("withProgress").never();
            vscodeWindowMock.expects("showInformationMessage").never();
            await commands.cmdSelectSpace();
        });

        it("cmdSelectSpace - no organization", async () => {
            cliMock.expects("execute").withExactArgs(testArgs, undefined, undefined).resolves(cliResult);
            const testSpaces = [{ label: "testName", guid: "testGuid", orgGUID: orgs[1].guid }];
            vscodeWindowMock.expects("showQuickPick").withExactArgs(testSpaces, { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves({ label: 'devx2', orgGUID: orgs[1].guid });
            sandbox.stub(cfLocal, 'cfGetAvailableOrgs').resolves();
            vscodeWindowMock.expects("withProgress").never();
            vscodeWindowMock.expects("showInformationMessage").never();
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.space_not_set);
            await commands.cmdSelectSpace();
        });
    });

    describe("cmdCreateTarget", () => {
        const targetName = "targetName";
        const cliResult: CliResult = {
            stdout: "some text",
            stderr: "",
            exitCode: 1
        };
        const testArgs = ["save-target", "-f", targetName];

        it("targetName not selected", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.name_for_target }).resolves();
            cliMock.expects("execute").never();
            await commands.cmdCreateTarget();
        });

        it("targetName is selected, exitCode is 1", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.name_for_target }).resolves(targetName);
            cliMock.expects("execute").withExactArgs(testArgs).resolves(cliResult);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(cliResult.stdout).resolves();
            try {
                await commands.cmdCreateTarget();
                fail("test should fail");
            } catch (error) {
                expect(error.message).to.be.equal(cliResult.stdout);
            }
        });

        it("targetName is selected, exitCode is 0", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.name_for_target }).resolves(targetName);
            cliResult.exitCode = 0;
            cliMock.expects("execute").withExactArgs(testArgs).resolves(cliResult);
            cfViewMock.expects("get").returns({
                refresh: () => { return; }
            });
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.target_created(targetName)).resolves();
            await commands.cmdCreateTarget();
        });

        it("targetName exception thown", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.name_for_target }).resolves(targetName);
            cliResult.exitCode = 0;
            cliMock.expects("execute").withExactArgs(testArgs).resolves(cliResult);
            cfViewMock.expects("get").returns({
                refresh: () => { return; }
            });
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.target_created(targetName)).resolves();
            await commands.cmdCreateTarget();
        });

    });

    describe("cmdDeleteTarget", () => {
        const testTargetLabel = "testTargetLabel";
        const testArgs = ["delete-target", testTargetLabel];
        const cliResult: CliResult = {
            stdout: "some text",
            stderr: "",
            exitCode: 1
        };

        it("target is equal to default target", async () => {
            cliMock.expects("execute").never();
            await cfViewCommands.cmdDeleteTarget({ target: { label: DEFAULT_TARGET } });
        });

        it("target delete succeeded", async () => {
            cliResult.exitCode = 0;
            cliMock.expects("execute").withExactArgs(testArgs).resolves(cliResult);
            cfViewMock.expects("get").returns({
                refresh: () => { return; }
            });
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.target_deleted(testTargetLabel)).resolves();
            await cfViewCommands.cmdDeleteTarget({ target: { label: testTargetLabel } });
        });

        it("target delete failed", async () => {
            cliResult.exitCode = 1;
            cliMock.expects("execute").withExactArgs(testArgs).resolves(cliResult);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(cliResult.stdout).resolves();
            await cfViewCommands.cmdDeleteTarget({ target: { label: testTargetLabel } });
        });
    });

    describe("updateServicesOnCFPageSize", () => {
        it("size not equal to cf page size", () => {
            const availableServices: any[] = [];
            commands.updateServicesOnCFPageSize(availableServices);
            expect(availableServices).to.be.empty;
        });

        it("size equal to cf page size", () => {
            const availableServices: any[] = new Array(CF_PAGE_SIZE);
            commands.updateServicesOnCFPageSize(availableServices);
            expect(availableServices).to.have.lengthOf(CF_PAGE_SIZE + 1);
        });
    });

    describe("cmdCreateService", () => {
        it("instanceName is empty", async () => {
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves();
            const result = await commands.cmdCreateService();
            expect(result).to.be.undefined;
        });

        it("withProgress is called, servicesInfo is empty", async () => {
            vscodeWindowMock.expects("showQuickPick").resolves();
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([]);
            const result = await commands.cmdCreateService();
            expect(result).to.be.undefined;
        });

        it("withProgress is called, servicesInfo is not empty, planInfo is empty", async () => {
            const info = { service_plans_url: "test_service_plans_url" , label: "testLabel"};
            vscodeWindowMock.expects("showQuickPick").resolves(info);
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([]);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(messages.no_service_plans_found(info.label)).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).resolves([]);
            await commands.cmdCreateService();
        });

        it("withProgress is called, servicesInfo is not empty, planInfo is empty", async () => {
            vscodeWindowMock.expects("showQuickPick").never();
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([{'label': 'myService'}]);
            const plans = [{label: 'plan1'}, {label: 'plan2'}];
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_service_plan_list,
                cancellable: false
            }).resolves(plans);
            vscodeWindowMock.expects("showInputBox").withArgs({
                ignoreFocusOut: true,
                placeHolder: messages.create_service_enter_params,
                value: "{}",
                valueSelection: undefined,
                validateInput: validateParams('testServiceInfoLabel')
            }).resolves("{}");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.creating_service("instanceName", "myService", "plan1"),
                cancellable: true
            }).resolves();
            const service = {name: 'myService', plan: 'plan1', tag: '', prompt: ''};
            await commands.cmdCreateService(service);
        });

        it("withProgress filtered is called, servicesInfo is not empty, planInfo is empty", async () => {
            vscodeWindowMock.expects("showQuickPick").never();
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([{'label': 'myService'}]);
            const plans = [{label: 'plan1'}, {label: 'plan2'}];
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_service_plan_list,
                cancellable: false
            }).resolves(plans);
            const service = {name: 'myService', plan: 'wrong', tag: '', prompt: ''};
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(messages.no_service_plan_info_found(service.plan, 'myService')).resolves();
            await commands.cmdCreateService(service);
        });

        it("withProgress is called, servicesInfo is not empty, planInfo is not empty", async () => {
            vscodeWindowMock.expects("showQuickPick").resolves({ service_plans_url: "test_service_plans_url", label: "testServiceInfoLabel" });
            vscodeWindowMock.expects("showQuickPick").withExactArgs([{}], { placeHolder: messages.select_service_plan }).resolves({ label: "testPlanInfoLabel" });
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("showInputBox").withArgs({
                ignoreFocusOut: true,
                placeHolder: messages.create_service_enter_params,
                value: "{}",
                valueSelection: undefined,
                validateInput: validateParams('testServiceInfoLabel')
            }).resolves("{}");
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).resolves([{}]);
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.creating_service("instanceName", "testServiceInfoLabel", "testPlanInfoLabel"),
                cancellable: true
            }).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([]);
            const result = await commands.cmdCreateService();
            expect(result).to.be.undefined;
        });

        it("withProgress is called, servicesInfo is not empty, planInfo is not empty, params empty", async () => {
            vscodeWindowMock.expects("showQuickPick").resolves({ service_plans_url: "test_service_plans_url", label: "testServiceInfoLabel" });
            vscodeWindowMock.expects("showQuickPick").withExactArgs([{}], { placeHolder: messages.select_service_plan }).resolves({ label: "testPlanInfoLabel" });
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("showInputBox").withArgs({
                ignoreFocusOut: true,
                placeHolder: messages.create_service_enter_params,
                value: "{}",
                valueSelection: undefined,
                validateInput: validateParams('testServiceInfoLabel')
            }).resolves('');
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).resolves([{}]);
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.creating_service("instanceName", "testServiceInfoLabel", "testPlanInfoLabel"),
                cancellable: true
            }).never();
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).resolves([]);
            const result = await commands.cmdCreateService();
            expect(result).to.be.undefined;
        });

        it("withProgress is called but thrown exception", async () => {
            const error = new Error('withProgress error');
            vscodeWindowMock.expects("showInputBox").withExactArgs({ placeHolder: messages.enter_service_name }).resolves("instanceName");
            vscodeWindowMock.expects("withProgress").withArgs({
                location: testVscode.ProgressLocation.Notification,
                title: messages.loading_services,
                cancellable: true
            }).rejects(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            const result = await commands.cmdCreateService();
            expect(result).to.be.undefined;
        });

    });

    describe("onCreateService", () => {
        it("createService throws an error", async () => {
            const error = new Error("testError");
            cfLocalMock.expects("cfCreateService").throws(error);
            try {
                await commands.onCreateService({ guid: "", label: "", description: "" }, "testInstance", undefined, undefined, undefined);
                expect(false).to.be.equal(true);
            } catch (e) {
                expect(_.get(e, 'message')).to.be.equal(error.message);
            }
        });

        it("createService suceeded and returns cf resource", async () => {
            cfLocalMock.expects("cfCreateService").returns({ entity: {}, metadata: {} });
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_created("testInstance")).resolves();
            await commands.onCreateService({ guid: "", label: "", description: "" }, "testInstance", {}, undefined, undefined);
        });

        it("createService suceeded", async () => {
            cfLocalMock.expects("cfCreateService").returns("testResource");
            vscodeWindowMock.expects("showInformationMessage").withExactArgs("testResource").resolves();
            await commands.onCreateService({ guid: "", label: "", description: "" }, "testInstance", {}, undefined, undefined);
        });
    });

    describe("isCFResource", () => {
        it("obj is undefined", () => {
            expect(commands.isCFResource(undefined)).to.be.false;
        });

        it("obj has no entity property", () => {
            expect(commands.isCFResource({ "metadata": {} })).to.be.false;
        });

        it("obj has no metadata property", () => {
            expect(commands.isCFResource({ "entity": {} })).to.be.false;
        });

        it("obj is a cf resource", () => {
            expect(commands.isCFResource({ "entity": {}, "metadata": {} })).to.be.true;
        });
    });

    describe("isServiceTypeInfoInArray", () => {
        it("obj is undefined", () => {
            expect(commands.isServiceTypeInfoInArray(undefined)).to.be.false;
        });

        it("obj is not an array", () => {
            expect(commands.isServiceTypeInfoInArray({ "metadata": {} })).to.be.false;
        });

        it("obj has no name property", () => {
            expect(commands.isServiceTypeInfoInArray([{ "metadata": {} }])).to.be.false;
        });

        it("obj has name property", () => {
            expect(commands.isServiceTypeInfoInArray([{ "name": "test" }])).to.be.true;
        });
    });

    it("getServiceInstances", async () => {
        vscodeWindowMock.expects("withProgress").withArgs({
            location: testVscode.ProgressLocation.Notification,
            title: messages.loading_services,
            cancellable: true
        }).resolves();
        const result = await commands.getAvailableServices();
        expect(result).to.be.undefined;
    });

    describe("getAvailableServices", () => {
        let btnText = "Select a target";
        let commandId = "cf.set.orgspace";

        it("on success", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).resolves([{}]);
            const result = await commands.getAvailableServices();
            expect(result).to.have.lengthOf(1);
        });

        it("on any error", async () => {
            const errorMessage = "test error";
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).rejects(new Error(errorMessage));
            try {
                await commands.getAvailableServices();
                expect(true).to.be.equal(false);
            } catch (e) {
                expect(e.message).to.be.equal(errorMessage);
            }
        });

        it("on any login ok", async () => {
            const errorMessage = messages.cf_setting_not_set;
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).rejects(new Error(errorMessage));
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, btnText).resolves(btnText);
            vscodeCommandsMock.expects("executeCommand").withExactArgs(commandId).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).resolves([{}]);
            cfLocalMock.expects("cfGetTarget").resolves({user: 'bag023'});
            const result = await commands.getAvailableServices();
            expect(result).to.have.lengthOf(1);
        });

        it("on any login error", async () => {
            const errorMessage = messages.cf_setting_not_set;
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).rejects(new Error(errorMessage));
            cfLocalMock.expects("cfGetTarget").resolves({user: 'bag023'});
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, btnText).resolves();
            try {
                await commands.getAvailableServices();
                fail("should fail");
            } catch (e) {
                expect(e).to.be.equal(undefined);
            }
        });

        it("on any login ok - org no space", async () => {
            btnText = "Select a space";
            commandId = "cf.select.space";
            const errorMessage = messages.cf_setting_not_set;
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).rejects(new Error(errorMessage));
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, btnText).resolves(btnText);
            vscodeCommandsMock.expects("executeCommand").withExactArgs(commandId).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).resolves([{}]);
            cfLocalMock.expects("cfGetTarget").resolves({user: 'bag023', org: "org"});
            const result = await commands.getAvailableServices();
            expect(result).to.have.lengthOf(1);
        });

        it("on any login ok - unneccessary", async () => {
            btnText = "Select a space";
            commandId = "cf.select.space";
            const errorMessage = messages.cf_setting_not_set;
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).rejects(new Error(errorMessage));
            cfLocalMock.expects("cfGetTarget").resolves({user: 'bag023', org: "org", space: "space"});
            try {
                await commands.getAvailableServices();
                fail("should fail");
            } catch (e) {
                expect(e).to.be.equal(errorMessage);
            }
        });
    });

    describe("updateInstanceNameAndTags", () => {
        it("availableServices is empty", async () => {
            vscodeWindowMock.expects("showQuickPick").never();
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(messages.no_services_instances_found);
            const result = await commands.updateInstanceNameAndTags([], null, [], []);
            expect(result).to.be.undefined;
        });

        it("availableServices is empty for service type", async () => {
            vscodeWindowMock.expects("showQuickPick").never();
            const name = 'absent_service';
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(messages.no_services_instances_found_for_type(name));
            const result = await commands.updateInstanceNameAndTags([], { name, plan: '', tag: '', prompt: null }, [], []);
            expect(result).to.be.undefined;
        });

        it("availableServices is not empty", async () => {
            const plans = [{ guid: 'plan_guid_1', label: 'uuaa', description: "plan_description_1" }];
            const availableServices = [{ serviceName: "testServiceName1", "label": "testLabel1", plan_guid: 'plan_guid_1' }, { serviceName: "testServiceName2", "label": "More results..." }];
            const pickItems = [{ description: `testServiceName1 (${plans[0].label})`, "label": "testLabel1" }, { description: "testServiceName2", "label": "More results..." }];
            vscodeWindowMock.expects("showQuickPick").withExactArgs(pickItems, {
                placeHolder: "testPrompt",
                canPickMany: false,
                matchOnDetail: true,
                ignoreFocusOut: true
            }).resolves(pickItems[0]);
            const result = await commands.updateInstanceNameAndTags(availableServices, { tag: "testTag", name: "testServiceName1", plan: "testPlan", prompt: "testPrompt", plans }, [], []);
            expect(result).to.be.equal("testLabel1");
        });

        it("availableServices has more services", async () => {
            const availableServices = [{ serviceName: "testServiceName1", "label": "More results..." }];
            const pickItems = [{ description: "testServiceName1", "label": "More results..." }];

            vscodeWindowMock.expects("showQuickPick").withExactArgs([pickItems[0]], {
                placeHolder: "testPrompt",
                canPickMany: false,
                matchOnDetail: true,
                ignoreFocusOut: true
            }).resolves(pickItems[0]);
            const result = await commands.updateInstanceNameAndTags(availableServices, { tag: "testTag", name: "testName", plan: "testPlan", prompt: "testPrompt" }, [], []);
            expect(result).to.be.equal("More results...");
        });

    });

    describe("fetchServicePlanList", () => {
        const loginToCF = "Login to CF";
        const plan = { label: 'test' };

        it("on success", async () => {
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).resolves([plan]);
            vscodeWindowMock.expects("showWarningMessage").never();
            const result = await commands.fetchServicePlanList();
            expect(result).to.have.lengthOf(1);
            expect(result[0].label).to.equal(plan.label);
        });

        it("on rejected - login ok", async () => {
            const errorMessage = "FAILED\nNo API endpoint set. Use 'cf login' or 'cf api' to target an endpoint.\n";
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).rejects(new Error(errorMessage));
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, loginToCF).resolves(loginToCF);
            cfLocalMock.expects("cfGetTarget").rejects();
            vscodeCommandsMock.expects("executeCommand").withExactArgs('cf.login').resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).resolves([plan]);
            const result = await commands.fetchServicePlanList();
            expect(result[0].label).to.equal(plan.label);
        });

        it("on rejected - login canceled", async () => {
            const errorMessage = "FAILED\nNo API endpoint set. Use 'cf login' or 'cf api' to target an endpoint.\n";
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).rejects(new Error(errorMessage));
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, loginToCF).resolves();
            cfLocalMock.expects("cfGetTarget").rejects();
            vscodeCommandsMock.expects("executeCommand").never();
            try {
                await commands.fetchServicePlanList();
                fail("should fail");
            } catch (e) {
                expect(e).to.be.equal(undefined);
            }
        });

        it("on rejected - login canceled by user", async () => {
            const errorMessage = "FAILED\nNo API endpoint set. Use 'cf login' or 'cf api' to target an endpoint.\n";
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).rejects(new Error(errorMessage));
            cfLocalMock.expects("cfGetTarget").rejects();
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(errorMessage, loginToCF).resolves();
            vscodeCommandsMock.expects("executeCommand").never();
            try {
                await commands.fetchServicePlanList();
                expect(true).to.be.equal(false);
            } catch (e) {
                expect(e).to.be.equal(undefined);
            }
        });

        it("on rejected - other error", async () => {
            const errorMessage = "FAILED\nNo API endpoint set.";
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_service_plan_list, cancellable: false }).rejects(new Error(errorMessage));
            vscodeCommandsMock.expects("executeCommand").never();
            try {
                await commands.fetchServicePlanList();
                expect(true).to.be.equal(false);
            } catch (e) {
                expect(e.message).to.be.equal(errorMessage);
            }
        });
    });

    describe("getInstanceName", () => {

        const MORE_RESULTS = "More results...";
        const servicesPage2 = [
            { serviceName: 'serviceName2', label: "label2" },
        ];
        const availableServices: ServiceInstanceInfo[] = [
            { serviceName: 'serviceName1', label: "label1" },
            { label: MORE_RESULTS, serviceName: "more:2", alwaysShow: true }
        ];
        const items = [
            { label: availableServices[0].label, description: availableServices[0].serviceName },
            { label: availableServices[1].label, description: availableServices[1].serviceName }
        ];
        const allItems = [
            { label: availableServices[0].label, description: availableServices[0].serviceName },
            { label: servicesPage2[0].label, description: servicesPage2[0].serviceName }
        ];


        it("on success", async () => {
            vscodeWindowMock.expects("showQuickPick").withExactArgs(items, { placeHolder: messages.select_service, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(items[1]);
            vscodeWindowMock.expects("withProgress").withArgs({ location: testVscode.ProgressLocation.Notification, title: messages.loading_services, cancellable: true }).resolves(servicesPage2);
            vscodeWindowMock.expects("showQuickPick").withExactArgs(allItems, { placeHolder: messages.select_service, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(items[0]);
            const result = await commands.getInstanceName(availableServices);
            expect(result).to.equal(items[0].label);
        });

        it("on success - service name pattern", async () => {
            vscodeWindowMock.expects("showQuickPick").withExactArgs(allItems, { placeHolder: messages.select_service, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true }).resolves(items[0]);
            const serviceType: ServiceTypeInfo = { name: '/.*Name.*/', tag: '', plan: '', prompt: messages.select_service };
            const result = await commands.getInstanceName(availableServices, serviceType);
            expect(result).to.equal(items[0].label);
        });
    });

});
