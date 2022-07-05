import { initComponent, destroy } from "../Utils";
import Header from "../../src/components/Header.vue";
import _ from "lodash";

let wrapper;

describe("Header.vue", () => {
  afterEach(() => {
    destroy(wrapper);
  });

  test("component name", () => {
    wrapper = initComponent(Header);
    expect(wrapper.name()).toBe("Header");
  });

  test("component props", () => {
    wrapper = initComponent(Header);
    expect(_.keys(wrapper.props())).toHaveLength(0);
  });

  test("component items", () => {
    wrapper = initComponent(Header);
    expect(wrapper.find("h1").text()).toBe("Cloud Foundry Sign In and Targets");
    expect(wrapper.find("span.subtitle-field").text()).toBe(
      "Provide your Cloud Foundry parameters to sign in to the Cloud Foundry enviroment"
    );
  });
});
