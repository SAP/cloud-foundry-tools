/*
 * SPDX-FileCopyrightText: 2020 SAP SE or an SAP affiliate company <alexander.gilin@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { expect } from "chai";
import { messages } from "../src/messages";

it("messages", () => {
    // tslint:disable-next-line: no-unused-expression
    expect(messages.service_not_found('testInstance')).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.exceed_number_of_attempts('4')).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.failed_creating_entity("description", "name")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.service_created("test")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.activation_extension("test")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.extension_active("test")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.ext_not_set("test")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
    // tslint:disable-next-line: no-unused-expression
    expect(messages.targeting("testOrg", "testSpace")).to.be.not.undefined;
    expect(messages.no_service_plan_info_found("testPlan", "testService")).to.be.not.undefined;
});