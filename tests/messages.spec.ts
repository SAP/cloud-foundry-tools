/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { expect } from "chai";
import { messages } from "../src/messages";

it("messages", () => {
    expect(messages.service_created("test")).to.be.not.undefined;
    expect(messages.activation_extension("test")).to.be.not.undefined;
    expect(messages.extension_active("test")).to.be.not.undefined;
    expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
    expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
    expect(messages.no_service_plan_info_found("testPlan", "testService")).to.be.not.undefined;
    expect(messages.no_services_instance_byname_found("testService")).to.be.not.undefined;
});