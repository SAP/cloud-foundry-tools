
import { expect } from "chai";
import { messages } from "../src/messages";

describe("messages unit test", () => {

    it("messages", () => {
        expect(messages.service_created("test")).to.be.not.undefined;
        expect(messages.activation_extension("test")).to.be.not.undefined;
        expect(messages.extension_active("test")).to.be.not.undefined;
        expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
        expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
        expect(messages.no_service_plan_info_found("testPlan", "testService")).to.be.not.undefined;
        expect(messages.no_services_instance_byname_found("testService")).to.be.not.undefined;
        expect(messages.no_services_found("my-plan {1}")).to.be.ok;
        expect(messages.service_bound_successful('planName')).to.be.ok;
    });
});