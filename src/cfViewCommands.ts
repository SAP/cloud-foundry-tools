import * as vscode from "vscode";
import * as path from "path";
import { CFView, CFService, CFTargetTI } from "./cfView";
import { messages } from "./messages";
import * as https from 'https';
import * as url from "url";
import { updateGitIgnoreList, isWindows, toText, UpsServiceQueryOprions, ServiceQueryOptions, resolveFilterValue } from "./utils";
import {
    DEFAULT_TARGET, ServiceInstanceInfo, IServiceQuery, eFilters, Cli, cfGetConfigFileField,
    cfBindLocalServices, ServiceTypeInfo, cfBindLocalUps, cfGetInstanceMetadata, cfGetAuthToken, padQuery, eServiceTypes, CliResult
} from "@sap/cf-tools";
import * as _ from "lodash";
import {
    getAvailableServices, updateServicesOnCFPageSize, isServiceTypeInfoInArray, updateInstanceNameAndTags, getInstanceName, fetchServicePlanList,
    CMD_CREATE_SERVICE, verifyLoginRetry, getUserProvidedServiceInstances, getServiceInstances
} from "./commands";
import { stringify } from "comment-json";
import { checkAndCreateChiselTask, deleteChiselParamsFromFile } from "./chisel";
import { getModuleLogger } from "./logger/logger-wrapper";

const YES = "Yes";
const NO = "No";
const CANCEL = "Cancel";
const LOGGER_MODULE = "cfViewCommands";

interface BindDetails {
    instances: ServiceInstanceInfo[];
    tags?: string[];
    keyNames?: string[];
    serviceKeyParams?: unknown[];
}

interface BindLocalData {
    instanceName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chiselTask?: any;
}

interface CmdOptions {
    silent?: boolean;
    'skip-reload'?: boolean;
}

export function cmdReloadTargets(): Promise<void> {
    return Promise.resolve(CFView.get().refresh());
}

async function execHttp(options: https.RequestOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(options, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });
        }).on("error", (err) => {
            getModuleLogger(LOGGER_MODULE).error("execHttp: get failed", { error: toText(err) }, { host: options.host });
            reject(err.message);
        });
    });
}

async function askUserForPath(): Promise<vscode.Uri[] | undefined> {
    return vscode.window.showOpenDialog({
        "openLabel": "Select folder for .env file",
        "canSelectFiles": false,
        "canSelectFolders": true,
        "canSelectMany": false,
        "defaultUri": vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : undefined
    });
}

async function getToBindInstances(serviceInfos: ServiceTypeInfo[], availableServices: ServiceInstanceInfo[], instanceNames: string[], tags: string[]) {
    for (const serviceTypeInfo of serviceInfos) {
        await updateInstanceNameAndTags(availableServices, serviceTypeInfo, instanceNames, tags);
    }
}

type TEnvPath = {
    path: vscode.Uri;
    ignore?: boolean;
};

async function doBind(instances: ServiceInstanceInfo[], envPath: TEnvPath, tags?: string[], serviceKeyNames?: string[], serviceKeyParams?: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function runWithProgress(fnc: (filePath: string, instanceNames: string[], tags?: string[], serviceKeyNames?: string[]) => Promise<void>, args: any[]) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification, title: messages.binding_service_to_file, cancellable: false
        }, () => fnc.apply(null, args));
        vscode.window.showInformationMessage(messages.service_bound_successful(args[1].join(",")));
        getModuleLogger(LOGGER_MODULE).info("The service %s has been bound.", `${args[1].join(",")}`);
    }
    const ups = _.filter(instances, ['serviceName', eServiceTypes.user_provided]);
    const services = _.difference(instances, ups);
    if (_.size(services)) {
        await runWithProgress(cfBindLocalServices, [envPath.path.fsPath, _.map(services, 'label'), tags, serviceKeyNames, serviceKeyParams]);
    }
    if (_.size(ups)) {
        await runWithProgress(cfBindLocalUps, [envPath.path.fsPath, _.map(ups, 'label'), tags]);
    }
    if (!envPath.ignore) {
        updateGitIgnoreList(envPath.path.fsPath);
    }
}

async function getServiceInstanceInfo(instanceName: string): Promise<ServiceInstanceInfo> {
    const data = await cfGetInstanceMetadata(instanceName);
    return { label: _.get(data, 'serviceName'), serviceName: _.get(data, 'service'), plan_guid: _.get(data, 'plan_guid'), plan: _.get(data, 'plan') };
}

export async function cfDeployServiceAPI(urlPath: string): Promise<string> {
    const cfApi = await cfGetConfigFileField("Target");
    if (_.size(cfApi) > 0) {
        // https://api.cf.<cf domain>
        const deployServiceUrl = cfApi.replace("api.cf", "deploy-service.cfapps");

        const accessToken = (await cfGetAuthToken()).replace("\n", "").replace("\n", ""); // lgtm [js/incomplete-sanitization]

        const urlObj = url.parse(deployServiceUrl);

        const options = {
            protocol: urlObj.protocol,
            host: urlObj.host,
            port: urlObj.port ? urlObj.port : urlObj.protocol === "https:" ? 443 : 80,
            method: "get",
            path: urlPath ? urlPath : urlObj.path,
            headers: { Authorization: accessToken }
        };

        return execHttp(options);
    }

    getModuleLogger(LOGGER_MODULE).error("No CF API endpoint", { path: urlPath });
    throw new Error(messages.no_cf_api_endpoint);
}

export async function cmdDeployServiceAPI(servicePath: string, message: string): Promise<string> {
    if (await verifyLoginRetry()) {
        return vscode.window.withProgress<string>({
            location: vscode.ProgressLocation.Notification,
            title: message ? message : messages.load_data_from_deploy,
            cancellable: false
        }, () => cfDeployServiceAPI(servicePath));
    }
}

export async function execSetTarget(label: string, options?: CmdOptions) {
    const response: CliResult = await Cli.execute(["set-target", "-f", label]);
    if (response.exitCode !== 0) {
        if (!options.silent) {
            vscode.window.showErrorMessage(response.stdout);
        }
        getModuleLogger(LOGGER_MODULE).error(`execSetTarget:: run 'set-target -f' with lable ${label} failed`, { output: response.stdout });
    } else {
        if (!_.get(options, "skip-reload")) {
            await cmdReloadTargets();
        }
    }
}

export async function execSaveTarget(label?: string, options?: CmdOptions) {
    const response: CliResult = await Cli.execute(_.concat(["save-target"], label ? ['-f', label] : ''));
    if (response.exitCode !== 0) {
        if (!options.silent) {
            vscode.window.showErrorMessage(response.stdout);
        }
        getModuleLogger(LOGGER_MODULE).error(`execSaveTarget:: run 'save-target -f' with lable ${label} failed`, { output: response.stdout });
    }
}

export async function cmdSetCurrentTarget(newTarget: CFTargetTI): Promise<unknown | undefined> {
    if (!newTarget.target.isCurrent) {
        let answer = YES;
        try {
            const currTarget = CFView.get().getCurrentTarget();
            if (_.get(currTarget, "isDirty", false)) {
                answer = await vscode.window.showWarningMessage(messages.target_dirty_save(currTarget.label), YES, NO, CANCEL).then(selection => {
                    if (selection === YES) {
                        return execSaveTarget().then(() => selection);
                    } else if (selection) {
                        return NO;
                    }
                    // if ESC was pressend and selection is undefined
                    return CANCEL;
                });
            }

            if (answer === CANCEL) {
                return;
            }

            return execSetTarget(newTarget.target.label);
        } catch (e) {
            vscode.window.showErrorMessage(toText(e));
            getModuleLogger(LOGGER_MODULE).error(`cmdSetCurrentTargetCommand with new target ${stringify(newTarget)} exception thrown`, { error: toText(e) });
        }
    }
}

export async function cmdDeleteTarget(item: unknown, options?: CmdOptions): Promise<void> {
    const targetLabel = _.get(item, "target.label");
    if (targetLabel === DEFAULT_TARGET) {
        return;
    }
    const cliResult = await Cli.execute(["delete-target", targetLabel]);
    if (cliResult.exitCode === 0) {
        if (!_.get(options, "skip-reload")) {
            await cmdReloadTargets();
        }
        if (!options.silent) {
            vscode.window.showInformationMessage(messages.target_deleted(targetLabel));
        }
        getModuleLogger(LOGGER_MODULE).debug(`cmdDeleteTarget:: command "delete-target" of ${targetLabel} succeeded.`);
    } else {
        vscode.window.showErrorMessage(cliResult.stdout);
        getModuleLogger(LOGGER_MODULE).error(`cmdSetCurrentTargetCommand:: run 'delete-target of ${targetLabel} failed`, { output: cliResult.stdout });
    }
}

export async function cmdGetSpaceServices(query?: IServiceQuery, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    _.each(query?.filters, filter => { filter.value = encodeURIComponent(filter.value); });
    return getAvailableServices({ query, ups: { isShow: true } }, progressTitle);
}

async function composeQueryToObtainInstances(serviceInfos: ServiceTypeInfo[]): Promise<IServiceQuery> {
    let query;
    if (_.get(serviceInfos, ['0', 'plan'])) {
        query = padQuery(query, [{ key: eFilters.service_plan_names, value: resolveFilterValue(serviceInfos[0].plan) }]);
    }
    if (/*!_.size(plans) &&*/ _.get(serviceInfos, '[0].name')) {
        if (eServiceTypes.user_provided === serviceInfos[0].name) {
            query = padQuery(query, [{ key: eFilters.service_plan_names, value: 'nothing-to-show' }]); // tricky - to show the only user-provided instances
        } else {
            const guids = _.map(await fetchServicePlanList({ filters: [{ key: eFilters.service_offering_names, value: resolveFilterValue(serviceInfos[0].name) }] }), 'guid');
            query = padQuery(query, [{ key: eFilters.service_plan_guids, value: _.join(guids) }]);
        }
    }
    return query;
}

async function collectBindDetails(service: CFService | ServiceTypeInfo[], requstedInstance?: string): Promise<BindDetails> {
    let details: BindDetails;

    if (_.get(service, "contextValue") === "cf-service" && _.get(service, "label")) {
        details = { instances: [{ label: (service as CFService).label, serviceName: (service as CFService).type || "unknown" }] };
    } else { // service is ServiceTypeInfo
        const query = await composeQueryToObtainInstances(service as ServiceTypeInfo[]);
        let availableServices = await getAvailableServices({ query, ups: _.get(service, ['0', 'ups']) });
        if (_.isEmpty(availableServices)) {
            getModuleLogger(LOGGER_MODULE).debug(`No services found for plan ${_.get(service, '[0].plan')}`);
            if (!_.find(service as ServiceTypeInfo[], 'allowCreate')) {
                vscode.window.showInformationMessage(messages.no_services_instances_found);
                return details;
            }
        }

        updateServicesOnCFPageSize(availableServices);

        if (isServiceTypeInfoInArray(service)) {
            const instanceNames: string[] = [];
            const tags: string[] = [];
            const serviceTypeInfos = service as ServiceTypeInfo[];
            if (!requstedInstance) {
                for (const serviceTypeInfo of serviceTypeInfos) {
                    if (serviceTypeInfo.allowCreate) {  // add 'create service' menu item
                        availableServices = _.concat([{ "label": CMD_CREATE_SERVICE, serviceName: "" }], availableServices);
                    }
                    await updateInstanceNameAndTags(availableServices, serviceTypeInfo, instanceNames, tags);
                }
            } else {
                const foundInstance = _.find(availableServices, ['label', requstedInstance]);
                if (!foundInstance) {
                    throw new Error(messages.no_services_instance_byname_found(requstedInstance));
                }
                instanceNames.push(foundInstance.label);
                tags.push(serviceTypeInfos[0].tag);
            }

            if (_.size(instanceNames) > 0) {
                const serviceKeyNames: string[] = _.compact(_.flatMap(serviceTypeInfos, (serviceTypeInfo) => serviceTypeInfo.serviceKeyName));
                const serviceKeyParams: unknown[] = _.compact(_.map(serviceTypeInfos, "serviceKeyParam"));
                const instances = [];
                for (const name of instanceNames) {
                    let serviceInstance = _.find(availableServices, ['label', name]);
                    // seems like it just created service and it is needed to fetch it's info
                    if (!serviceInstance) {
                        serviceInstance = await getServiceInstanceInfo(name);
                    }
                    instances.push(serviceInstance);
                }
                details = { instances: _.compact(instances), tags: _.compact(tags), keyNames: serviceKeyNames, serviceKeyParams };
            }
        } else {
            const instanceName = await getInstanceName(availableServices);
            if (instanceName) {
                details = { instances: [{ label: instanceName, serviceName: "unknown" }] };
            }
        }
    }
    return details;
}

class EnvPathHelper {
    static getPath(env: vscode.Uri | TEnvPath): vscode.Uri {
        return _.get(env, "fsPath") ? env as vscode.Uri : (_.get(env, "path") ? env.path as vscode.Uri : vscode.Uri.file(""));
    }
    static getIgnore(env: vscode.Uri | TEnvPath): boolean {
        return _.get(env, "ignore") || false;
    }
    static isPathEmpty(value: vscode.Uri): boolean {
        return value.scheme === 'file' && value.fsPath === (isWindows ? '\\' : '/');
    }
}

export async function cmdBindLocal(service: CFService | ServiceTypeInfo[], envPath: vscode.Uri | TEnvPath, instanceName?: string): Promise<BindLocalData | undefined> {
    // Handle .env path
    let filePath = EnvPathHelper.getPath(envPath);
    if (EnvPathHelper.isPathEmpty(filePath)) {
        const uriArray = await askUserForPath();
        if (_.size(uriArray) === 0) {
            // aborted
            return;
        }
        filePath = vscode.Uri.file(path.join(uriArray[0].fsPath, ".env"));
    }
    try {
        const bindDetails = await collectBindDetails(service, instanceName);
        if (bindDetails) {
            await doBind(bindDetails.instances, { path: filePath, ignore: EnvPathHelper.getIgnore(envPath) }, bindDetails.tags, bindDetails.keyNames, bindDetails.serviceKeyParams);
            const instanceName = _.get(_.head(bindDetails.instances), 'label');
            if (instanceName) {
                const chiselTask = await checkAndCreateChiselTask(filePath.fsPath, instanceName);
                if (chiselTask) {
                    await deleteChiselParamsFromFile(filePath.fsPath);
                }
                return chiselTask ? { instanceName, chiselTask } : { instanceName };
            }
        }
    } catch (e) {
        if (e) { // login to cf canceled by user
            vscode.window.showErrorMessage(toText(e));
            getModuleLogger(LOGGER_MODULE).error(`cmdBindLocal exception thrown`, { error: toText(e) }, { service: service }, { envPath: filePath }, { instanceName: instanceName });
        }
    }
    return;
}

export async function bindLocalService(serviceInfos: ServiceTypeInfo[], envPath: vscode.Uri | TEnvPath): Promise<string[]> {
    try {
        const filePath = EnvPathHelper.getPath(envPath);
        if (EnvPathHelper.isPathEmpty(filePath)) {
            return [];
        }
        const query = await composeQueryToObtainInstances(serviceInfos);
        const availableServices: ServiceInstanceInfo[] = await getAvailableServices({ query });
        if (_.isEmpty(availableServices)) {
            if (!_.isEmpty(_.get(serviceInfos, ['0', 'plan']))) {
                getModuleLogger(LOGGER_MODULE).debug(`No service found for the plan ${serviceInfos[0].plan}`);
            }
            if (!_.find(serviceInfos, 'allowCreate')) {
                vscode.window.showInformationMessage(messages.no_services_instances_found);
            }
            return [];
        }

        updateServicesOnCFPageSize(availableServices);

        if (isServiceTypeInfoInArray(serviceInfos)) {
            const instanceNames: string[] = [];
            const tags: string[] = [];
            await getToBindInstances(serviceInfos, availableServices, instanceNames, tags);
            const instances = _.reduce(instanceNames, (result, name) => {
                result.push(_.find(availableServices, ['label', name]));
                return result;
            }, []);
            if (_.size(instanceNames) > 0) {
                await doBind(_.compact(instances), { path: filePath, ignore: EnvPathHelper.getIgnore(envPath) }, _.compact(tags));
                return instanceNames;
            }
        } else {
            const instanceName = await getInstanceName(availableServices);
            if (instanceName) {
                await doBind([_.find(availableServices, ['label', instanceName])], { path: filePath, ignore: EnvPathHelper.getIgnore(envPath) });
                return [instanceName];
            }
        }
    } catch (e) {
        vscode.window.showErrorMessage(toText(e));
        getModuleLogger(LOGGER_MODULE).error(`bindLocalService exception thrown`, { error: toText(e) }, { serviceInfos: serviceInfos }, { envPath: EnvPathHelper.getPath(envPath) });
    }
}

export async function cmdGetUpsServiceInstances(options?: UpsServiceQueryOprions, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    return getUserProvidedServiceInstances(options, progressTitle);
}

export async function cmdGetServiceInstances(serviceQueryOptions?: ServiceQueryOptions, progressTitle?: string): Promise<ServiceInstanceInfo[]> {
    let query: IServiceQuery;
    if (serviceQueryOptions) {
        // prepare a query to filter the service list by service plan (e.g.: hdi-shared)
        // filter the list by service type name (e.g.: hana, hanatrial)
        const serviceInfo = { name: serviceQueryOptions.name, plan: serviceQueryOptions.plan, tag: serviceQueryOptions.tag, prompt: "" };
        query = await composeQueryToObtainInstances([serviceInfo]);
    }
    return getServiceInstances(query, progressTitle);
}
