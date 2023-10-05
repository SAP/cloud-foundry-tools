import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import App from "../src/App";

jest.mock("@sap-devx/webview-rpc/out.browser/rpc-browser", () => ({
  RpcBrowser: jest.fn().mockImplementation(() => ({
    invoke: jest.fn(),
    registerMethod: jest.fn(),
  })),
}));

// Mock RpcBrowserWebSockets class
jest.mock("@sap-devx/webview-rpc/out.browser/rpc-browser-ws", () => {
  class MockRpcBrowserWebSockets {
    constructor(ws, logger) {
      this.ws = ws;
      this.logger = logger;
      this.eventListeners = {};

      // Simulate the behavior of the real constructor
      this.ws.addEventListener = (eventName, callback) => {
        this.eventListeners[eventName] = callback;
      };

      // Initialize an empty invoke method
      this.invoke = jest.fn();
    }

    registerMethod() {}
  }

  return {
    RpcBrowserWebSockets: MockRpcBrowserWebSockets,
  };
});

jest.mock("@vscode/webview-ui-toolkit", () => ({
  provideVSCodeDesignSystem: jest.fn(() => ({
    register: jest.fn(),
  })), // Mock provideVSCodeDesignSystem with an empty object
  vsCodeButton: jest.fn(() => ({})), // Mock vsCodeButton with an empty object
  vsCodeProgressRing: jest.fn(() => ({})), // Mock vsCodeProgressRing with an empty object
  vsCodeDropdown: jest.fn(() => ({})), // Mock vsCodeDropdown with an empty object
}));

jest.mock("../src/components/CFHeader.vue", () => ({
  name: "CFHeader",
  template: "<div>Mocked CFHeader</div>", // Replace with your desired mock template
}));

// Mock the CFSignin.vue module
jest.mock("../src/components/CFSignin.vue", () => ({
  name: "CFSignin",
  template: "<div>Mocked CFSignin</div>", // Replace with your desired mock template
}));

describe("App.vue", () => {
  // Mock the rpc object with the required methods
  const mockRpc = {
    invoke: jest.fn(() => Promise.resolve({})),
    registerMethod: jest.fn(),
  };

  it("renders without errors", () => {
    // Mount the component with the mocked rpc object and target prop
    const wrapper = shallowMount(App, {
      data() {
        return {
          rpc: mockRpc, // Provide the mock rpc object
        };
      },
    });

    // Assert that the component exists without errors
    expect(wrapper.exists()).to.be.true;
  });

  it("updates isLoggedIn when updateIsLoggedIn is called", () => {
    const wrapper = shallowMount(App, {
      data() {
        return {
          rpc: mockRpc, // Provide the mock rpc object
        };
      },
    });
    expect(wrapper.vm.isLoggedIn).to.be.false; // Initial state

    // Call the updateIsLoggedIn method with a value of true
    wrapper.vm.updateIsLoggedIn(true);

    // Check that isLoggedIn has been updated to true
    expect(wrapper.vm.isLoggedIn).to.be.true;
  });

  it("renders the correct HTML structure", () => {
    const wrapper = shallowMount(App, {
      data() {
        return {
          rpc: mockRpc, // Provide the mock rpc object
        };
      },
    });
    const expectedHtml = `<divid="app"><c-f-header-stubclass="app"></c-f-header-stub><vscode-progress-ringclass="progress-ring"style="display:none;"></vscode-progress-ring><divclass="app"><divstyle="visibility:none;"><c-f-signin-stubtarget="functionObject(){[nativecode]}"rpc="[objectObject]"></c-f-signin-stub><divstyle="display:none;"><c-f-target-stubtarget="[Function]"rpc="[objectObject]"isloggedin="false"></c-f-target-stub></div></div></div><!--endprogress--></div>`;
    expect(wrapper.html().replace(/\s/g, "")).to.equal(expectedHtml);
  });
});
