/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as _ from "lodash";
import { dataContentAsObject } from "@sap/cf-tools";
import { getModuleLogger } from "./logger/logger-wrapper";

const LOGGER_MODULE = "chisel";

export async function checkAndCreateChiselTask(filePath: string, name: string): Promise<{ label: string }> {
    const chiselJson = await dataContentAsObject(filePath);
    const chiselUrl = _.get(chiselJson, "CHISEL_URL");
    if (_.isEmpty(chiselUrl)) {
        getModuleLogger(LOGGER_MODULE).debug("checkAndCreateChiselTask: empty chisel_url", { filePath: filePath });
        return { label: '' };
    }

    getModuleLogger(LOGGER_MODULE).debug("checkAndCreateChiselTask: chisel task <%s> composed", `openChiselTunnerFor-${name}`, { filePath: filePath });
    return {
        "label": `openChiselTunnerFor-${name}`,
        "type": "shell",
        "command": "chisel",
        "isBackground": true,
        "problemMatcher": "$chisel-client",
        args: [
            "client",
            "--auth",
            `${_.get(chiselJson, "CHISEL_USER")}:${_.get(chiselJson, "CHISEL_PASSWORD")}`,
            chiselUrl,
            _.get(chiselJson, "TUNNEL_PARAM")
        ]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
}
