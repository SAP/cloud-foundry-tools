import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CFSignin from "../../src/components/CFSignin.vue";

jest.mock("@vscode/webview-ui-toolkit", () => ({
  provideVSCodeDesignSystem: jest.fn(() => ({
    register: jest.fn(),
  })),
  vsCodeDivider: jest.fn(() => ({
    render() {
      return "<div></div>"; // Mock the rendering of vscode-divider
    },
  })),
  vsCodeTextField: jest.fn(() => ({})), // Mock vsCodeTextField with an empty object
  vsCodeRadioGroup: jest.fn(), // Add this line to mock vsCodeRadioGroup
  vsCodeRadio: jest.fn(), // Add this line to mock vsCodeRadio
  vsCodeLink: jest.fn(() => ({})), // Mock vsCodeLink with an empty object
  vsCodeButton: jest.fn(() => ({})), // Mock vsCodeButton with an empty object
  vsCodeDropdown: jest.fn(() => ({})), // Mock vsCodeDropdown with an empty object
  vsCodeOption: jest.fn(() => ({})), // Mock vsCodeOption with an empty object
}));

const mockTooltipDirective = jest.fn();

const global = {
  directives: {
    // Use the mockTooltipDirective for v-tooltip
    tooltip: mockTooltipDirective,
  },
  stubs: {
    VscodeLink: {
      template: "<div></div>",
    },
    VscodeRadioGroup: {
      template: "<div></div>",
    },
    VscodeRadio: {
      template: "<button></button>",
    },
    VscodeTextField: {
      template: "<div></div>",
    },
    VscodeButton: {
      template: "<button></button>",
    },
  },
};

describe("CFSignin.vue", () => {
  it("renders without errors", () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {},
        rpc: {},
      },
    });
    expect(wrapper.exists()).to.be.true;
  });

  it("initializes with default data values", () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "https://example.com",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Check initial data values
    expect(wrapper.vm.endpoint).to.equal("https://example.com");
    expect(wrapper.vm.passcode).to.equal("");
    expect(wrapper.vm.username).to.equal("");
    expect(wrapper.vm.password).to.equal("");
    expect(wrapper.vm.isCFEndpointValid).to.be.true;
    expect(wrapper.vm.disableButton).to.be.true;
  });

  it("disables the Sign in button when no input is provided", async () => {
    //avoid showing warning for custom element in console log.
    jest.spyOn(console, "warn").mockImplementation(() => {
      return;
    });

    const wrapper = shallowMount(CFSignin, {
      // Do not mock button
      global: {
        directives: {
          // Use the mockTooltipDirective for v-tooltip
          tooltip: mockTooltipDirective,
        },
        stubs: {
          VscodeLink: {
            template: "<div></div>",
          },
          VscodeRadioGroup: {
            template: "<div></div>",
          },
          VscodeRadio: {
            template: "<button></button>",
          },
          VscodeTextField: {
            template: "<div></div>",
          },
        },
      },
      props: {
        target: {
          defaultEndpoint: "",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Confirm that the Sign in button is initially not visible
    expect(wrapper.find("vscode-button").isVisible()).to.be.false;
  });

  it("handles successful sign-in with valid credentials", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "https://example.com",
          isLoggedIn: false,
        },
        rpc: {
          invoke: jest.fn().mockResolvedValue(true), // Mock RPC to return success
        },
      },
    });

    // Set valid username and password or passcode
    wrapper.setData({ username: "validUsername", password: "validPassword" });

    // Trigger the SigninClicked method
    await wrapper.vm.SigninClicked();

    // Assert that authentication failed message is not displayed and isLoggedIn is set to true
    expect(wrapper.vm.authFailed).to.equal("");
    expect(wrapper.vm.isLoggedIn).to.be.true;
  });

  it("handles successful sign-in with valid SSO", async () => {
    const endpoint = "https://example.com";
    const passcode = "-_validPasscode";
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: endpoint,
          isLoggedIn: false,
        },
        rpc: {
          invoke: async (command, args) => {
            expect(command).to.equal("loginClick");
            expect(args[0]).to.deep.equal({
              endpoint: endpoint,
              ssoPasscode: `"${passcode}"`,
            });
            return true;
          },
        },
      },
    });

    // Set SSO authentication method
    wrapper.vm.setSSO({ target: { value: "SSO" } });

    wrapper.vm.passcode = passcode;

    // Trigger the SigninClicked method
    await wrapper.vm.SigninClicked();

    // Assert that authentication failed message is not displayed and isLoggedIn is set to true
    expect(wrapper.vm.authFailed).to.equal("");
    expect(wrapper.vm.isLoggedIn).to.be.true;
  });

  it("handles unsuccessful sign-in with invalid credentials", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "https://example.com",
          isLoggedIn: false,
        },
        rpc: {
          invoke: jest.fn().mockResolvedValue(false), // Mock RPC to return failure
        },
      },
    });

    // Set invalid username and password or passcode
    wrapper.setData({ username: "invalidUsername", password: "invalidPassword" });

    // Trigger the SigninClicked method
    await wrapper.vm.SigninClicked();

    // Assert that authentication failed message is displayed and isLoggedIn remains false
    expect(wrapper.vm.authFailed).not.to.equal("");
    expect(wrapper.vm.isLoggedIn).to.be.false;
  });

  it("handles successful sign-out", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "https://example.com",
          isLoggedIn: true,
        },
        rpc: {
          invoke: jest.fn().mockResolvedValue(true), // Mock RPC to return success
        },
      },
    });

    // Trigger the SignoutClicked method
    await wrapper.vm.SignoutClicked();

    // Assert that isLoggedIn is set to false after sign-out
    expect(wrapper.vm.isLoggedIn).to.be.false;
  });

  it("sets SSO or Credentials authentication method", () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Assert that ssoOrCredentials is set to "SSO" by default
    expect(wrapper.vm.ssoOrCredentials).to.equal("SSO");

    // Set Credentials authentication method
    wrapper.vm.setSSO({ target: { value: "Credentials" } });

    // Assert that ssoOrCredentials is set to "Credentials"
    expect(wrapper.vm.ssoOrCredentials).to.equal("Credentials");
  });

  it("should enable the button when conditions are met", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Set some initial values to trigger button enabling
    await wrapper.setData({
      endpoint: "https://example.com", // Set a valid endpoint
      isCFEndpointValid: true,
      ssoOrCredentials: "Credentials",
      username: "user",
      password: "password",
    });

    // Trigger the btnStatus method
    await wrapper.vm.btnStatus();

    // Check that the button is enabled
    expect(wrapper.vm.disableButton).to.be.false;
  });

  it("should disable the button when conditions are not met", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Set some initial values to trigger button disabling
    await wrapper.setData({
      endpoint: "", // Set an empty endpoint
      isCFEndpointValid: false,
      ssoOrCredentials: "Credentials",
      username: "",
      password: "",
    });

    // Trigger the btnStatus method
    await wrapper.vm.btnStatus();

    // Check that the button is disabled
    expect(wrapper.vm.disableButton).to.be.true;
  });

  it("should set CF endpoint and validate it", async () => {
    const wrapper = shallowMount(CFSignin, {
      global,
      props: {
        target: {
          defaultEndpoint: "",
          isLoggedIn: false,
        },
        rpc: {},
      },
    });

    // Set a valid CF endpoint
    const validEndpoint = "https://example.com";
    await wrapper.vm.setEndpoint({ target: { value: validEndpoint } });

    // Check if endpoint is correctly set
    expect(wrapper.vm.endpoint).to.be.equals(validEndpoint);

    // Set an invalid CF endpoint
    const invalidEndpoint = "invalid-url";
    await wrapper.vm.setEndpoint({ target: { value: invalidEndpoint } });

    // Check if endpoint is correctly set
    expect(wrapper.vm.endpoint).to.be.equals(invalidEndpoint);
  });
});
