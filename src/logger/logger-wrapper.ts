/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import { getExtensionLogger, IChildLogger, IVSCodeExtLogger, LogLevel } from "@vscode-logging/logger";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonPackage = require("./../../package.json");
/**
 * Note that the values of these configuration properties must match those defined in the package.json
 */
const LOGGING_LEVEL_CONFIG_PROP = "CloudFoundryTools.loggingLevel";
const SOURCE_TRACKING_CONFIG_PROP = "CloudFoundryTools.sourceLocationTracking";

export const dummyLogger = {
    fatal: () => '', error: () => '', warn: () => '', info: () => '', debug: () => '', trace: () => '',
    changeSourceLocationTracking: () => '', changeLevel: () => '', getChildLogger: () => dummyLogger
};

/**
 * @type {IVSCodeExtLogger}
 */
let logger: IVSCodeExtLogger = dummyLogger;
/**
 * Note the use of a getter function so the value would be lazy resolved on each use.
 * This enables concise and simple consumption of the Logger throughout our Extension.
 *
 * @returns { IVSCodeExtLogger }
 */
export function getLogger(): IVSCodeExtLogger {
    return logger;
}

export function getModuleLogger(moduleName: string): IChildLogger {
    return getLogger().getChildLogger({ label: moduleName });
}

function logLoggerDetails(logPath: string, configLogLevel: LogLevel): void {
    getLogger().info(`Start Logging in Log Level: <${configLogLevel}>`);
    getLogger().info(`Full Logs can be found in the <${logPath}> folder`);
}

// export annotation for testing purpose only !!!
export function callbackOnDidChangeConfiguration(e: vscode.ConfigurationChangeEvent, context: vscode.ExtensionContext) {
    if (e.affectsConfiguration(LOGGING_LEVEL_CONFIG_PROP)) {
        // on our `loggingLevelConfigProp` configuration setting.
        const logLevel: LogLevel = vscode.workspace.getConfiguration().get(LOGGING_LEVEL_CONFIG_PROP);
        getLogger().changeLevel(logLevel);
        logLoggerDetails(_.get(context, ['logUri', 'fsPath']) || context.logPath, logLevel);
    } else if (e.affectsConfiguration(SOURCE_TRACKING_CONFIG_PROP)) {
        // Enable responding to changes in the sourceLocationTracking setting
        getLogger().changeSourceLocationTracking(vscode.workspace.getConfiguration().get(SOURCE_TRACKING_CONFIG_PROP));
    }
}

function listenToLogSettingsChanges(context: vscode.ExtensionContext) {
    // To enable dynamic logging level we must listen to VSCode configuration changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => callbackOnDidChangeConfiguration(e, context)));
}

function initLogger(context: vscode.ExtensionContext) {
    const logLevelSetting: LogLevel = vscode.workspace.getConfiguration().get(LOGGING_LEVEL_CONFIG_PROP);
    const logPath = _.get(context, ['logUri', 'fsPath']) || context.logPath;
    // The Logger must first be initialized before any logging commands may be invoked.
    logger = getExtensionLogger({
        extName: jsonPackage.displayName,
        level: logLevelSetting,
        logPath: logPath,
        logOutputChannel: vscode.window.createOutputChannel(jsonPackage.displayName),
        sourceLocationTracking: vscode.workspace.getConfiguration().get(SOURCE_TRACKING_CONFIG_PROP),
        logConsole: true
    });
    logLoggerDetails(logPath, logLevelSetting);
}

export function createLoggerAndSubscribeToLogSettingsChanges(context: vscode.ExtensionContext) {
    initLogger(context);
    // Subscribe to Logger settings changes.
    listenToLogSettingsChanges(context);
}
