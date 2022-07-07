import { initComponent, destroy } from "../Utils";
import Signin from "../../src/components/Signin.vue";
import _ from "lodash";

let wrapper;

describe("Signin.vue", () => {
  afterEach(() => {
    destroy(wrapper);
  });

  let defaultTarget = {
    defaultEndpoint: "defaultEndpoint",
    isLoggedIn: false,
    passcodeUrl: "defaultURL",
    currentOrg: "defaultOrg",
    currentSpace: "defaultSpace",
  };

  test("component name", () => {
    wrapper = initComponent(Signin, { target: defaultTarget });
    expect(wrapper.name()).toBe("Signin");
  });

  test("component props", () => {
    wrapper = initComponent(Signin, { target: defaultTarget });
    expect(_.keys(wrapper.props())).toHaveLength(2);
  });

  describe("authFailedVisibility - computed", () => {
    test("authFailed is true", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.authFailed = true;
      expect(wrapper.vm.authFailedVisibility).toEqual("");
    });

    test("authFailed is false", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.authFailed = false;
      expect(wrapper.vm.authFailedVisibility).toEqual("none");
    });
  });

  describe("loggedInVisibility - computed", () => {
    test("isLoggedIn is true", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.isLoggedIn = true;
      expect(wrapper.vm.loggedInVisibility).toEqual("");
    });

    test("isLoggedIn is false", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.isLoggedIn = false;
      expect(wrapper.vm.loggedInVisibility).toEqual("none");
    });
  });

  describe("notLoggedInVisibility - computed", () => {
    test("isLoggedIn is true", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.isLoggedIn = true;
      expect(wrapper.vm.notLoggedInVisibility).toEqual("none");
    });

    test("isLoggedIn is false", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.isLoggedIn = false;
      expect(wrapper.vm.notLoggedInVisibility).toEqual("");
    });
  });

  describe("ssoVisibility - computed", () => {
    test("ssoOrCredentials equals SSO", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "SSO";
      expect(wrapper.vm.ssoVisibility).toEqual("");
    });

    test("ssoOrCredentials equals Credentials", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "Credentials";
      expect(wrapper.vm.ssoVisibility).toEqual("none");
    });
  });

  describe("credentialsVisibility - computed", () => {
    test("ssoOrCredentials equals SSO", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "SSO";
      expect(wrapper.vm.credentialsVisibility).toEqual("none");
    });

    test("ssoOrCredentials equals Credentials", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "Credentials";
      expect(wrapper.vm.credentialsVisibility).toEqual("");
    });
  });

  describe("btnStatus - method", () => {
    test("Credentials with usename and password", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "Credentials";
      wrapper.vm.$data.username = "user";
      wrapper.vm.$data.password = "pass";

      wrapper.vm.btnStatus();
      expect(wrapper.vm.disableButton).toBe(false);
    });

    test("SSO with passcode", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "SSO";
      wrapper.vm.$data.passcode = "pass";

      wrapper.vm.btnStatus();
      expect(wrapper.vm.disableButton).toBe(false);
    });

    test("Credentials set but username is undefined", () => {
      wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);
      wrapper.vm.$data.ssoOrCredentials = "Credentials";
      wrapper.vm.$data.username = "";

      wrapper.vm.btnStatus();
      expect(wrapper.vm.disableButton).toBe(true);
    });
  });

  test("setEndpoint - method", () => {
    wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);

    wrapper.vm.setEndpoint({ target: { value: "endpoint1" } });
    expect(wrapper.vm.endpoint).toBe("endpoint1");
  });

  test("setSSO - method", () => {
    wrapper = initComponent(Signin, { target: defaultTarget }, {}, true);

    wrapper.vm.setSSO({ target: { value: "SSO" } });
    expect(wrapper.vm.ssoOrCredentials).toBe("SSO");
    expect(wrapper.vm.disableButton).toBe(true);
  });

  test("click on sign-in triggers SigninClicked method", async () => {
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { then: {} };
    });
    wrapper = initComponent(
      Signin,
      {
        target: defaultTarget,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
      },
      true
    );

    const res = {
      endpoint: "newEndpoint",
      password: "newPassword",
      user: "newUser",
    };
    wrapper.vm.$data.endpoint = res.endpoint;
    wrapper.vm.$data.username = res.user;
    wrapper.vm.$data.password = res.password;

    wrapper.findAll("vscode-button").wrappers[1].trigger("click");
    expect(rpcInvokeMockFunction).toHaveBeenCalledWith("loginClick", [res]);
  });

  test("click on sign-out triggers SignoutClicked method", async () => {
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { then: {} };
    });
    wrapper = initComponent(
      Signin,
      {
        target: defaultTarget,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
      },
      true
    );

    wrapper.findAll("vscode-button").wrappers[0].trigger("click");
    expect(rpcInvokeMockFunction).toHaveBeenCalledWith("logoutClick", [{}]);
  });

  test("click on the link of sso passcode triggers openPasscodeLink method", async () => {
    const rpcInvokeMockFunction = jest.fn().mockImplementation(async () => {
      return { then: {} };
    });
    wrapper = initComponent(
      Signin,
      {
        target: defaultTarget,
        rpc: {
          invoke: rpcInvokeMockFunction,
        },
      },
      true
    );

    wrapper.findAll("vscode-link").wrappers[0].trigger("click");
    expect(rpcInvokeMockFunction).toHaveBeenCalledWith("openPasscodeLink", [defaultTarget.passcodeUrl]);
  });
});
