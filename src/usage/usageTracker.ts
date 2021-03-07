import { SWATracker } from "@sap/swa-for-sapbas-vsx";
import { getModuleLogger } from "../logger/logger-wrapper";
import { toText } from "../utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonPackage = require("./../../package.json");
const LOGGER_MODULE = "usageTracker";

let swaTracker: SWATracker;

function getInstance(): SWATracker {
    if (!swaTracker) {
        swaTracker = new SWATracker(
            jsonPackage.publisher,
            jsonPackage.name,
            // callback for error, one such callback for all the errors we receive via all the track methods
            // error can be string (err.message) or number (response.statusCode)
            (error: string | number) => {
                getModuleLogger(LOGGER_MODULE).error("SAP Web Analytics tracker initialization failed", { error: error });
            }
        );
    }
    return swaTracker;
}

export async function trackChiselTask(eventType: string, custom_events?: string[]): Promise<void> {
    return Promise.resolve().then(() => {
        try {
            getInstance().track(eventType, custom_events);
        } catch (e) {
            getModuleLogger(LOGGER_MODULE).error("trackRun: track failed", { exception: toText(e) });
        }
    });
}

/**
 * !!! FOR TESTS PURPOSE ONLY !!!
 */
export function Init4Tests(): SWATracker {
    getInstance();
    return swaTracker;
}
