/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode"; // NOSONAR
import {
    ServiceInfo, PlanInfo, ServiceInstanceInfo, cfLogin, cfGetAvailableOrgs, cfGetAvailableSpaces, cfSetOrgSpace, CF_PAGE_SIZE,
    Cli, CliResult, cfGetServicePlans, cfGetServices, cfCreateService, cfGetServicePlansList, ServiceTypeInfo, cfGetTarget, ITarget
} from "@sap/cf-tools";
import { messages } from "./messages";
import { cmdReloadTargets, CMD_CREATE_SERVICE } from "./cfViewCommands";
import * as _ from "lodash";
import { validateParams, generateParams4Service, getAllServiceInstances, DisplayServices } from "./utils";
import { stringify, parse } from "comment-json";

const OK = "OK";
const MORE_RESULTS = "More results...";

export function isCFResource(obj: unknown): boolean {
    return _.has(obj, "entity") && _.has(obj, "metadata");
}

function getCFDefaultLandscape(): string {
    return _.get(process, "env.CF_API_ENDPOINT", "");
}

export function isServiceTypeInfoInArray(obj: unknown): boolean {
    return _.isArray(obj) && _.has(obj, "[0].name");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function invokeLongFunctionWithProgress(longFunction: any, progressMessage: string): Thenable<any> {
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: progressMessage
    }, () => longFunction());
}

async function setCfTarget(message: string) {
    let btnText: string;
    let commandId: string;
    let target: ITarget;
    try {
        target = await cfGetTarget();
    } catch (e) {
        btnText = "Login to CF";
    }
    if (btnText || !target.user) {
        btnText = "Login to CF";
        commandId = "cf.login";
    } else if (!target.org) {
        btnText = "Select a target";
        commandId = "cf.set.orgspace";
    } else if (target.org && !target.space) {
        btnText = "Select a space";
        commandId = "cf.select.space";
    } else {
        return Promise.reject(message);
    }

    if (await vscode.window.showWarningMessage(message, btnText)) {
        await vscode.commands.executeCommand(commandId);
    } else {
        return Promise.reject();
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runWithProgressAndLoginRetry(isCancelable: boolean, titleMessage: string, longFunction: () => Promise<any>, args?: any): Promise<any[]> {
    while (true) { // eslint-disable-line no-constant-condition
        try {
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: titleMessage,
                cancellable: isCancelable
            }, (progress, token) => longFunction.apply(null, _.isArray(args) ? _.concat(args, token) : [args, token]));
        } catch (error) {
            const errorMessage: string = _.get(error, "message", error.toString());
            if (errorMessage.includes(messages.cf_setting_not_set) || errorMessage.includes("login")) {
                await setCfTarget(errorMessage);
            } else {
                return Promise.reject(error);
            }
        }
    }
}

export async function cmdCFSetOrgSpace(): Promise<void> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orgs: any[] = await invokeLongFunctionWithProgress(cfGetAvailableOrgs.bind(undefined), messages.getting_orgs);
        if (_.isEmpty(orgs)) {
            vscode.window.showWarningMessage(messages.no_available_orgs);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const org: any = await vscode.window.showQuickPick(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
        if (org) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const spaces: any[] = await invokeLongFunctionWithProgress(cfGetAvailableSpaces.bind(undefined, org.guid), messages.getting_spaces);
            if (_.isEmpty(spaces)) {
                vscode.window.showWarningMessage(messages.no_available_spaces);
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const space: any = await vscode.window.showQuickPick(spaces, { placeHolder: messages.select_space, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
            if (space) {
                await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, org.label, space.label), messages.set_org_space);
                vscode.window.showInformationMessage(messages.success_set_org_space);
            }
        }
    } catch (e) {
        vscode.window.showErrorMessage(_.get(e, 'message'));
    }
}

export async function cmdLogin(): Promise<void> {
    const cfEndpoint = await vscode.window.showInputBox({ prompt: messages.enter_cf_endpoint, value: getCFDefaultLandscape(), ignoreFocusOut: true });
    if (cfEndpoint) {
        const userEmailName = await vscode.window.showInputBox({ prompt: messages.enter_user_email, ignoreFocusOut: true });
        if (userEmailName) {
            const password = await vscode.window.showInputBox({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true });
            if (password) {
                try {
                    const result = await invokeLongFunctionWithProgress(cfLogin.bind(undefined, cfEndpoint, userEmailName, password), messages.loggin_in);
                    if (result === OK) {
                        vscode.window.showInformationMessage(messages.login_success);
                        await cmdCFSetOrgSpace();
                    } else {
                        vscode.window.showErrorMessage(messages.authentication_failed(result));
                    }
                } catch (e) {
                    vscode.window.showErrorMessage(_.get(e, 'message'));
                }
            }
        }
    }
}


export async function cmdSelectSpace() {
    try {
        const space = await vscode.window.showQuickPick(await cfGetAvailableSpaces(), { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
        if (space) {
            const org = _.find(await cfGetAvailableOrgs(), ['guid', space.orgGUID]);
            if (org) {
                await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, org.label, space.label), messages.set_org_space);
                vscode.window.showInformationMessage(messages.success_set_org_space);
            } else {
                vscode.window.showWarningMessage(messages.space_not_set);
            }
        }
    } catch (e) {
        vscode.window.showErrorMessage(_.get(e, 'message'));
    }
}

export async function cmdCreateTarget(): Promise<void> {
    // first ask for service-name
    const targetName = await vscode.window.showInputBox({ placeHolder: messages.name_for_target });
    if (targetName) {
        const cliResult: CliResult = await Cli.execute(["save-target", "-f", targetName]);
        if (cliResult.exitCode !== 0) {
            vscode.window.showErrorMessage(cliResult.stdout);
            return Promise.reject(new Error(cliResult.stdout));
        }

        await cmdReloadTargets();
        vscode.window.showInformationMessage(messages.target_created(targetName));
    }
}

function ask4ArbitraryParams(serviceInfo: ServiceInfo, plan: PlanInfo): Thenable<string> {
    const data = generateParams4Service(_.get(serviceInfo, 'label'), _.get(plan, 'label'));
    const value = stringify(data);
    const xsappname = _.get(data, 'xsappname');
    const pos = value.indexOf(xsappname);
    return vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: messages.create_service_enter_params,
        value,
        valueSelection: (pos > 0) ? [pos, pos + _.size(xsappname)] : undefined,
        validateInput: validateParams(_.get(serviceInfo, 'label'), _.get(plan, 'label'))
    });
}

async function onGetServicePlansFromCF(url: string, isCancelable?: boolean, title?: string): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(isCancelable || false, title || messages.loading_service_plan_list, cfGetServicePlans as () => Promise<unknown>, url);
}

export async function onCreateService(planInfo: PlanInfo, instanceName: string, params: unknown, progress: vscode.Progress<{
    message?: string;
    increment?: number;
}>, cancelToken: vscode.CancellationToken) {
    const response = await cfCreateService(planInfo.guid, instanceName, params || {}, [], { "progress": progress, "cancelToken": cancelToken });
    vscode.window.showInformationMessage(isCFResource(response) ? messages.service_created(instanceName) : response.toString());
    return isCFResource(response) ? _.get(response, "entity.name") : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cmdCreateService(info?: ServiceTypeInfo): Promise<any | undefined> {
    // first ask for service-name
    const instanceName = await vscode.window.showInputBox({ placeHolder: messages.enter_service_name });
    if (_.isEmpty(instanceName)) {
        return;
    }
    try {
        let servicesInfo: ServiceInfo[] = await runWithProgressAndLoginRetry(true, messages.loading_services, cfGetServices);
        if (info?.name) {
            servicesInfo = _.filter(servicesInfo, ['label', info.name]);
        }
        const serviceInfo = (_.size(servicesInfo) === 1 && info?.name)
            ? servicesInfo[0] 
            : await vscode.window.showQuickPick<ServiceInfo>(servicesInfo, { placeHolder: messages.select_services });
        
        if (_.isEmpty(serviceInfo)) {
            return;
        }
        let plansInfo: PlanInfo[] = await onGetServicePlansFromCF(serviceInfo.service_plans_url);
        if (!_.size(plansInfo)) {
            throw new Error(messages.no_service_plans_found(serviceInfo.label));
        }
        if (info?.plan) {
            plansInfo = _.filter(plansInfo, ['label', info.plan]);
        }
        if (!_.size(plansInfo)) {
            throw new Error(messages.no_service_plan_info_found(info?.plan, serviceInfo.label));
        }
        const planInfo: PlanInfo = (_.size(plansInfo) === 1 && info?.plan)
            ? plansInfo[0]
            : await vscode.window.showQuickPick<PlanInfo>(plansInfo, { placeHolder: messages.select_service_plan });
        
        if (planInfo) {
            const params = await ask4ArbitraryParams(serviceInfo, planInfo);
            if (params) {
                return await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: messages.creating_service(instanceName, serviceInfo.label, planInfo.label),
                    cancellable: true
                }, (progress, cancelToken) => onCreateService(planInfo, instanceName, parse(params), progress, cancelToken));
            }
        }
    } catch (error) {
        if (error) {
            vscode.window.showErrorMessage(_.get(error, "message", error));
        }
    }
}

export async function fetchServicePlanList(): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(false, messages.loading_service_plan_list, cfGetServicePlansList);
}

export async function getAvailableServices(opts?: DisplayServices): Promise<ServiceInstanceInfo[]> {
    return runWithProgressAndLoginRetry(true, messages.loading_services, getAllServiceInstances, opts);
}

async function askUserForServiceInstanceName(availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo): Promise<string | undefined> { // NOSONAR
    const serviceName = _.get(serviceType, 'name');
    let pattern: string;
    if (serviceName) {
        pattern = /^\/\S+\/$/g.test(serviceName) ? _.trim(serviceName, '/') : `^${serviceName}$`;
    }
    const availableServicesToShow = pattern
        ? availableServices.filter(service => new RegExp(pattern).test(_.get(service, 'serviceName')) || _.get(service, 'label') === MORE_RESULTS)
        : availableServices;

    if (!_.size(availableServicesToShow)) {
        vscode.window.showErrorMessage(
            _.get(serviceType, 'name') ? messages.no_services_instances_found_for_type(serviceName) : messages.no_services_instances_found
        );
        return;
    }

    const pickItems = _.map(availableServicesToShow, s => {
        const plan = _.get(_.find(_.get(serviceType, 'plans'), ['guid', s.plan_guid]), 'label');
        return { label: s.label, description: s.serviceName + (plan ? ` (${plan})` : '') };
    });

    return vscode.window.showQuickPick(
        pickItems, {
        placeHolder: serviceType ? serviceType.prompt : messages.select_service,
        canPickMany: false,
        matchOnDetail: true,
        ignoreFocusOut: true
    }).then(pickedItem => {
        return _.get(pickedItem, "label");
    });
}

async function checkForMoreServices(instanceName: string | undefined, availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo): Promise<boolean> {
    if (instanceName === MORE_RESULTS && _.size(availableServices) > 0) {
        const lastElem = availableServices.pop();
        if (!lastElem) {
            return false;
        }

        if (!lastElem.serviceName.startsWith("more:")) {
            // unexpected
            availableServices.push(lastElem);
            return false;
        }

        // it is more:<next page>
        const nextPage = Number.parseInt(lastElem.serviceName.split(":")[1], 10);

        const nextAvailableServices = await getAvailableServices({ query: { page: nextPage }, ups: { tag: serviceType?.ups?.tag } });
        if (nextAvailableServices) {
            _.forEach(nextAvailableServices, nas => availableServices.push(nas));
            if (_.size(nextAvailableServices) === CF_PAGE_SIZE) {
                const siInfo: ServiceInstanceInfo = { label: MORE_RESULTS, serviceName: `more:${(nextPage + 1)}`, alwaysShow: true };
                availableServices.push(siInfo);
            }
        }

        return true;
    }

    return false;
}

export async function getInstanceName(availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo) {
    let instanceName = await askUserForServiceInstanceName(availableServices, serviceType);
    while (await checkForMoreServices(instanceName, availableServices, serviceType)) {
        instanceName = await askUserForServiceInstanceName(availableServices, serviceType);
    }

    return instanceName;
}

export async function updateInstanceNameAndTags(availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo, instanceNames: string[], tags: string[]) {
    let instanceName = await getInstanceName(availableServices, serviceTypeInfo);
    if (instanceName === CMD_CREATE_SERVICE) {
        instanceName = await cmdCreateService(serviceTypeInfo);
    }
    if (_.size(instanceName) > 0) {
        instanceNames.push(instanceName);
        tags.push(serviceTypeInfo.tag);
    }
    return instanceName;
}

export function updateServicesOnCFPageSize(availableServices: ServiceInstanceInfo[]) {
    if (_.size(availableServices) === CF_PAGE_SIZE) {
        availableServices.push({ label: MORE_RESULTS, serviceName: "more:2", alwaysShow: true });
    }
}

