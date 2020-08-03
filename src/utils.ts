/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode"; // NOSONAR
import { getExtensionName } from "./extension";
import * as fs from 'fs';
import { messages } from "./messages";
import * as types from '@sap/wing-run-config-types';
import * as _ from 'lodash';
import * as PropertiesReader from "properties-reader";
import { parse } from "comment-json";
import { URL } from "url";
import { IServiceQuery, ServiceInstanceInfo, cfGetServiceInstances, cfGetUpsInstances, eFilters } from "@sap/cf-tools";

function spotRedirectUri() {
	// expected host pattern is 'DOMAIN.PLATFORM.REG...APPNAME.cloud.sap'
	const host = new URL(_.get(process, 'env.WS_BASE_URL') || 'https://wingtestsubacc-workspaces-ws-gwzd6.staging-01.dev10.int.webide.cloud.sap').hostname;
	// "https://*.cry10.int.applicationstudio.cloud.sap/**"
	return `https://*.${_.join(_.drop(_.split(host, '.')), '.')}/**`;
}

export const ENV_VCAP_RESOURCES = "VCAP_SERVICES";
let outputChannel: vscode.OutputChannel;

export function getOutputChannel(): vscode.OutputChannel {
	if (!outputChannel) {
		outputChannel = vscode.window.createOutputChannel(getExtensionName());
	}
	return outputChannel;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEnvResources(envFilePath: string): Promise<any> {
	try {
		if (fs.existsSync(envFilePath)) {
			const envProperties = PropertiesReader(envFilePath);
			const vcapProperty: string = envProperties.getRaw(ENV_VCAP_RESOURCES);
			if (vcapProperty) {
				return Promise.resolve(JSON.parse(vcapProperty));
			} else {
				getOutputChannel().appendLine(messages.error_env_missing_key(ENV_VCAP_RESOURCES));
				return Promise.resolve(null);
			}
		} else {
			getOutputChannel().appendLine(messages.error_env_missing_file);
			return Promise.resolve(null);
		}
	} catch (error) {
		getOutputChannel().appendLine(messages.error_env_get + error);
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findServiceByResourceNameTag(vcapServices: any, yamlResourceName: string, resourceTag: string): any {
	for (const key in vcapServices) {
		if (_.has(vcapServices, key)) {
			for (const service of vcapServices[key]) {
				if (service.tags && service.tags.find((t: string) => t.startsWith(resourceTag) && t.substr(resourceTag.length) === yamlResourceName)) {
					return [key, service];
				}
			}
		}
	}
	return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function removeResourceFromEnv(bindContext: types.IBindContext): Promise<{ resourceName: string; envPath: string; resourceData: any }> {
	let instanceData;
	const envFilePath: string = bindContext.envPath.fsPath;
	const vcapServicesObj = await getEnvResources(envFilePath);
	const bindResourceType = bindContext.depContext.type;
	let instanceName: string;
	// If this is a tagged resource - remove by tag
	const resourceTag: string = _.get(bindContext, "depContext.data.resourceTag");
	const resourceName: string = _.get(bindContext, "depContext.data.resourceName");
	if (!_.isEmpty(resourceTag)) {
		const keyAndService = findServiceByResourceNameTag(vcapServicesObj, resourceName, resourceTag);
		if (!_.isEmpty(keyAndService)) {
			const resourceTypeKey = keyAndService[0];
			instanceData = keyAndService[1];
			instanceName = instanceData.instance_name;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			_.remove(vcapServicesObj[resourceTypeKey], (hanaService: any) => {
				return hanaService.instance_name === instanceName;
			});
			// If after removal no service instances left - remove this resource type completely to prevent something like: VCAP_SERVICES={"hana":[]}
			if (_.isEmpty(vcapServicesObj[resourceTypeKey])) {
				delete vcapServicesObj[resourceTypeKey];
			}
		}
		else {
			getOutputChannel().appendLine(messages.tagged_resource_not_found(resourceName));
		}
	}
	else { // Remove by resource dependency type only
		const serviceToDelete = _.get(vcapServicesObj, bindResourceType);
		if (!_.isEmpty(serviceToDelete)) {
			instanceData = serviceToDelete[0];
			instanceName = instanceData.instance_name;
			delete vcapServicesObj[bindContext.depContext.type];
		}
	}

	// Update VCAP_SERVICES in the .env file
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const envProperties: any = PropertiesReader(envFilePath);
		envProperties.set(ENV_VCAP_RESOURCES, JSON.stringify(vcapServicesObj));
		// save does not exist in @types but in Properties.Reader
		await envProperties.save(envFilePath);
		return { resourceName: instanceName, envPath: envFilePath, resourceData: instanceData };
	}
	catch (error) {
		getOutputChannel().appendLine(messages.error_env_save + error);
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateParams4Service(serviceLabel: string, plan: string): any {
	if ('xsuaa' === serviceLabel && 'application' === plan) {
		return {
			"xsappname": `xsuaa_${_.now()}`,
			"tenant-mode": "dedicated",
			"description": "Security profile of called application",
			"scopes": [{
				"name": "uaa.user",
				"description": "UAA"
			}],
			"role-templates": [{
				"name": "Token_Exchange",
				"description": "UAA",
				"scope-references": [
					"uaa.user"
				]
			}],
			"oauth2-configuration": {
				"redirect-uris": [`${spotRedirectUri()}`]
			}
		};
	}
	return {};
}

function validateXsuaaTenantMode(value: string) {
	if (!_.isUndefined(value) && !["shared", "dedicated", "external"].includes(_.trim(value))) {
		throw new Error(messages.error_service_params_value_not_allowed('tenant-mode'));
	}
}

function validateXsuaaOauth2Configuration(value: unknown) {
	for (const uri of _.get(value, 'redirect-uris', [])) {
		if (!_.startsWith(uri, 'http') && !_.startsWith(uri, 'localhost')) {
			throw new Error(messages.error_service_params_value_not_allowed('redirect-uris'));
		}
	}
}

function validateXsuaaName(value: string) {
	value = _.trim(value);
	if (!value) {
		throw new Error(messages.error_service_params_mandatory("xsappname"));
	}
	if (_.size(value) >= 100) {
		throw new Error(messages.error_service_params_max_length("xsappname", 100));
	}
	if (/[^a-zA-Z0-9_\-"]/gm.test(value)) {
		throw new Error(messages.error_service_params_value_not_allowed('xsappname'));
	}
}

function validateParamsXsuaa(value: string): string | undefined | null {
	// validation based on rules defined there: 
	// https://github.wdf.sap.corp/CPSecurity/Knowledge-Base/blob/master/03_ApplicationSecurity/Syntax%20and%20Semantics%20of%20xs-security.json.md
	try {
		const data = parse(_.trim(value));
		validateXsuaaName(_.get(data, "xsappname"));
		validateXsuaaTenantMode(_.get(data, "tenant-mode"));
		validateXsuaaOauth2Configuration(_.get(data, "oauth2-configuration"));
	} catch (e) {
		return _.get(e, 'message', e);
	}
}

function validateParamsJson(value: string): string | undefined | null {
	try {
		parse(_.trim(value));
	} catch (e) {
		return _.get(e, 'message', e);
	}
}

export function validateParams(serviceLabel: string, plan?: string): (value: string) => string | undefined | null {
	return ('xsuaa' === serviceLabel && 'application' === plan) ? validateParamsXsuaa : validateParamsJson;
}

export interface DisplayServices {
	query?: IServiceQuery;
	ups?: {
		isShow?: boolean;
		tag?: string;
	};
}

export async function getAllServiceInstances(opts?: DisplayServices): Promise<ServiceInstanceInfo[]> {
	let ups2Show: ServiceInstanceInfo[] = [];
	if (opts?.ups?.isShow || opts?.ups?.tag) {
		const copyQuery = _.cloneDeep(opts.query);
		_.remove(copyQuery?.filters, (item) => {
			return !_.includes([eFilters.name, eFilters.space_guid, eFilters.organization_guid], item.key);
		});
		const upsServices = await cfGetUpsInstances(copyQuery);
		let pattern: string;
		if (_.size(upsServices) && opts.ups.tag) {
			pattern = /^\/\S+\/$/g.test(opts.ups.tag) ? _.trim(opts.ups.tag, '/') : `^${opts.ups.tag}$`;
		}
		ups2Show = pattern ? upsServices.filter(service => { return _.find(service.tags, (tag) => new RegExp(pattern).test(tag)); }) : upsServices;
	}
	return _.concat(await cfGetServiceInstances(opts?.query), ups2Show);
}