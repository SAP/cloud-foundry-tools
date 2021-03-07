/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode";
import {
    ServiceInfo, PlanInfo, ServiceInstanceInfo, cfLogin, cfGetAvailableOrgs, cfGetAvailableSpaces, cfSetOrgSpace, CF_PAGE_SIZE, IServiceQuery,
    Cli, CliResult, cfGetServicePlans, cfGetServices, cfCreateService, cfGetServicePlansList, ServiceTypeInfo, cfGetTarget, ITarget, cfCreateUpsInstance, cfGetServiceInstances
} from "@sap/cf-tools";
import { messages } from "./messages";
import { cmdReloadTargets } from "./cfViewCommands";
import * as _ from "lodash";
import {
    validateParams, generateParams4Service, getAllServiceInstances,
    DisplayServices, isRegexExpression, composeFilterPattern, toText,
    UpsServiceQueryOprions, getUpsServiceInstances
} from "./utils";
import { stringify, parse } from "comment-json";
import { getModuleLogger } from "./logger/logger-wrapper";

const OK = "OK";
const MORE_RESULTS = "More results...";
export const CMD_CREATE_SERVICE = "+ Create a new service instance";
export const USER_PROVIDED_SERVICE = 'user_provided_service_instance';
const LOGGER_MODULE = "commands";

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
    let commandId: string;
    let target: ITarget;
    try {
        target = await cfGetTarget();
    } catch (e) {
        // not logged in ...
    }
    if (!target || !target.user) {
        commandId = "cf.login";
    } else if (!target.org) {
        commandId = "cf.set.orgspace";
    } else if (!target.space) {
        commandId = "cf.select.space";
    } else {
        getModuleLogger(LOGGER_MODULE).error("setCfTarget: cfGetTarget failed", { target: target }, { message: message });
        return Promise.reject(new Error(message));
    }

    const result = await vscode.commands.executeCommand(commandId);
    if (undefined === result) {
        return Promise.reject(); // canceled
    }
    return result;
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
            if (errorMessage.includes(messages.cf_setting_not_set) || errorMessage.includes("login") || errorMessage.includes("re-authenticate")) {
                await setCfTarget(errorMessage);
            } else {
                return Promise.reject(error);
            }
        }
    }
}

export async function verifyLoginRetry(options?: { weak?: boolean }): Promise<unknown | undefined> {
    let result: unknown;
    try {
        result = await runWithProgressAndLoginRetry(false, messages.verify_cf_connectivity, async () => {
            const target = await cfGetTarget();
            return options?.weak
                ? target
                : (_.get(target, 'user') && _.get(target, 'org') && _.get(target, 'space') ? target : Promise.reject(new Error(messages.cf_setting_not_set)));
        });
    } catch (e) {
        getModuleLogger(LOGGER_MODULE).error("verifyLoginRetry failed", { message: toText(e) }, { options: options });
    }
    return result;
}

export async function cmdCFSetOrgSpace(weak = false): Promise<string | undefined> {
    try {
        let result = '';
        if (weak || await verifyLoginRetry({ weak: true })) {
            let warningMessage;
            const orgs = await invokeLongFunctionWithProgress(cfGetAvailableOrgs.bind(undefined), messages.getting_orgs);
            if (_.size(orgs)) {
                const org = await vscode.window.showQuickPick(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
                if (org) {
                    const spaces = await invokeLongFunctionWithProgress(cfGetAvailableSpaces.bind(undefined, _.get(org, "guid")), messages.getting_spaces);
                    if (_.size(spaces)) {
                        const space = await vscode.window.showQuickPick(spaces, {
                            placeHolder: messages.select_space,
                            canPickMany: false,
                            matchOnDetail: true,
                            ignoreFocusOut: true
                        });
                        if (space) {
                            await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, _.get(org, "label"), _.get(space, "label")), messages.set_org_space);
                            vscode.window.showInformationMessage(messages.success_set_org_space);
                            getModuleLogger(LOGGER_MODULE).debug("cmdCFSetOrgSpace: Organization <%s> and space <%s> have been set", _.get(org, "label"), _.get(space, "label"), { weak: weak });
                            return OK;
                        } else {
                            result = space; // undefined -> canceled        
                        }
                    } else {
                        result = undefined; // forced exit
                        warningMessage = messages.no_available_spaces;
                        getModuleLogger(LOGGER_MODULE).warn("cmdCFSetOrgSpace: No available spaces found in <%s> organization", _.get(org, "label"), { weak: weak });
                    }
                } else {
                    result = org; // undefined -> canceled
                }
            } else {
                result = undefined; // forced exit
                warningMessage = messages.no_available_orgs;
                getModuleLogger(LOGGER_MODULE).warn("cmdCFSetOrgSpace: No available organization found", { weak: weak });
            }
            if (warningMessage) {
                vscode.window.showWarningMessage(warningMessage);
            }
        }
        return result;
    } catch (e) {
        vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdCFSetOrgSpace failed", { weak: weak }, { message: toText(e) });
        return '';
    }
}

function pickCfTargetWithProgress(): Thenable<ITarget | undefined> {
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification, title: messages.verify_cf_connectivity
    }, () => cfGetTarget()).then((t) => t, () => undefined);
}

async function executeLogin(): Promise<string | undefined> {
    let result = '';
    const cfEndpoint = await vscode.window.showInputBox({ prompt: messages.enter_cf_endpoint, value: getCFDefaultLandscape(), ignoreFocusOut: true });
    if (cfEndpoint) {
        const userEmailName = await vscode.window.showInputBox({ prompt: messages.enter_user_email, ignoreFocusOut: true });
        if (userEmailName) {
            const password = await vscode.window.showInputBox({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true });
            if (password) {
                result = await invokeLongFunctionWithProgress(cfLogin.bind(undefined, cfEndpoint, userEmailName, password), messages.loggin_in);
                if (OK !== result) {
                    throw new Error(messages.authentication_failed(result));
                }
                vscode.window.showInformationMessage(messages.login_success);
                getModuleLogger(LOGGER_MODULE).debug("executeLogin: login succeeded");
            } else {
                result = password; // undefined -> canceled
            }
        } else {
            result = userEmailName; // undefined -> canceled
        }
    } else {
        result = cfEndpoint; // undefined -> canceled
    }
    return result;
}

export async function cmdLogin(weak = false): Promise<string | undefined> {
    try {
        let result = weak ? (_.get(await pickCfTargetWithProgress(), "user") ? OK : undefined) : undefined;
        if (!result) {
            result = await executeLogin();
        }
        if (OK === result) {
            result = await cmdCFSetOrgSpace(true);
        }
        return result;
    } catch (e) {
        vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdLogin failed", { weak: weak }, { message: toText(e) });
        return '';
    }
}

export async function cmdSelectSpace(): Promise<string | undefined> {
    try {
        let result = '';
        let warningMessage;
        const spaces = await runWithProgressAndLoginRetry(false, messages.getting_spaces, cfGetAvailableSpaces);
        if (_.size(spaces)) {
            const space = await vscode.window.showQuickPick(spaces, { canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
            if (space) {
                const org = _.find(await cfGetAvailableOrgs(), ['guid', space.orgGUID]);
                if (org) {
                    await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, org.label, space.label), messages.set_org_space);
                    vscode.window.showInformationMessage(messages.success_set_org_space);
                    getModuleLogger(LOGGER_MODULE).debug("cmdSelectSpace: org <%s> and space <%s> have been set", org.label, space.label);
                    result = OK;
                } else {
                    warningMessage = messages.no_available_orgs;
                    getModuleLogger(LOGGER_MODULE).warn("cmdSelectSpace: no available organization found");
                    result = org;
                }
            } else {
                result = space;
            }
        } else {
            result = undefined; // forced exit
            warningMessage = messages.no_available_spaces;
            getModuleLogger(LOGGER_MODULE).warn("cmdSelectSpace: no available spaces found");
        }
        if (warningMessage) {
            vscode.window.showWarningMessage(warningMessage);
        }
        return result;
    } catch (e) {
        vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdSelectSpace failed", { message: toText(e) });
        return '';
    }
}

export async function cmdCreateTarget(): Promise<void> {
    // first ask for service-name
    const targetName = await vscode.window.showInputBox({ placeHolder: messages.name_for_target, ignoreFocusOut: true });
    if (targetName) {
        const cliResult: CliResult = await Cli.execute(["save-target", "-f", targetName]);
        if (cliResult.exitCode !== 0) {
            vscode.window.showErrorMessage(cliResult.stdout);
            getModuleLogger(LOGGER_MODULE).error("cmdCreateTarget : command 'save-target -f <%s>' failed", targetName, { message: cliResult.stdout });
            return Promise.reject(new Error(cliResult.stdout));
        }

        await cmdReloadTargets();
        vscode.window.showInformationMessage(messages.target_created(targetName));
        getModuleLogger(LOGGER_MODULE).debug("cmdCreateTarget: the <%s> target has been created", targetName);
    }
}

function ask4ArbitraryParams(serviceInfo: ServiceInfo, plan: PlanInfo): Thenable<string> {
    const data = generateParams4Service(serviceInfo.label, plan.label);
    const value = stringify(data);
    const xsappname = _.get(data, 'xsappname');
    const pos = value.indexOf(xsappname);
    return vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: messages.create_service_enter_params,
        value,
        valueSelection: (pos > 0) ? [pos, pos + _.size(xsappname)] : undefined,
        validateInput: validateParams(_.get(serviceInfo, 'label'), _.get(plan, 'label'))
    });
}

async function onGetServicePlansFromCF(url: string, isCancelable = false, title?: string): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(isCancelable, title || messages.loading_service_plan_list, cfGetServicePlans as () => Promise<unknown>, url);
}

export function filterArrayByAttribute(collection: unknown[], filterKey: string, byAttribute: string, filterConds?: (data: unknown) => boolean): unknown[] {
    if (collection) {
        const pattern = composeFilterPattern(filterKey);
        return pattern ? collection.filter(item => new RegExp(pattern).test(_.get(item, byAttribute)) || (filterConds ? filterConds(item) : false)) : collection;
    }
    return collection;
}

export async function onCreateService(planInfo: PlanInfo, instanceName: string, params: unknown, tags: string[], progress: vscode.Progress<{
    message?: string;
    increment?: number;
}>, cancelToken: vscode.CancellationToken) {
    const response = await cfCreateService(planInfo.guid, instanceName, params || {}, tags || [], { "progress": progress, "cancelToken": cancelToken });
    vscode.window.showInformationMessage(isCFResource(response) ? messages.service_created(instanceName) : _.toString(response));
    getModuleLogger(LOGGER_MODULE).debug("onCreateService: the service has been created", { response: response });
    return isCFResource(response) ? _.get(response, "entity.name") : undefined;
}

async function createUpsInstance(name: string, info?: ServiceTypeInfo): Promise<string | undefined> {
    let result;
    const quietMode = info?.tag && info.allowCreate?.name;
    const credentials = quietMode ? "{}" :
        await vscode.window.showInputBox({ prompt: messages.enter_credentials, ignoreFocusOut: true, value: stringify({}), validateInput: validateParams("") });
    if (credentials) {
        const tags = quietMode ? info.tag :
            await vscode.window.showInputBox(_.merge({ prompt: messages.enter_tags, ignoreFocusOut: true }, info?.tag ? { value: info.tag } : {}));
        if (undefined !== tags) {
            const sysLogUrl = quietMode ? "" : await vscode.window.showInputBox({ prompt: messages.enter_sys_log_url, ignoreFocusOut: true });
            if (undefined !== sysLogUrl) {
                const routeUrl = quietMode ? "" : await vscode.window.showInputBox({ prompt: messages.enter_route_service_url, ignoreFocusOut: true });
                if (undefined !== routeUrl) { // canceled
                    const response = await cfCreateUpsInstance({
                        instanceName: name,
                        syslog_drain_url: sysLogUrl,
                        route_service_url: routeUrl,
                        credentials: parse(credentials),
                        tags: _.compact(_.split(tags, /[,\s]/))
                    });
                    vscode.window.showInformationMessage(isCFResource(response) ? messages.service_created(response.entity.name) : _.toString(response));
                    getModuleLogger(LOGGER_MODULE).debug("createUpsInstance: the service has been created", { response: response });
                    result = response?.entity?.name;
                }
            }
        }
    }
    return result;
}

async function createServiceInstance(name: string, info?: ServiceTypeInfo): Promise<string | undefined> {
    const serviceName = info?.allowCreate?.serviceName || info?.name;
    const servicePlan = info?.allowCreate?.plan || info?.plan;
    const serviceTag = info?.allowCreate?.tag || info?.tag;

    let servicesInfo: ServiceInfo[] = await runWithProgressAndLoginRetry(true, messages.loading_services, cfGetServices);
    if (serviceName) {
        servicesInfo = filterArrayByAttribute(servicesInfo, serviceName, 'label') as ServiceInfo[];
    }
    
    if (_.size(servicesInfo)) {
        const serviceInfo = (_.size(servicesInfo) === 1 && serviceName)
            ? servicesInfo[0]
            : await vscode.window.showQuickPick<ServiceInfo>(servicesInfo, { placeHolder: messages.select_services, ignoreFocusOut: true });

        if (!_.isEmpty(serviceInfo)) {
            let plansInfo: PlanInfo[] = await onGetServicePlansFromCF(serviceInfo.service_plans_url);
            if (_.size(plansInfo)) {

                plansInfo = servicePlan ? filterArrayByAttribute(plansInfo, servicePlan, 'label') as PlanInfo[] : plansInfo;

                if (_.size(plansInfo)) {
                    const planInfo: PlanInfo = (_.size(plansInfo) === 1 && servicePlan)
                        ? plansInfo[0]
                        : await vscode.window.showQuickPick<PlanInfo>(plansInfo, { placeHolder: messages.select_service_plan, ignoreFocusOut: true });

                    if (planInfo) {
                        const params = (info?.allowCreate?.getParams) ? stringify(await info.allowCreate.getParams()) : await ask4ArbitraryParams(serviceInfo, planInfo);
                        if (params) {
                            return vscode.window.withProgress({
                                location: vscode.ProgressLocation.Notification,
                                title: messages.creating_service(name, serviceInfo.label, planInfo.label),
                                cancellable: true
                            }, (progress, cancelToken) => onCreateService(planInfo, name, parse(params), serviceTag ? [serviceTag] : undefined, progress, cancelToken));
                        }
                    }
                } else {
                    throw new Error(messages.no_service_plan_info_found(servicePlan, serviceInfo.label));
                }
            } else {
                throw new Error(messages.no_service_plans_found(serviceInfo.label));
            }
        }
    } else {
        throw new Error(serviceName && !isRegexExpression(serviceName) ? messages.no_services_instances_found_for_type(serviceName) : messages.no_services_instances_found);
    }
}

async function createService(isUps: boolean, info?: ServiceTypeInfo): Promise<string | undefined> {
    // first ask for service-name
    const options = _.merge(
        { prompt: info?.allowCreate?.namePrompt ? `${info.allowCreate.namePrompt}` : messages.enter_service_name },
        info?.allowCreate?.name ? { value: `${info.allowCreate.name}` } : {},
        { ignoreFocusOut: true }
    );
    // Show instance name input box
    const instanceName = await vscode.window.showInputBox(options);
    if (instanceName) {
        try {
            return await (isUps ? createUpsInstance(instanceName, info) : createServiceInstance(instanceName, info));
        } catch (error) {
            vscode.window.showErrorMessage(toText(error));
            getModuleLogger(LOGGER_MODULE).error("createService: create instance <%s> failed", instanceName, { ups: isUps }, { info: info }, { message: toText(error) });
        }
    }
}

export async function cmdCreateService(info?: ServiceTypeInfo): Promise<string | undefined> {
    if (await verifyLoginRetry()) {
        return createService(false, info);
    }
}

export async function cmdCreateUps(info?: ServiceTypeInfo): Promise<string | undefined> {
    if (await verifyLoginRetry()) {
        return createService(true, info);
    }
}

export async function fetchServicePlanList(): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(false, messages.loading_service_plan_list, cfGetServicePlansList);
}

export async function getAvailableServices(opts?: DisplayServices, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return runWithProgressAndLoginRetry(true, progressTitle || messages.loading_services, getAllServiceInstances, opts);
}

export async function getServiceInstances(query?: IServiceQuery, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return runWithProgressAndLoginRetry(true, progressTitle || messages.loading_services, cfGetServiceInstances, query);
}

export async function getUserProvidedServiceInstances(options?: UpsServiceQueryOprions, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return runWithProgressAndLoginRetry(true, progressTitle || messages.loading_ups_services, getUpsServiceInstances, options);
}

async function askUserForServiceInstanceName(availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo): Promise<string | undefined> {
    const serviceName = _.get(serviceType, 'name');
    const availableServicesToShow = filterArrayByAttribute(
        availableServices, serviceName, 'serviceName', (data) => { return _.get(data, 'label') === CMD_CREATE_SERVICE || _.get(data, 'label') === MORE_RESULTS; }
    ) as ServiceInstanceInfo[];

    if (!_.size(availableServicesToShow)) {
        vscode.window.showErrorMessage(
            serviceName && !isRegexExpression(serviceName) ? messages.no_services_instances_found_for_type(serviceName) : messages.no_services_instances_found
        );
        getModuleLogger(LOGGER_MODULE).debug("askUserForServiceInstanceName: no service instances found for <%s> type", serviceName);
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
        instanceName = await (serviceTypeInfo.name === USER_PROVIDED_SERVICE ?
            cmdCreateUps(serviceTypeInfo) :
            cmdCreateService(serviceTypeInfo));
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
