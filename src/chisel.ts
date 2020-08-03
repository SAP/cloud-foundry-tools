/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as _ from "lodash";
import { dataContentAsObject } from "@sap/cf-tools";

export async function checkAndCreateChiselTask(filePath: string, name: string): Promise<{ label: string }> {
    const chiselJson = await dataContentAsObject(filePath);
    const chiselUrl = _.get(chiselJson, "CHISEL_URL");
    if (_.isEmpty(chiselUrl)) {
        return {label: ''};
    }

    const task = {
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
    };
    return task;
}
