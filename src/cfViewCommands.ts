/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode"; // NOSONAR
import * as path from "path";
import { CFView, CFService } from "./cfView";
import { messages } from "./messages";
import * as https from 'https';
import * as url from "url";
import { getOutputChannel } from "./utils";
import {
    CFTarget, DEFAULT_TARGET, ServiceInstanceInfo, IServiceQuery, eFilters, eOperation, Cli, cfGetConfigFileField, cfBindLocalServices, ServiceTypeInfo, cfBindLocalUps, cfGetInstanceMetadata
} from "@sap/cf-tools";
import * as _ from "lodash";
import {
    getAvailableServices, updateServicesOnCFPageSize, isServiceTypeInfoInArray, updateInstanceNameAndTags, getInstanceName, fetchServicePlanList
} from "./commands";

const YES = "Yes";
const NO = "No";
const CANCEL = "Cancel";
export const CMD_CREATE_SERVICE = "+ Create a new service instance";

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

async function doBind(instances: ServiceInstanceInfo[], filePath: string, tags?: string[], serviceKeyNames?: string[]) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function runWithProgress(fnc: (filePath: string, instanceNames: string[], tags?: string[], serviceKeyNames?: string[]) => Promise<void>, args: any[]) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: messages.binding_service_to_file,
            cancellable: false
        }, () => fnc.apply(null, args).then(
            () => { // success
                vscode.window.showInformationMessage(`Successful Bind-Service(s) ${args[1].join(",")} into ${args[0]}`);
                return Promise.resolve();
            },
            async (e: unknown) => { // rejected
                vscode.window.showErrorMessage(_.get(e, 'message'));
                return Promise.reject(e);
            }
        ));
    }

    const ups = _.filter(instances, ['serviceName', 'user_provided_service_instance']);
    const services = _.difference(instances, ups);
    if (_.size(services)) {
        const instanceNames = _.map(services, 'label');
        await runWithProgress(cfBindLocalServices, [filePath, instanceNames, tags, serviceKeyNames]);
    }
    if (_.size(ups)) {
        const instanceNames = _.map(ups, 'label');
        await runWithProgress(cfBindLocalUps, [filePath, instanceNames, tags]);
    }
}

async function getServiceInstanceInfo(instanceName: string): Promise<ServiceInstanceInfo> {
    const data = await cfGetInstanceMetadata(instanceName);
    return { label: _.get(data, 'serviceName'), serviceName: _.get(data, 'service'), plan_guid: _.get(data, 'plan_guid') };
}

export async function cfDeployServiceAPI(urlPath: string): Promise<string> {
    const cfApi = await cfGetConfigFileField("Target");
    if (_.size(cfApi) > 0) {
        // https://api.cf.<cf domain>
        const deployServiceUrl = cfApi.replace("api.cf", "deploy-service.cfapps");
        const cliResult = await Cli.execute(["oauth-token"]);
        if (cliResult.error) {
            throw new Error(cliResult.error);
        }

        const accessToken = cliResult.stdout.replace("\n", "").replace("\n", "");

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

    throw new Error("No CF API endpoint");
}

export async function cmdDeployServiceAPI(servicePath: string, message: string): Promise<string> {
    return vscode.window.withProgress<string>({
        location: vscode.ProgressLocation.Notification,
        title: message ? message : "Loading data from Deploy Service...",
        cancellable: false
    }, () => cfDeployServiceAPI(servicePath));
}

export async function cmdSetCurrentTarget(newTarget: CFTarget): Promise<unknown | undefined> {
    if (_.get(newTarget, "isCurrent", false)) {
        let answer = YES;
        try {
            const currTarget = CFView.get().getCurrentTarget();
            if (_.get(currTarget, "isDirty", false)) {
                const message = `Target ${currTarget.label} is modified. Would you like to save changes?`;
                answer = await vscode.window.showWarningMessage(message, YES, NO, CANCEL).then(selection => {
                    if (selection === YES) {
                        return Cli.execute(["save-target"]).then(() => selection);
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

            return Cli.execute(["set-target", "-f", newTarget.label]).then(async (response: { exitCode: number; stdout: string }) => {
                if (response.exitCode !== 0) {
                    vscode.window.showErrorMessage(response.stdout);
                } else {
                    await cmdReloadTargets();
                }
            });
        } catch (e) {
            vscode.window.showErrorMessage(_.get(e, 'message'));
        }
    }
}

export async function cmdDeleteTarget(item: unknown): Promise<void> {
    const targetLabel = _.get(item, "target.label");
    if (targetLabel === DEFAULT_TARGET) {
        return;
    }

    const cliResult = await Cli.execute(["delete-target", targetLabel]);
    if (cliResult.exitCode === 0) {
        await cmdReloadTargets();
        vscode.window.showInformationMessage(messages.target_deleted(targetLabel));
    } else {
        vscode.window.showErrorMessage(cliResult.stdout);
    }
}

export async function cmdBindLocal(service: CFService | ServiceTypeInfo[], uri: vscode.Uri | undefined): Promise<string> {
    // Handle .env path
    let filePath: string = _.get(uri, "fsPath");
    if (_.isEmpty(filePath)) {
        const uriArray = await askUserForPath();
        if (_.size(uriArray) <= 0) {
            // aborted
            return "";
        }

        filePath = path.join(uriArray[0].fsPath, ".env");
    }

    try {
        let instanceName: string | undefined;
        if (_.get(service, "contextValue") === "cf-service" && _.get(service, "label")) {
            instanceName = (service as CFService).label;
        } else { // service is ServiceTypeInfo
            let plans: string[] = [];
            let servicePlans;
            if (_.get(service, '[0].plan')) {
                servicePlans = await fetchServicePlanList();
                plans = _.map(_.filter(servicePlans, ['label', _.get(service, '[0].plan')]), 'guid');
            }
            const query: IServiceQuery = _.merge({}, { 'filters': [{ key: eFilters.service_plan_guid, value: _.join(plans), op: eOperation.IN }] });
            const ups = _.merge({}, _.get(service, ['0', 'ups', 'tag']) ? { tag: _.get(service, ['0', 'ups', 'tag']) } : {});
            let availableServices = await getAvailableServices({ query, ups });
            if (_.isEmpty(availableServices)) {
                getOutputChannel().appendLine(messages.no_services_found(`${_.get(service, '[0].plan')} {${_.size(plans)}}`));
                return "";
            }

            updateServicesOnCFPageSize(availableServices);

            if (isServiceTypeInfoInArray(service)) {
                const instanceNames: string[] = [];
                const tags: string[] = [];
                const serviceTypeInfos = service as ServiceTypeInfo[];
                for (const serviceTypeInfo of serviceTypeInfos) {
                    _.set(serviceTypeInfo, 'plans', servicePlans);
                    if (serviceTypeInfo?.allowCreate) {  // add 'create service' menu item
                        availableServices = _.concat([{ "label": CMD_CREATE_SERVICE, serviceName: serviceTypeInfo?.name }], availableServices);
                    }
                    instanceName = await updateInstanceNameAndTags(availableServices, serviceTypeInfo, instanceNames, tags);
                }

                if (_.size(instanceNames) > 0) {
                    const serviceKeyNames: string[] = _.compact(_.flatMap(serviceTypeInfos, (serviceTypeInfo) => serviceTypeInfo.serviceKeyName));
                    const instances = [];
                    for (const name of instanceNames) {
                        let serviceInstance = _.find(availableServices, ['label', name]);
                        // seems like it just created service and it is needed to fetch it's info
                        if (!serviceInstance) {
                            serviceInstance = await getServiceInstanceInfo(name);
                        }
                        instances.push(serviceInstance);
                    }
                    await doBind(_.compact(instances), filePath, _.compact(tags), serviceKeyNames);
                    return instanceName;
                }

                return "";
            }

            instanceName = await getInstanceName(availableServices);
        }

        if (instanceName) {
            await doBind([{ label: instanceName, serviceName: 'unknown' }], filePath);
            return instanceName;
        }
    } catch (e) {
        if (e) {
            vscode.window.showErrorMessage(_.get(e, 'message'));
        }
    }

    return "";
}

export async function bindLocalService(serviceInfos: ServiceTypeInfo[], uri: vscode.Uri): Promise<string[]> {
    const filePath = _.get(uri, "fsPath");
    if (_.isEmpty(filePath)) {
        return [];
    }
    _.set(serviceInfos, ['0', 'plans'], await fetchServicePlanList());
    const plans: string[] = (_.get(serviceInfos, ['0', 'plan']))
        ? _.map(_.filter(serviceInfos[0].plans, ['label', serviceInfos[0].plan]), 'guid') : [];

    const query: IServiceQuery = _.merge({}, { 'filters': [{ key: eFilters.service_plan_guid, value: _.join(plans), op: eOperation.IN }] });
    const availableServices: ServiceInstanceInfo[] = await getAvailableServices({ query });
    if (_.isEmpty(availableServices)) {
        if (!_.isEmpty(_.get(serviceInfos, ['0', 'plan']))) {
            getOutputChannel().appendLine(messages.no_services_found(`${serviceInfos[0].plan} {${_.size(plans)}}`));
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
            await doBind(_.compact(instances), filePath, _.compact(tags));
            return instanceNames;
        }
    } else {
        const instanceName = await getInstanceName(availableServices);
        if (instanceName) {
            await doBind([_.find(availableServices, ['label', instanceName])], filePath);
            return [instanceName];
        }
    }
}
