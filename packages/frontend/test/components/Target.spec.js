import { initComponent, destroy } from "../Utils";
import Target from "../../src/components/Target.vue";
import _ from "lodash";
import Vue from "vue";
import VueMdijs from "vue-mdijs";
import { mdiCheckCircleOutline } from "@mdi/js";
VueMdijs.add({ mdiCheckCircleOutline });

Vue.use(VueMdijs);

let wrapper;

describe("Target.vue", () => {
  afterEach(() => {
    destroy(wrapper);
  });

  let defaultTarget = {
    defaultEndpoint: "defaultEndpoint",
    isLoggedIn: true,
    passcodeUrl: "defaultURL",
    currentOrg: "defaultOrg",
    currentSpace: "defaultSpace",
  };

  test("component props", () => {
    wrapper = initComponent(Target, { target: defaultTarget }, true);
    expect(_.keys(wrapper.props())).toHaveLength(3);
  });

  test("click on apply triggers setTarget method", async () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { then: {} };
    });
    wrapper = initComponent(
      Target,
      {
        target: target1,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
        isLoggedIn: target1.isLoggedIn,
      },
      true
    );

    wrapper.vm.$data.selectedOrg = { label: "orgLabel1", guid: "orgGuild1" };
    wrapper.vm.$data.selectedSpace = { label: "spaceLabel1", guid: "spaceGuid1" };

    wrapper.findAll("vscode-button").wrappers[0].trigger("click");
    expect(rpcInvokeMockFunction).toHaveBeenCalledWith("applyTarget", ["orgLabel1", "spaceLabel1"]);
  });

  describe("statusApplyButton - computed", () => {
    test("selected equals to current", () => {
      let target1 = {
        defaultEndpoint: "endpoint1",
        isLoggedIn: true,
        passcodeUrl: "url1",
        currentOrg: "org1",
        currentSpace: "space1",
      };
      wrapper = wrapper = initComponent(
        Target,
        {
          target: target1,
          rpc: {
            invoke: jest.fn,
          },
          isLoggedIn: target1.isLoggedIn,
        },
        true
      );
      wrapper.vm.$data.currentOrg = "orgLabel1";
      wrapper.vm.$data.currentSpace = "spaceLabel1";
      wrapper.vm.$data.selectedOrg = { label: "orgLabel1", guid: "orgGuild1" };
      wrapper.vm.$data.selectedSpace = { label: "spaceLabel1", guid: "spaceGuid1" };

      expect(wrapper.vm.statusApplyButton).toBe(true);
    });

    test("selectedOrg and selectedSpace chosen", () => {
      let target1 = {
        defaultEndpoint: "endpoint1",
        isLoggedIn: true,
        passcodeUrl: "url1",
        currentOrg: "org1",
        currentSpace: "space1",
      };
      wrapper = initComponent(
        Target,
        {
          target: target1,
          rpc: {
            invoke: jest.fn,
          },
          isLoggedIn: target1.isLoggedIn,
        },
        true
      );
      wrapper.vm.$data.selectedOrg = { label: "orgLabel1", guid: "orgGuild1" };
      wrapper.vm.$data.selectedSpace = { label: "spaceLabel1", guid: "spaceGuid1" };

      expect(wrapper.vm.statusApplyButton).toBe(false);
    });

    test("selectedOrg and selectedSpace not selected", () => {
      let target1 = {
        defaultEndpoint: "endpoint1",
        isLoggedIn: true,
        passcodeUrl: "url1",
        currentOrg: "org1",
        currentSpace: "space1",
      };
      wrapper = wrapper = initComponent(
        Target,
        {
          target: target1,
          rpc: {
            invoke: jest.fn,
          },
          isLoggedIn: target1.isLoggedIn,
        },
        true
      );
      wrapper.vm.$data.selectedOrg = { label: "", guid: "0" };
      wrapper.vm.$data.selectedSpace = { label: "", guid: "0" };

      expect(wrapper.vm.statusApplyButton).toBe(true);
    });
  });

  test("changeSpace - method", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };
    wrapper = wrapper = initComponent(
      Target,
      {
        target: target1,
        rpc: {
          invoke: jest.fn,
        },
        isLoggedIn: target1.isLoggedIn,
      },
      true
    );
    wrapper.vm.$data.spaces = [{ label: "space1", guid: "1" }];
    wrapper.vm.$data.currentSpace = "space1";

    wrapper.vm.changeSpace({ target: { value: "1" } });
    expect(wrapper.vm.selectedSpace.label).toBe("space1");
    expect(wrapper.vm.selectedSpace.guid).toBe("1");
    expect(wrapper.vm.selectedSpace.selected).toBe(true);
  });

  test("changeOrg - method", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { then: {} };
    });
    wrapper = wrapper = initComponent(
      Target,
      {
        target: target1,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
        isLoggedIn: target1.isLoggedIn,
      },
      true
    );
    wrapper.vm.$data.orgs = [{ label: "org1", guid: "1" }];
    wrapper.vm.$data.spaces = [{ label: "space1", guid: "1" }];

    wrapper.vm.changeOrg({ target: { value: "1" } });
    expect(wrapper.vm.selectedOrg.label).toBe("org1");
    expect(wrapper.vm.selectedOrg.guid).toBe("1");
    expect(wrapper.vm.selectedOrg.selected).toBe(true);
  });

  test("selectSpace - method", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return {};
    });
    wrapper = wrapper = initComponent(
      Target,
      {
        target: target1,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
        isLoggedIn: target1.isLoggedIn,
      },
      true
    );

    wrapper.vm.selectSpace({ target: { value: "1" } });
    expect(wrapper.vm.spaces).toBeEmpty;
  });

  describe("loggedInVisibility - computed", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };

    test("isLoggedIn is false", () => {
      wrapper = wrapper = initComponent(
        Target,
        {
          target: target1,
          rpc: {
            invoke: jest.fn,
          },
          isLoggedIn: false,
        },
        true
      );
      expect(wrapper.vm.loggedInVisibility).toEqual("none");
    });

    test("isLoggedIn is true", () => {
      wrapper = wrapper = initComponent(
        Target,
        {
          target: target1,
          rpc: {
            invoke: jest.fn,
          },
          isLoggedIn: true,
        },
        true
      );
      expect(wrapper.vm.loggedInVisibility).toEqual("");
    });
  });

  describe("orgAndSpaceSetVisibility - computed", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };

    test("areOrgAndSpaceSet is true", () => {
      wrapper = initComponent(Target, { target: target1 }, {}, true);
      wrapper.vm.$data.areOrgAndSpaceSet = true;
      expect(wrapper.vm.orgAndSpaceSetVisibility).toEqual("");
    });

    test("areOrgAndSpaceSet is false, currentorg and currentSpace are defined", () => {
      target1.currentOrg = "org1";
      target1.currentSpace = "space1";
      wrapper = initComponent(Target, { target: target1 }, {}, false);
      wrapper.vm.$data.areOrgAndSpaceSet = false;
      expect(wrapper.vm.orgAndSpaceSetVisibility).toEqual("");
    });

    test("areOrgAndSpaceSet is false, currentorg and currentSpace are not defined", () => {
      target1.currentOrg = "";
      target1.currentSpace = "";
      wrapper = initComponent(Target, { target: target1 }, {}, true);
      wrapper.vm.$data.areOrgAndSpaceSet = false;
      expect(wrapper.vm.orgAndSpaceSetVisibility).toEqual("none");
    });
  });
});
