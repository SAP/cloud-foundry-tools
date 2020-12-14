/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, assert } from "chai";
import * as _ from "lodash";
import * as sinon from "sinon";
import * as url from "url";
import * as nsVsMock from "./ext/mockVscode";
import { mockVscode } from "./ext/mockUtil";

nsVsMock.setTestRoots(["/", "/some_path"]);

mockVscode(nsVsMock.testVscode, "src/cfViewCommands.ts");
mockVscode(nsVsMock.testVscode, "src/logger/logger-wrapper.ts");
import * as cfViewCommands from "../src/cfViewCommands";
import * as commands from "../src/commands";
import * as cfLocal from "@sap/cf-tools/out/src/cf-local";
import { ServiceTypeInfo, ServiceInstanceInfo, Cli, DEFAULT_TARGET, CFTarget, IServiceQuery, eFilters, PlanInfo, eOperation } from "@sap/cf-tools";
import * as cfView from "../src/cfView";
import * as https from 'https';
import { messages } from "../src/messages";
import { fail } from "assert";
import { DisplayServices, ServiceQueryOptions, UpsServiceQueryOprions } from "../src/utils";

describe("cfViewCommands tests", () => {
    let sandbox: any;
    let vscodeWindowMock: any;
    let vscodeWorkspaceMock: any;
    let cfViewCommandsMock: any;
    let commandsMock: any;
    let cliMock: any;
    let httpsMock: any;
    let cfLocalMock: any;
    let cfViewMock: any;
    const cliResult = { exitCode: 0, stdout: "", stderr: "" };

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        cfViewMock = sandbox.mock(cfView.CFView);
        vscodeWindowMock = sandbox.mock(nsVsMock.testVscode.window);
        vscodeWorkspaceMock = sandbox.mock(nsVsMock.testVscode.workspace);
        cfViewCommandsMock = sandbox.mock(cfViewCommands);
        cfLocalMock = sandbox.mock(cfLocal);
        cliMock = sandbox.mock(Cli);
        commandsMock = sandbox.mock(commands);
        httpsMock = sandbox.mock(https);
    });

    afterEach(() => {
        cfLocalMock.verify();
        vscodeWindowMock.verify();
        vscodeWorkspaceMock.verify();
        cfViewCommandsMock.verify();
        cliMock.verify();
        cfViewMock.verify();
        httpsMock.verify();
        commandsMock.verify();
    });

    it("cmdReloadTargets", async () => {
        cfViewMock.expects("get").returns({ refresh: () => { return; } });
        await cfViewCommands.cmdReloadTargets();
    });

    it("cfDeployServiceAPI - https get on - error", async () => {
        const testToken = " \ntestToken\n";
        const ap = "https://api.cf.sap.hana.ondemand.com";
        const target = url.parse(_.replace(ap, "api.cf", "deploy-service.cfapps"));
        const options = {
            protocol: target.protocol,
            host: target.host,
            port: 443,
            method: "get",
            path: target.path,
            headers: { Authorization: testToken.replace("\n", "").replace("\n", "") }
        };
        cfLocalMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves(ap);
        cfLocalMock.expects("cfGetAuthToken").resolves(testToken);
        const errorText = "my error";
        const result = {
            on: (type: string, callback: any) => callback(new Error(errorText))
        };
        httpsMock.expects("get").withArgs(options).returns(result);
        try {
            await cfViewCommands.cfDeployServiceAPI("");
            fail("should not reach here");
        } catch (e) {
            expect(e).to.equal(errorText);
        }
    });

    it("cfDeployServiceAPI - https get on - error, url parse data", async () => {
        const urlPath = "url/path";
        const testToken = " \ntestToken\n";
        const ap = "https://api.cf.sap.hana.ondemand.com:8090";
        const target = url.parse(_.replace(ap, "api.cf", "deploy-service.cfapps"));
        const options = {
            protocol: target.protocol,
            host: target.host,
            port: target.port,
            method: "get",
            path: urlPath,
            headers: { Authorization: testToken.replace("\n", "").replace("\n", "") }
        };
        cfLocalMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves(ap);
        cfLocalMock.expects("cfGetAuthToken").resolves(testToken);
        const errorText = "my error";
        const result = {
            on: (type: string, callback: any) => callback(new Error(errorText))
        };
        httpsMock.expects("get").withArgs(options).returns(result);

        try {
            await cfViewCommands.cfDeployServiceAPI(urlPath);
            fail("should not reach here");
        } catch (e) {
            expect(e).to.equal(errorText);
        }
    });

    it("cfDeployServiceAPI - https get on - error, url parse data, default port", async () => {
        const urlPath = "url/path";
        const testToken = " \ntestToken\n";
        const ap = "http://api.cf.sap.hana.ondemand.com";
        const target = url.parse(_.replace(ap, "api.cf", "deploy-service.cfapps"));
        const options = {
            protocol: target.protocol,
            host: target.host,
            port: 80,
            method: "get",
            path: urlPath,
            headers: { Authorization: testToken.replace("\n", "").replace("\n", "") }
        };
        cfLocalMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves(ap);
        cfLocalMock.expects("cfGetAuthToken").resolves(testToken);
        const errorText = "my error";
        const result = {
            on: (type: string, callback: any) => callback(new Error(errorText))
        };
        httpsMock.expects("get").withArgs(options).returns(result);

        try {
            await cfViewCommands.cfDeployServiceAPI(urlPath);
            fail("should not reach here");
        } catch (e) {
            expect(e).to.equal(errorText);
        }
    });

    it("cfDeployServiceAPI - no target", async () => {
        cfLocalMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves([]);
        try {
            await cfViewCommands.cfDeployServiceAPI("");
            fail("should not reach here");
        } catch (e) {
            expect(e.message).to.equal(messages.no_cf_api_endpoint);
        }
    });

    it("cmdDeployServiceAPI", async () => {
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.verify_cf_connectivity, cancellable: false }).resolves({ data: {} });
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.load_data_from_deploy, cancellable: false }).resolves();
        await cfViewCommands.cmdDeployServiceAPI("", "");
    });

    it("cmdDeployServiceAPI - connectivity canceled", async () => {
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.verify_cf_connectivity, cancellable: false }).resolves();
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.load_data_from_deploy, cancellable: false }).never();
        await cfViewCommands.cmdDeployServiceAPI("", "");
    });

    it("cmdDeployServiceAPI - with arg", async () => {
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.verify_cf_connectivity, cancellable: false }).resolves({ data: {} });
        const message = "myMessage";
        vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: message, cancellable: false }).resolves();
        await cfViewCommands.cmdDeployServiceAPI("", message);
    });

    describe("cmdSetCurrentTarget scope", () => {
        const currentTarget: CFTarget = { label: "current Target", isDirty: false, isCurrent: true };
        const localView = {
            getCurrentTarget: () => currentTarget,
            refresh: () => ''
        };
        const target: CFTarget = { label: "my Target", isDirty: false, isCurrent: false };

        it("cmdSetCurrentTarget - target is not current", async () => {
            cliMock.expects("execute").never();
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, reload called", async () => {
            target.isCurrent = true;
            cfViewMock.expects("get").twice().returns(localView);
            cliMock.expects("execute").withExactArgs(["set-target", "-f", target.label]).resolves(cliResult);
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, is dirty, not save - No", async () => {
            target.isCurrent = true;
            currentTarget.isCurrent = true;
            currentTarget.isDirty = true;
            cfViewMock.expects("get").twice().returns(localView);
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.target_dirty_save(currentTarget.label), "Yes", "No", "Cancel").resolves("No");
            cliMock.expects("execute").withExactArgs(["set-target", "-f", target.label]).resolves(cliResult);
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, is dirty, not save - Cancel", async () => {
            target.isCurrent = true;
            currentTarget.isCurrent = true;
            currentTarget.isDirty = true;
            cfViewMock.expects("get").returns(localView);
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.target_dirty_save(currentTarget.label), "Yes", "No", "Cancel").resolves(undefined);
            cliMock.expects("execute").withExactArgs(["set-target", "-f", target.label]).never();
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, is dirty, save - Yes", async () => {
            target.isCurrent = true;
            currentTarget.isCurrent = true;
            currentTarget.isDirty = true;
            cfViewMock.expects("get").twice().returns(localView);
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.target_dirty_save(currentTarget.label), "Yes", "No", "Cancel").resolves("Yes");
            cliMock.expects("execute").withExactArgs(["set-target", "-f", target.label]).resolves(cliResult);
            cliMock.expects("execute").withExactArgs(["save-target"]).resolves();
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, exception thrown", async () => {
            target.isCurrent = true;
            currentTarget.isCurrent = true;
            currentTarget.isDirty = true;
            cfViewMock.expects("get").returns(localView);
            vscodeWindowMock.expects("showWarningMessage").withExactArgs(messages.target_dirty_save(currentTarget.label), "Yes", "No", "Cancel").resolves("Yes");
            const error = new Error("my error");
            cliMock.expects("execute").withExactArgs(["save-target"]).throws(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            await cfViewCommands.cmdSetCurrentTarget(target);
        });

        it("cmdSetCurrentTarget - target is current, not dirty, execute failed", async () => {
            target.isCurrent = true;
            currentTarget.isCurrent = true;
            currentTarget.isDirty = false;
            cfViewMock.expects("get").returns(localView);
            cliResult.exitCode = 1;
            cliResult.stdout = "any error";
            cliMock.expects("execute").withExactArgs(["set-target", "-f", target.label]).resolves(cliResult);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(cliResult.stdout).resolves();
            await cfViewCommands.cmdSetCurrentTarget(target);
        });
    });

    describe("cmdDeleteTarget scope", () => {
        const localView = {
            refresh: () => ''
        };

        it("cmdDeleteTarget - default-target", async () => {
            const item = { target: { label: DEFAULT_TARGET } };
            cliMock.expects("execute").withArgs(["delete-target"]).never();
            await cfViewCommands.cmdDeleteTarget(item);
        });

        it("cmdDeleteTarget - other deleted", async () => {
            cliResult.exitCode = 0;
            cliResult.stdout = "";
            const item = { target: { label: "other" } };
            cliMock.expects("execute").withArgs(["delete-target", item.target.label]).resolves(cliResult);
            cfViewMock.expects("get").returns(localView);
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.target_deleted(item.target.label)).resolves();
            await cfViewCommands.cmdDeleteTarget(item);
        });

        it("cmdDeleteTarget - other failure", async () => {
            const item = { target: { label: "other" } };
            cliResult.stdout = "some error during delete";
            cliResult.exitCode = -1;
            cliMock.expects("execute").withArgs(["delete-target", item.target.label]).resolves(cliResult);
            cfViewMock.expects("get").never();
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(cliResult.stdout).resolves();
            await cfViewCommands.cmdDeleteTarget(item);
        });

    });

    it("cmdGetSpaceServices", async () => {
        const title = "progress title";
        const query: IServiceQuery = { filters: [{ key: eFilters.name, value: "@^%$_^%+-_jlkj" }, { key: eFilters.gateway_name, value: "+-QWERE_+%?>jlkj" }] };
        const modified = _.cloneDeep(query);
        _.each(modified.filters, filter => { filter.value = encodeURIComponent(filter.value); });
        const arg = { query: modified, ups: { isShow: true } };
        commandsMock.expects("getAvailableServices").withExactArgs(arg, title).resolves();
        await cfViewCommands.cmdGetSpaceServices(query, title);
    });

    it("cmdGetSpaceServices - undefined query", async () => {
        const title = "progress title";
        const arg: any = { query: undefined, ups: { isShow: true } };
        commandsMock.expects("getAvailableServices").withExactArgs(arg, title).resolves();
        await cfViewCommands.cmdGetSpaceServices(undefined, title);
    });

    it("cmdGetServiceInstances - retrieve all services", async () => {
        const expServices: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana' }, { label: 's2', serviceName: 'hana' }];
        const title = "progress title - retrieve all services";
        const query: ServiceQueryOptions = undefined;
        commandsMock.expects("getServiceInstances").withExactArgs(query, title).resolves(expServices);
        const actualServices = await cfViewCommands.cmdGetServiceInstances(query, title);
        assert.deepEqual(actualServices, expServices);
    });


    it("cmdGetServiceInstances - retrieve all services", async () => {
        const expServices: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana' }, { label: 's2', serviceName: 'hana' }, { label: 's2', serviceName: 'hanatrial' }];
        const title = "progress title - retrieve hana services";
        commandsMock.expects("getServiceInstances").withExactArgs(undefined, title).resolves(expServices);
        const actualServices = await cfViewCommands.cmdGetServiceInstances(undefined, title);
        assert.deepEqual(actualServices, expServices);
    });

    it("cmdGetServiceInstances - retrieve hana services types with hdi-shared plan", async () => {
        const rspServices: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana' }, { label: 's2', serviceName: 'hana' }, { label: 's2', serviceName: 'hanatrial' }];
        const expServices: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana' }, { label: 's2', serviceName: 'hana' }];
        const title = "progress title - retrieve hana services";
        const plans: PlanInfo[] = [{ label: "hdi-shared", guid: "ABCD", description: "" }, { label: "hana", guid: "EFGH", description: "" }];
        commandsMock.expects("fetchServicePlanList").resolves(plans);
        const serviceInstanceQuery = { filters: [{ key: eFilters.service_plan_guid, value: "ABCD", op: eOperation.IN }] };
        const serviceQueryOptions: ServiceQueryOptions = { name: "hana", plan: "hdi-shared" };
        commandsMock.expects("getServiceInstances").withExactArgs(serviceInstanceQuery, title).resolves(rspServices);
        const actualServices = await cfViewCommands.cmdGetServiceInstances(serviceQueryOptions, title);
        assert.deepEqual(actualServices, expServices);
    });

    it("cmdGetServiceInstances - retrieve all services when service types and plan is missing", async () => {
        const expServices: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana' }, { label: 's2', serviceName: 'hana' }];
        const title = "progress title - retrieve hana services";
        const serviceQueryOptions: ServiceQueryOptions = {};
        commandsMock.expects("getServiceInstances").withExactArgs(undefined, title).resolves(expServices);
        const actualServices = await cfViewCommands.cmdGetServiceInstances(serviceQueryOptions, title);
        assert.deepEqual(actualServices, expServices);
    });

    it("cmdGetUpsServiceInstances", async () => {
        const title = "progress title - retrieve all services";
        const options: UpsServiceQueryOprions = { tag: "tags", credentials: { tag: "hana" } };
        commandsMock.expects("getUserProvidedServiceInstances").withExactArgs(options, title).resolves();
        await cfViewCommands.cmdGetUpsServiceInstances(options, title);
    });

    describe("cmdBindLocal scope", () => {
        const path = nsVsMock.testVscode.Uri.file("some/path");
        const service: ServiceTypeInfo[] = [{ name: "", plan: "hdi-shared", prompt: "", tag: "" }];
        let origin: any;
        const plans: PlanInfo[] = [{ label: "hdi-shared", guid: "ABCD", description: "" }, { label: "hana", guid: "EFGH", description: "" }];
        const services: ServiceInstanceInfo[] = [{ serviceName: "type1", label: "service1" }, { serviceName: "type2", label: "service2" }];
        const opts: DisplayServices = {
            query: { filters: [{ key: eFilters.service_plan_guid, value: "", op: eOperation.IN }] },
            ups: _.get(service, ['0', 'ups'])
        };

        before(() => {
            origin = commands.updateInstanceNameAndTags;
        });

        beforeEach(() => {
            _.set(commands, "updateInstanceNameAndTags", (availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo[], instanceNames: string[]) => {
                instanceNames.push(services[0].label);
                return Promise.resolve(instanceNames[0]);
            });
        });

        afterEach(() => {
            _.set(commands, "updateInstanceNameAndTags", origin);
        });

        it("cmdBindLocal - select path canceled", async () => {
            const emptyPath = nsVsMock.testVscode.Uri.file("");
            vscodeWindowMock.expects("showOpenDialog").withExactArgs({
                "openLabel": "Select folder for .env file",
                "canSelectFiles": false,
                "canSelectFolders": true,
                "canSelectMany": false,
                "defaultUri": nsVsMock.testVscode.workspace.workspaceFolders[0].uri
            }).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, emptyPath)).to.be.empty;
        });

        it("cmdBindLocal - path selected, service is CFService type", async () => {
            const emptyPath = nsVsMock.testVscode.Uri.file("");
            nsVsMock.testVscode.workspace.workspaceFolders = undefined;
            vscodeWindowMock.expects("showOpenDialog").withExactArgs({
                "openLabel": "Select folder for .env file",
                "canSelectFiles": false,
                "canSelectFolders": true,
                "canSelectMany": false,
                "defaultUri": nsVsMock.testVscode.workspace.workspaceFolders
            }).resolves([{ fsPath: "other/path" }]);
            const otherService = { contextValue: "cf-service", label: "my-service" };
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(otherService.label)).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            expect(await cfViewCommands.cmdBindLocal(otherService as unknown as cfView.CFService, { path: emptyPath, ignore: true })).to.be.equal(otherService.label);
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, no services found", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            opts.query.filters[0].value = plans[0].guid;
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.no_services_instances_found).resolves();
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves([]);
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal("");
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, no services found, creation allowed", async () => {
            const cloneService = _.merge(_.cloneDeep(service[0]), {"allowCreate": true});
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            opts.query.filters[0].value = plans[0].guid;
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves([]);
            commandsMock.expects("updateInstanceNameAndTags").withExactArgs([{label:'+ Create a new service instance', serviceName:''}], cloneService, [], []).resolves(undefined);
            expect(await cfViewCommands.cmdBindLocal([cloneService], { path, ignore: true })).to.be.equal("");
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, canceled", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            _.set(commands, "updateInstanceNameAndTags", () => { return Promise.resolve(); });
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal("");
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, type selected", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[0].label)).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal(services[0].label);
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, required specific service", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("updateInstanceNameAndTags").never();
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[0].label)).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true }, services[0].label)).to.be.equal(services[0].label);
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, required service not found", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("updateInstanceNameAndTags").never();
            vscodeWindowMock.expects("showErrorMessage").withArgs(messages.no_services_instance_byname_found("not-existed")).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true }, "not-existed")).to.be.empty;
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no services, services found, ups selected", async () => {
            service[0].plan = "";
            service[0].ups = { isShow: true };
            opts.query.filters[0].value = "";
            opts.ups = service[0].ups;
            const services: ServiceInstanceInfo[] = [{ serviceName: commands.USER_PROVIDED_SERVICE, label: "ups1" }, { serviceName: commands.USER_PROVIDED_SERVICE, label: "ups2" }];
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            _.set(commands, "updateInstanceNameAndTags", (availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo[], instanceNames: string[]) => {
                instanceNames.push(services[0].label);
                return Promise.resolve(instanceNames[0]);
            });
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[0].label)).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal(services[0].label);
        });

        it("cmdBindLocal - path selected, service is not ServiceTYpeInfo type, no ups, services found, type selected", async () => {
            service[0].plan = plans[0].label;
            delete service[0].name;
            opts.query.filters[0].value = plans[0].guid;
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("getInstanceName").withExactArgs(services).resolves(services[0].label);
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[0].label)).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal(services[0].label);
        });

        it("cmdBindLocal - path selected, service is not ServiceTYpeInfo type, no ups, services found, type selection canceled", async () => {
            service[0].plan = plans[0].label;
            delete service[0].name;
            opts.query.filters[0].value = plans[0].guid;
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("getInstanceName").withExactArgs(services).resolves();
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).never();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.empty;
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, selected new", async () => {
            service[0].plan = plans[0].label;
            service[0].name = '';
            opts.query.filters[0].value = plans[0].guid;
            const newService = "my-service";
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            _.set(commands, "updateInstanceNameAndTags", (availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo[], instanceNames: string[]) => {
                instanceNames.push(newService);
                return Promise.resolve(instanceNames[0]);
            });
            cfLocalMock.expects("cfGetInstanceMetadata").withExactArgs(newService).resolves({ serviceName: newService, service: service[0].plan, plan_guid: "GUID" });
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(newService)).resolves();
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.equal(newService);
        });

        it("cmdBindLocal - path selected, service is ServiceTYpeInfo type, no ups, services found, create allowed", async () => {
            service[0].plan = plans[0].label;
            service[0].name = '';
            service[0].allowCreate = {};
            opts.query.filters[0].value = plans[0].guid;
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            let expectedServicesList;
            let servicePlans;
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            _.set(commands, "updateInstanceNameAndTags", (availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo[]) => {
                expectedServicesList = availableServices;
                servicePlans = _.get(serviceTypeInfo, 'plans');
                return Promise.resolve();
            });
            expect(await cfViewCommands.cmdBindLocal(service, { path, ignore: true })).to.be.empty;
            expect(_.has(_.find(expectedServicesList, ['label', commands.CMD_CREATE_SERVICE]), "serviceName")).to.be.true;
            expect(_.size(servicePlans) === _.size(plans)).to.be.true;
        });
    });

    describe("bindLocalService scope", () => {
        let origin: any;
        const services: ServiceInstanceInfo[] = [{ serviceName: "hdi-shared", label: "label1" }, { serviceName: "hdi-shared", label: "label2" }];
        const plans: PlanInfo[] = [{ label: "hdi-shared", guid: "ABCD", description: "" }, { label: "hana", guid: "EFGH", description: "" }];
        const opts: DisplayServices = {
            query: { filters: [{ key: eFilters.service_plan_guid, value: plans[0].guid, op: eOperation.IN }] }
        };
        before(() => {
            origin = commands.updateInstanceNameAndTags;
        });

        beforeEach(() => {
            _.set(commands, "updateInstanceNameAndTags", (availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo[], instanceNames: string[]) => {
                instanceNames.push(services[1].label);
                return Promise.resolve(instanceNames[0]);
            });
        });

        afterEach(() => {
            _.set(commands, "updateInstanceNameAndTags", origin);
        });

        const service: ServiceTypeInfo[] = [{ name: "", plan: "hdi-shared", prompt: "", tag: "" }];
        const envPath = nsVsMock.testVscode.Uri.file("root/folder");

        it("bindLocalService - path is empty", async () => {
            const path = nsVsMock.testVscode.Uri.file("");
            expect(await cfViewCommands.bindLocalService(service, { path, ignore: true })).to.be.empty;
        });

        it("bindLocalService - path defined, plan required, no service selected", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            _.set(commands, "updateInstanceNameAndTags", () => { return Promise.resolve([]); });
            expect(await cfViewCommands.bindLocalService(service, { path: envPath, ignore: true })).to.be.undefined;
        });

        it("bindLocalService - path defined, plan required, service selected", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[1].label)).resolves();
            assert.deepEqual(await cfViewCommands.bindLocalService(service, { path: envPath, ignore: true }), [services[1].label]);
        });

        it("bindLocalService - serviceInfo is not array, service selected", async () => {
            vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(undefined);
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("getInstanceName").withExactArgs(services).resolves(services[1].label);
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).resolves();
            vscodeWindowMock.expects("showInformationMessage").withExactArgs(messages.service_bound_successful(services[1].label)).resolves();
            delete service[0].name;
            assert.deepEqual(await cfViewCommands.bindLocalService(service, envPath), [services[1].label]);
        });

        it("bindLocalService - serviceInfo is array, no services found", async () => {
            service[0].name = "";
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves([]);
            vscodeWindowMock.expects("withProgress").never();
            expect(await cfViewCommands.bindLocalService(service, { path: envPath, ignore: true })).to.be.empty;
        });

        it("bindLocalService - serviceInfo is not array, service selected, doBind rejected", async () => {
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            commandsMock.expects("getInstanceName").withExactArgs(services).resolves(services[1].label);
            const error = new Error("error");
            vscodeWindowMock.expects("withProgress").withArgs({ location: nsVsMock.testVscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false }).rejects(error);
            vscodeWindowMock.expects("showErrorMessage").withExactArgs(error.message).resolves();
            delete service[0].name;
            await cfViewCommands.bindLocalService(service, envPath);
        });

        it("bindLocalService - serviceInfo is array, service name required, no services found", async () => {
            const serviceTypes = [{ label: 'hana', service_plans_url: 'service_1_plans_url' }];
            service[0].plan = '';
            service[0].name = "hana";
            commandsMock.expects("fetchServicePlanList").resolves(plans);
            cfLocalMock.expects("cfGetServices").withExactArgs({ 'filters': [{ key: eFilters.label, value: encodeURIComponent(service[0].name) }] }).resolves(serviceTypes);
            cfLocalMock.expects("cfGetServicePlans").withExactArgs(serviceTypes[0].service_plans_url).returns(Promise.resolve(plans[0]));
            commandsMock.expects("getAvailableServices").withExactArgs(opts).resolves(services);
            assert.deepEqual(await cfViewCommands.bindLocalService(service, { path: envPath, ignore: true }), [services[1].label]);
        });

    });
});
