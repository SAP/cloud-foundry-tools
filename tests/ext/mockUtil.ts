/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from "path";

const Module = require("module"); // eslint-disable-line @typescript-eslint/no-var-requires
const originalRequire = Module.prototype.require;

export function clearModuleCache(testModulePath?: string): void {
    if (testModulePath) {
        const key = path.resolve(__dirname, '..', testModulePath);
        if (require.cache[key]) {
            delete require.cache[key];
        }
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mockVscode(oVscodeMock: any, testModulePath?: string): void {
    clearModuleCache(testModulePath);

    Module.prototype.require = function (request: any) {
        if (request === "vscode") {
            return oVscodeMock;
        }

        // eslint-disable-next-line prefer-rest-params
        return originalRequire.apply(this, arguments);
    };
}
