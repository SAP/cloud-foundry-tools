/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as vscode from "vscode";
import {
    ServiceInfo, PlanInfo, ServiceInstanceInfo, cfLogin, cfGetAvailableOrgs, cfGetAvailableSpaces, cfSetOrgSpace, CF_PAGE_SIZE, IServiceQuery,
    Cli, CliResult, cfGetServices, cfCreateService, cfGetServicePlansList, ServiceTypeInfo, cfGetTarget, ITarget, cfCreateUpsInstance,
    cfGetServiceInstances, eFilters, eServiceTypes, cfGetConfigFileField, cfGetConfigFileJson, cfApi
} from "@sap/cf-tools";
import { messages } from "./messages";
import { cmdReloadTargets } from "./cfViewCommands";
import * as _ from "lodash";
import {
    validateParams, generateParams4Service, getAllServiceInstances, DisplayServices, isRegexExpression,
    toText, UpsServiceQueryOprions, getUpsServiceInstances, resolveFilterValue, notifyWhenServicesInfoResultIncomplete, examCFTarget
} from "./utils";
import { stringify, parse } from "comment-json";
import { getModuleLogger } from "./logger/logger-wrapper";
import { CFLoginNode, getTargetRoot } from "./cfView";

const OK = "OK";
const Cancel = "Cancel";
const MORE_RESULTS = "More results...";
export const CMD_CREATE_SERVICE = "+ Create a new service instance";
const LOGGER_MODULE = "commands";

export function isCFResource(obj: unknown): boolean {
    return _.has(obj, "relationships") && _.has(obj, "links") && _.has(obj, "guid");
}

async function getCFDefaultLandscape(): Promise<string> {
    return _.get(process, "env.CF_API_ENDPOINT", "") || await cfGetConfigFileField("Target");
}

export function isServiceTypeInfoInArray(obj: unknown): boolean {
    return _.isArray(obj) && _.has(obj, "[0].name");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function invokeLongFunctionWithProgress(longFunction: any, progressMessage: string): Thenable<any> {
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: progressMessage
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
        getModuleLogger(LOGGER_MODULE).error("setCfTarget: cfGetTarget failed", { target: target }, { output: message });
        return Promise.reject(new Error(message));
    }

    const result = await vscode.commands.executeCommand(commandId);
    if (undefined === result) {
        return Promise.reject(); // canceled
    }
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runBaseWithProgressAndLoginRetry(isCancelable: boolean, titleMessage: string, longFunction: () => Promise<any>, onError: (error: Error) => Promise<any>, args?: any, errArgs?: any): Promise<any[]> {
    while (true) { // eslint-disable-line no-constant-condition
        try {
            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: titleMessage,
                cancellable: isCancelable
                // eslint-disable-next-line prefer-spread
            }, (progress, token) => longFunction.apply(null, _.isArray(args) ? _.concat(args, token) : [args, token]));
        } catch (error) {
            // eslint-disable-next-line prefer-spread
            await onError.apply(null, _.concat([error], errArgs||[]));
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onErrorSetCfTarget(error: Error): Promise<any> {
    const errorText = toText(error);
    if (errorText.includes(messages.cf_setting_not_set) || errorText.includes("login") || errorText.includes("re-authenticate")) {
        await setCfTarget(errorText);
    } else {
        return Promise.reject(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runWithProgressAndLoginRetry(isCancelable: boolean, titleMessage: string, longFunction: () => Promise<any>, args?: any): Promise<any[]> {
    return runBaseWithProgressAndLoginRetry(isCancelable, titleMessage, longFunction, onErrorSetCfTarget, args);
}

export async function verifyLoginRetry(options?: { weak?: boolean }): Promise<unknown | undefined> {
    let result: unknown;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result = await runWithProgressAndLoginRetry(
            false,
            messages.verify_cf_connectivity,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            examCFTarget as () => Promise<any>,
            [messages.cf_setting_not_set, ['user', 'org', 'space'], options?.weak]
        );
    } catch (e) {
        getModuleLogger(LOGGER_MODULE).error("verifyLoginRetry failed", { exception: toText(e) }, { options: options });
    }
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onErrorCfLogin(error: Error, endPoint?: string): Promise<any> {
    const errorText = toText(error);
    if (errorText.includes("login") || errorText.includes("re-authenticate")) {
        const result = await cmdLogin(false, false, endPoint);
        if (_.isUndefined(result)) {
            return Promise.reject(''); // canceled
        }
    } else {
        return Promise.reject(error);
    }
}

async function verifyLoginRetryPartial(opts?: { endPoint?: string }): Promise<unknown | undefined> {
    let result: unknown;
    try {
        result = await runBaseWithProgressAndLoginRetry(
            false,
            messages.verify_cf_connectivity,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            examCFTarget as () => Promise<any>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onErrorCfLogin as () => Promise<any>,
            [messages.login, ['user'], false],
            opts?.endPoint ? [opts.endPoint] : [] 
        );
    } catch (e) {
        getModuleLogger(LOGGER_MODULE).error("verifyLoginRetryPartial failed", { exception: toText(e) });
    }
    return result;
}

export async function cmdCFSetOrgSpace(opts?: { endPoint?: string, org?: string, space?: string }): Promise<string | undefined> {
    try {
        let result = '';
        if (await verifyLoginRetryPartial(opts)) {
            let warningMessage;
            const orgs = opts?.org ? [{ label: opts.org }] : await invokeLongFunctionWithProgress(cfGetAvailableOrgs.bind(undefined), messages.getting_orgs);
            if (_.size(orgs)) {
                const org = opts?.org ? { label: opts.org } : await vscode.window.showQuickPick(orgs, { placeHolder: messages.select_org, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
                if (org) {
                    const spaces = opts?.space ? [{ label: opts.space }] : await invokeLongFunctionWithProgress(cfGetAvailableSpaces.bind(undefined, _.get(org, "guid")), messages.getting_spaces);
                    if (_.size(spaces)) {
                        const space = opts?.space ? { label: opts.space } : await vscode.window.showQuickPick(spaces, {
                            placeHolder: messages.select_space,
                            canPickMany: false,
                            matchOnDetail: true,
                            ignoreFocusOut: true
                        });
                        if (space) {
                            await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, _.get(org, "label"), _.get(space, "label")), messages.set_org_space);
                            void vscode.window.showInformationMessage(messages.success_set_org_space);
                            getModuleLogger(LOGGER_MODULE).debug("cmdCFSetOrgSpace: Organization <%s> and space <%s> have been set", _.get(org, "label"), _.get(space, "label"));
                            return OK;
                        } else {
                            result = undefined; // undefined -> canceled        
                        }
                    } else {
                        result = undefined; // forced exit
                        warningMessage = messages.no_available_spaces;
                        getModuleLogger(LOGGER_MODULE).warn("cmdCFSetOrgSpace: No available spaces found in <%s> organization", _.get(org, "label"));
                    }
                } else {
                    result = undefined; // undefined -> canceled
                }
            } else {
                result = undefined; // forced exit
                warningMessage = messages.no_available_orgs;
                getModuleLogger(LOGGER_MODULE).warn("cmdCFSetOrgSpace: No available organization found");
            }
            if (warningMessage) {
                void vscode.window.showWarningMessage(warningMessage);
            }
        }
        return result;
    } catch (e) {
        void vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdCFSetOrgSpace failed", { exception: toText(e) });
        return '';
    }
}

function pickCfTargetWithProgress(): Thenable<ITarget | undefined> {
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification, title: messages.verify_cf_connectivity
    }, () => cfGetTarget()).then((t) => t, () => undefined);
}

async function executeLogin(cfEndpoint?: string): Promise<string | undefined> {
    let result = '';
    if (!cfEndpoint) {
        cfEndpoint = await vscode.window.showInputBox({ prompt: messages.enter_cf_endpoint, value: await getCFDefaultLandscape(), ignoreFocusOut: true });
    }
    if (cfEndpoint) {
        const userEmailName = await vscode.window.showInputBox({ prompt: messages.enter_user_email, ignoreFocusOut: true });
        if (userEmailName) {
            const password = await vscode.window.showInputBox({ prompt: messages.label_enter_password, password: true, ignoreFocusOut: true });
            if (password) {
                result = await invokeLongFunctionWithProgress(cfLogin.bind(undefined, cfEndpoint, userEmailName, password), messages.loggin_in);
                if (OK !== result) {
                    throw new Error(messages.authentication_failed(result));
                }
                void vscode.window.showInformationMessage(messages.login_success);
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

export async function cmdLogin(weak = false, target = true, extEndPoint?: string): Promise<string | undefined> {
    try {
        let endPoint = extEndPoint;
        let space;
        let org;
        let result = weak ? (_.get(await pickCfTargetWithProgress(), "user") ? OK : undefined) : undefined;
        if (!result) {
            const node = weak as unknown;
            if (node instanceof CFLoginNode) {
                // attempt to login from targets tree
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const configJson = await cfGetConfigFileJson(_.get(getTargetRoot(node), ['target', 'label']));
                if (configJson) {
                    endPoint = _.get(configJson, 'Target');
                    space = _.get(configJson, ['SpaceFields', 'Name']);
                    org = _.get(configJson, ['OrganizationFields', 'Name']);
                }
            }
            result = await executeLogin(endPoint);
        }
        if (target && OK === result) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let options: any;
            if (space || org || endPoint) {
                options = { org, space, endPoint };
            }
            result = await cmdCFSetOrgSpace(options);
        }
        return result;
    } catch (e) {
        void vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdLogin failed", { weak: weak }, { exception: toText(e) });
        return '';
    }
}

export async function cmdSelectSpace(): Promise<string | undefined> {
    try {
        let result = '';
        let warningMessage;
        const spaces = await runWithProgressAndLoginRetry(false, messages.getting_spaces, cfGetAvailableSpaces);
        if (_.size(spaces)) {
            const space = await vscode.window.showQuickPick(spaces, { placeHolder: messages.select_space, canPickMany: false, matchOnDetail: true, ignoreFocusOut: true });
            if (space) {
                const org = _.find(await cfGetAvailableOrgs(), ['guid', space.orgGUID]);
                if (org) {
                    await invokeLongFunctionWithProgress(cfSetOrgSpace.bind(undefined, org.label, space.label), messages.set_org_space);
                    void vscode.window.showInformationMessage(messages.success_set_org_space);
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
            void vscode.window.showWarningMessage(warningMessage);
        }
        return result;
    } catch (e) {
        void vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error("cmdSelectSpace failed", { exception: toText(e) });
        return '';
    }
}

async function cmdCreateTarget(): Promise<string | undefined> {
    const targetName = await vscode.window.showInputBox({ prompt: messages.name_for_target, ignoreFocusOut: true });
    if (targetName) {
        const cliResult: CliResult = await Cli.execute(["save-target", "-f", targetName]);
        if (cliResult.exitCode !== 0) {
            getModuleLogger(LOGGER_MODULE).error("cmdCreateTarget : command 'save-target -f <%s>' failed", targetName, { output: cliResult.stdout });
            return Promise.reject(new Error(cliResult.stdout));
        }

        await cmdReloadTargets();
        void vscode.window.showInformationMessage(messages.target_created(targetName));
        getModuleLogger(LOGGER_MODULE).debug("cmdCreateTarget: the <%s> target has been created", targetName);
        return targetName;
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

async function onGetServicePlansFromCF(opt: { planName?: string; serviceGuid: string }, isCancelable = false, title?: string): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(
        isCancelable, title || messages.loading_service_plan_list,
        cfGetServicePlansList as () => Promise<unknown>,
        _.merge({ filters: [{ key: eFilters.service_offering_guids, value: opt.serviceGuid }] },
            opt.planName ? { filters: [{ key: eFilters.names, value: resolveFilterValue(opt.planName) }] } : {})
    );
}

export async function onCreateService(planInfo: PlanInfo, instanceName: string, params: unknown, tags: string[],
    progress: vscode.Progress<{ message?: string; increment?: number }>, cancelToken: vscode.CancellationToken): Promise<string> {
    const response = await cfCreateService(planInfo.guid, instanceName, params || {}, tags || [], { "progress": progress, "cancelToken": cancelToken });
    void vscode.window.showInformationMessage(messages.service_created(response.name));
    getModuleLogger(LOGGER_MODULE).debug("onCreateService: the service has been created", { response: response });
    return response.name;
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
                    void vscode.window.showInformationMessage(isCFResource(response) ? messages.service_created(response.name) : _.toString(response));
                    getModuleLogger(LOGGER_MODULE).debug("createUpsInstance: the service has been created", { response: response });
                    result = response?.name;
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

    const servicesInfo: ServiceInfo[] = await runWithProgressAndLoginRetry(true, messages.loading_services, cfGetServices, { filters: [{ key: eFilters.names, value: resolveFilterValue(serviceName) }] });
    if (_.size(servicesInfo)) {
        const serviceInfo = (_.size(servicesInfo) === 1 && serviceName)
            ? servicesInfo[0]
            : await vscode.window.showQuickPick<ServiceInfo>(servicesInfo, { placeHolder: messages.select_services, ignoreFocusOut: true });

        if (!_.isEmpty(serviceInfo)) {
            const plansInfo: PlanInfo[] = await onGetServicePlansFromCF({ serviceGuid: serviceInfo.guid, planName: servicePlan });
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
                const message = servicePlan ? messages.no_service_plan_info_found(servicePlan, serviceInfo.label) : messages.no_service_plans_found(serviceInfo.label);
                throw new Error(message);
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
            void vscode.window.showErrorMessage(toText(error));
            getModuleLogger(LOGGER_MODULE).error("createService: create instance <%s> failed", instanceName, { ups: isUps }, { info: info }, { exception: toText(error) });
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

export async function fetchServicePlanList(query?: IServiceQuery): Promise<PlanInfo[]> {
    return runWithProgressAndLoginRetry(false, messages.loading_service_plan_list, cfGetServicePlansList, query);
}

export function getAvailableServices(opts?: DisplayServices, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return notifyWhenServicesInfoResultIncomplete(
        runWithProgressAndLoginRetry(true, progressTitle || messages.loading_services, getAllServiceInstances, opts)
    );
}

export async function getServiceInstances(query?: IServiceQuery, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return notifyWhenServicesInfoResultIncomplete(
        runWithProgressAndLoginRetry(true, progressTitle || messages.loading_services, cfGetServiceInstances, query)
    );
}

export async function getUserProvidedServiceInstances(options?: UpsServiceQueryOprions, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return notifyWhenServicesInfoResultIncomplete(
        runWithProgressAndLoginRetry(true, progressTitle || messages.loading_ups_services, getUpsServiceInstances, options)
    );
}

async function askUserForServiceInstanceName(availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo): Promise<string | undefined> {
    const serviceName = _.get(serviceType, 'name');
    const availableServicesToShow = availableServices;

    if (!_.size(availableServicesToShow)) {
        void vscode.window.showErrorMessage(
            serviceName && !isRegexExpression(serviceName) ? messages.no_services_instances_found_for_type(serviceName) : messages.no_services_instances_found
        );
        getModuleLogger(LOGGER_MODULE).debug("askUserForServiceInstanceName: no service instances found for <%s> type", serviceName);
        return;
    }

    const pickItems = _.map(availableServicesToShow, s => {
        return { label: s.label, description: s.serviceName + (s.plan ? ` (${s.plan})` : '') };
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
        if (!lastElem.serviceName.startsWith("more:")) {
            // unexpected
            availableServices.push(lastElem);
            return false;
        }
        // it is more:<next page>
        const nextPage = Number.parseInt(lastElem.serviceName.split(":")[1], 10);

        const nextAvailableServices = await getAvailableServices({ query: { page: nextPage }, ups: { tag: serviceType?.ups?.tag } });
        if (_.size(nextAvailableServices)) {
            _.forEach(nextAvailableServices, nas => availableServices.push(nas));
            if (_.size(nextAvailableServices) === CF_PAGE_SIZE) {
                const siInfo: ServiceInstanceInfo = { label: MORE_RESULTS, serviceName: `more:${(nextPage + 1)}`, alwaysShow: true };
                availableServices.push(siInfo);
            }
            return true;
        }
    }
    return false;
}

export async function getInstanceName(availableServices: ServiceInstanceInfo[], serviceType?: ServiceTypeInfo): Promise<string> {
    let instanceName = await askUserForServiceInstanceName(availableServices, serviceType);
    while (await checkForMoreServices(instanceName, availableServices, serviceType)) {
        instanceName = await askUserForServiceInstanceName(availableServices, serviceType);
    }
    return instanceName;
}

export async function updateInstanceNameAndTags(availableServices: ServiceInstanceInfo[], serviceTypeInfo: ServiceTypeInfo, instanceNames: string[], tags: string[]): Promise<string> {
    let instanceName = await getInstanceName(availableServices, serviceTypeInfo);
    if (instanceName === CMD_CREATE_SERVICE) {
        instanceName = await (serviceTypeInfo.name === eServiceTypes.user_provided ?
            cmdCreateUps(serviceTypeInfo) :
            cmdCreateService(serviceTypeInfo));
    }
    if (_.size(instanceName) > 0) {
        instanceNames.push(instanceName);
        tags.push(serviceTypeInfo.tag);
    }
    return instanceName;
}

export function updateServicesOnCFPageSize(availableServices: ServiceInstanceInfo[]): void {
    if (_.size(availableServices) === CF_PAGE_SIZE) {
        availableServices.push({ label: MORE_RESULTS, serviceName: "more:2", alwaysShow: true });
    }
}

export async function cmdSelectAndSaveTarget(): Promise<string | undefined> {
    try {
        let label;
        if (await verifyLoginRetryPartial()) {
            const target = await cfGetTarget(true);
            const affairs = [
                { id: 'save', label: messages.set_targets_save(target.org || 'undefined', target.space || 'undefined'), detail: messages.set_targets_save_details },
                { id: 'pick-save', label: messages.set_targets_pick_save, detail: messages.set_targets_pick_save_details },
            ];
            let result;
            const action = await vscode.window.showQuickPick(affairs, { placeHolder: messages.set_targets_choose_the_operation, canPickMany: false, matchOnDetail: true });
            if (action?.id === 'pick-save') {
                const cfEndpoint = await vscode.window.showInputBox({
                    prompt: messages.enter_cf_endpoint,
                    value: target["api endpoint"],
                    ignoreFocusOut: true
                });
                if (cfEndpoint) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    target["api endpoint"] != cfEndpoint && await cfApi({ url: cfEndpoint });
                    result = await cmdCFSetOrgSpace({ endPoint: cfEndpoint });
                }
            } else if (action?.id === 'save') {
                if (!target.org || !target.space) {
                    if (OK === await vscode.window.showWarningMessage(messages.target_setup_not_completed(target.org, target.space), OK, Cancel)) {
                        result = OK;
                    }
                } else {
                    result = OK;
                }
            }
            if (OK === result) {
                label = await cmdCreateTarget();
            }
        }
        return label;
    } catch (e) {
        void vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error(`cmdSelectAndSaveTarget exception thrown`, { error: toText(e) });
    }
}
