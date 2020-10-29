/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import * as sinon from "sinon";
import * as path from "path";
import * as _ from "lodash";
import * as fsextra from "fs-extra";
import { parse } from "comment-json";
import { SWATracker } from "@sap/swa-for-sapbas-vsx";
import * as usageTracker from "../../src/usage/usageTracker";

describe("usageTracker unit tests", () => {
    let sandbox: any;
    let swaTracker: SWATracker;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    it("tracker - init SWATracker instance", () => {
        const jsonPackage = parse(fsextra.readFileSync(path.resolve(path.join(__dirname, "..", "..", "package.json")), { encoding: "utf8" }));
        swaTracker = usageTracker.Init4Tests();
        expect(_.get(swaTracker, "vsxPackageName")).to.be.equal(jsonPackage.name);
        expect(_.get(swaTracker, "reporterUniqueId")).to.be.equal(jsonPackage.publisher + "." + jsonPackage.name);
    });

    describe("usageTracker initialized with SWATracker instance", () => {
        let usageTrackerMock: any;

        beforeEach(() => {
            usageTrackerMock = sandbox.mock(swaTracker);
        });

        afterEach(() => {
            usageTrackerMock.verify();
        });

        it("trackChiselTask - config.args are empty", async () => {
            usageTrackerMock.expects("track").withExactArgs("Chisel Task", ["CF tools"]).returns();
            await usageTracker.trackChiselTask("Chisel Task", ["CF tools"]);
        });
    
        it("trackChiselTask - exception thrown", async () => {
            const errorText = "Tracking Error";
            usageTrackerMock.expects("track").throws(new Error(errorText));
            await usageTracker.trackChiselTask("Chisel Task", ["CF tools"]);
        });
    });
});

