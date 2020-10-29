/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as types from '@sap/wing-run-config-types';
import * as cfViewCommands from './cfViewCommands';
import { getEnvResources, removeResourceFromEnv, toText } from './utils';
import { checkAndCreateChiselTask } from './chisel';
import * as _ from 'lodash';
import * as vscode from 'vscode';
import * as cfLocal from '@sap/cf-tools';
import { messages } from './messages';
import { getModuleLogger } from './logger/logger-wrapper';
import { trackChiselTask } from "./usage/usageTracker";

export class DependencyHandler implements types.IDependencyHandler {
  private readonly id: string;
  private static readonly MODULE_NAME = 'DependencyHandler'; // workarround in minimized mode

  constructor(id: string) {
    this.id = id;
  }

  public async getBindState(bindContext: types.IBindContext): Promise<types.BindState> {
    let bindState = types.BindState.notbound;

    try {
      if (_.get(await getEnvResources(_.get(bindContext, ['envPath', 'fsPath'])), _.get(bindContext, ["depContext", "type"]))) {
        bindState = types.BindState.cloud;
      }
    } catch (e) {
      vscode.window.showErrorMessage(toText(e));
      getModuleLogger(DependencyHandler.MODULE_NAME).error("getBindState: processing failed", { message: toText(e) });
    }
    return bindState;
  }

  public async bind(bindContext: types.IBindContext): Promise<void | types.IBindResult> {
    const resourceTag: string = _.get(bindContext, "depContext.data.resourceTag");
    const serviceType: cfLocal.ServiceTypeInfo[] = [{
      name: bindContext.depContext.type,
      plan: _.get(bindContext.depContext, ['data', 'plan'], ''),
      tag: resourceTag ? resourceTag + _.get(bindContext, "depContext.data.resourceName") : "",
      prompt: ""
    }];
    try {
      const instanceNames: string[] = await cfViewCommands.bindLocalService(serviceType, bindContext.envPath);
      if (_.size(instanceNames)) {
        // Create chisel task if neccessary
        if (_.get(bindContext, "depContext.data.isCreateChiselTask")) {
          trackChiselTask("Chisel Task", ["CF tools"]);

          // Create it in dependent task
          const chiselTaskNameSuffix = instanceNames.join("&");
          const chiselTask = await checkAndCreateChiselTask(bindContext.envPath?.fsPath, chiselTaskNameSuffix);
          if (!_.isEmpty(chiselTask.label)) {
            vscode.window.showInformationMessage(`A task for opening the VPN tunnel to the Cloud Foundry space has been created. Name: '${chiselTask.label}'`);
            getModuleLogger(DependencyHandler.MODULE_NAME).info("bind: <%s> task for opening the VPN tunnel to the Cloud Foundry space has been created", chiselTask.label);

            if (_.isNil(bindContext.configData.dependentTasks)) {
              bindContext.configData.dependentTasks = [];
            }
            bindContext.configData.dependentTasks.push(chiselTask);
          }
        }
        return {
          configData: bindContext.configData,
          resource: {
            name: instanceNames[0],
            type: (await cfLocal.cfGetInstanceMetadata(instanceNames[0])).service || ""
          }
        };
      }
    } catch (e) {
      vscode.window.showErrorMessage(toText(e));
      getModuleLogger(DependencyHandler.MODULE_NAME).error("bind: processing failed", { message: toText(e) });
    }
  }

  public async unbind(bindContext: types.IBindContext): Promise<void | types.IBindResult> {
    const configObject = new types.ConfigObject(
      {},
      types.ConfigurationTarget.launch
    );
    const configurationData: types.IConfigurationData = { config: configObject, dependentTasks: [] };
    try {
      const removedResourceDetails = await removeResourceFromEnv(bindContext);
      vscode.window.showInformationMessage(messages.service_unbound_successful(_.get(removedResourceDetails, "resourceName")));
      getModuleLogger(DependencyHandler.MODULE_NAME).info("unbind: the <%s> service has been unbound", _.get(removedResourceDetails, "resourceName"));
      return Promise.resolve({
        configData: configurationData,
        resource: {
          name: _.get(removedResourceDetails, "resourceName") || "",
          type: _.get(removedResourceDetails, "resourceData.label") || "",
          data: _.get(removedResourceDetails, "resourceData") || {}
        }
      });
    } catch (e) {
      vscode.window.showErrorMessage(toText(e));
      getModuleLogger(DependencyHandler.MODULE_NAME).error("unbind: processing failed", { message: toText(e) });
    }
  }

  public getId(): string {
    return this.id;
  }
}
