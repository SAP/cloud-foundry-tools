/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import * as sinon from "sinon";
import * as path from "path";
import * as _ from "lodash";
import * as fs from "fs";
import { parse } from "comment-json";
import { SWATracker } from "@sap/swa-for-sapbas-vsx";

import * as nsVsMock from "../ext/mockVscode";
import { mockVscode } from "../ext/mockUtil";
mockVscode(nsVsMock.testVscode, "../../usage/usageTracker.ts");

import * as usageTracker from "../../src/usage/usageTracker";


describe("usageTracker unit tests", () => {
    let sandbox: sinon.SinonSandbox;
    let swaTracker: SWATracker;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    after(() => {
        sandbox.restore();
    });

    it("ok:: init SWATracker instance", () => {
        const jsonPackage = parse(fs.readFileSync(path.resolve(path.join(__dirname, "..", "..", "package.json")), { encoding: "utf8" }));
        swaTracker = usageTracker.Init4Tests();
        expect(_.get(swaTracker, "vsxPackageName")).to.be.equal(jsonPackage.name);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        expect(_.get(swaTracker, "reporterUniqueId")).to.be.equal(jsonPackage.publisher + "." + jsonPackage.name);
    });

    describe("usageTracker initialized with SWATracker instance - trackChiselTask", () => {
        let usageTrackerMock: sinon.SinonMock;

        beforeEach(() => {
            usageTrackerMock = sandbox.mock(swaTracker);
        });

        afterEach(() => {
            usageTrackerMock.verify();
        });

        it("ok:: config.args are empty", async () => {
            usageTrackerMock.expects("track").withExactArgs("Chisel Task", ["CF tools"]).resolves();
            await usageTracker.trackChiselTask("Chisel Task", ["CF tools"]);
        });

        it("exception:: verify runtime flow", async () => {
            const errorText = "Tracking Error";
            usageTrackerMock.expects("track").throws(new Error(errorText));
            await usageTracker.trackChiselTask("Chisel Task", ["CF tools"]);
        });
    });
});

