/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from "path";

const Module = require("module"); // eslint-disable-line @typescript-eslint/no-var-requires
const originalRequire = Module.prototype.require;

export function clearModuleCache(testModulePath?: string) {
    if (testModulePath) {
        const key = path.resolve(__dirname, '..', testModulePath);
        if (require.cache[key]) {
            delete require.cache[key];
        }
    }
}

export function mockVscode(oVscodeMock: any, testModulePath?: string) {
    clearModuleCache(testModulePath);

    Module.prototype.require = function (request: any) {
        if (request === "vscode") {
            return oVscodeMock;
        }

        return originalRequire.apply(this, arguments);
    };
}
