import { initComponent, destroy } from "../Utils";
import Target from "../../src/components/Target.vue";
import _ from "lodash";

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

  test("component name", () => {
    wrapper = initComponent(Target, { target: defaultTarget });
    expect(wrapper.name()).toBe("Target");
  });

  test("component props", () => {
    wrapper = initComponent(Target, { target: defaultTarget });
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

  describe("statusApplyButton - method", () => {
    test("selectedSpace equals to currentSpace", () => {
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
      wrapper.vm.$data.currentSpace = "spaceLabel1";
      wrapper.vm.$data.selectedOrg = { label: "orgLabel1", guid: "orgGuild1" };
      wrapper.vm.$data.selectedSpace = { label: "spaceLabel1", guid: "spaceGuid1" };

      wrapper.vm.statusApplyButton();
      expect(wrapper.vm.disableApplyButton).toBe(true);
    });

    test("selectedOrg and selectedSpace chosen", () => {
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
      wrapper.vm.$data.selectedOrg = { label: "orgLabel1", guid: "orgGuild1" };
      wrapper.vm.$data.selectedSpace = { label: "spaceLabel1", guid: "spaceGuid1" };

      wrapper.vm.statusApplyButton();
      expect(wrapper.vm.disableApplyButton).toBe(false);
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

      wrapper.vm.statusApplyButton();
      expect(wrapper.vm.disableApplyButton).toBe(true);
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
    expect(wrapper.vm.disableApplyButton).toBe(true);
  });

  test.skip("changeOrg - method", () => {
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

    // wrapper.vm.$data.currentSpace = "space1";

    wrapper.vm.changeOrg({ target: { value: "1" } });
    expect(wrapper.vm.disableApplyButton).toBe(false);
  });

  test.skip("selectSpace - method", () => {
    let target1 = {
      defaultEndpoint: "endpoint1",
      isLoggedIn: true,
      passcodeUrl: "url1",
      currentOrg: "org1",
      currentSpace: "space1",
    };
    let spaces = [{ label: "org1", guid: "1" }];
    spaces.map = () => {
      return { label: "org1", guid: "1" };
    };

    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { spaces: spaces, then: {} };
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

    // wrapper.vm.$data.currentSpace = "space1";

    wrapper.vm.selectSpace({ target: { value: "1" } });
    expect(wrapper.vm.disableApplyButton).toBe(false);
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
      wrapper = initComponent(Target, { target: target1 }, {}, true);
      wrapper.vm.$props.isLoggedIn = false;
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
          isLoggedIn: target1.isLoggedIn,
        },
        true
      );
      wrapper.vm.$props.isLoggedIn = true;
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
