/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode";
import * as path from "path"; 

import {
    IRunnable, IRunConfigContext, IDependencyContext, ConfigurationTarget,
    IRunConfigHandler, IConfigurationData, ConfigObject
} from "@sap/wing-run-config-types";


class Runnable implements IRunnable {
    public displayName = "CF Tools Example";
    public displayType = "CF Tools Type";
    public path = "path";
    constructor(public id: string) { }
}

class DependencyContext implements IDependencyContext {
    public displayName = "cf-tools-rsource-dependency";
    public bindable = true;
    public displayType = "cf-tools-rsource-dependency";
    public type = "hana";
    public dependencyHandlerId = "cf-tools-rsource-dependency";
}

export class RunConfigContext implements IRunConfigContext {
    public iconBuffer: Buffer = null;
    public displayName = "CF Tools Example";
    public groupName = this.appId;
    public envPath: vscode.Uri = vscode.Uri.file(path.join("C:", "Users", "your-i-number", "devx-wing", "test-run-config", "env", ".env"));
    public path: vscode.Uri = null;
    public dependencies = [new DependencyContext()];

    constructor(private readonly id: string, private readonly appId: string) {
        this.groupName = appId;
    }
}

export class RunConfigHandler implements IRunConfigHandler {
    constructor(private readonly id: string) { }

    public getRunnables(): Promise<IRunnable[]> {
        return Promise.resolve([
            new Runnable(this.id),
            new Runnable(this.id + 1),
            new Runnable(this.id + 2)
        ]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getRunConfigContext(runnableId: string, confData: IConfigurationData): Promise<IRunConfigContext> {
        return Promise.resolve(new RunConfigContext(this.id, "Cf App"));
    }

    public createConfiguration(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        runnableId: string
    ) {
        return Promise.resolve(
            {
                config:
                    new ConfigObject(
                        {
                            type: "node",
                            request: "launch",
                            name: "cf run " + Date.now(),
                            env: {
                                "Saggi": 1,
                                "run.config": "sage"
                            }
                        },
                        ConfigurationTarget.launch
                    )
            }
        );
    }

    public getId(): string {
        return "cf_run_id_" + this.id;
    }
}

// export async function cfbind(envPath: string, type: ServiceInfo): Promise<ServiceInstanceInfo> {
//   return commands.getAvailableServices().then((instances)=>{
//     vscode.window.showQuickPick(instances)
//   });
// }
