import { initComponent, destroy } from "./Utils";
import App from "../src/App";
import { WebSocket } from "mock-socket";
global.WebSocket = WebSocket;
let wrapper;

describe("App.vue", () => {
  afterEach(() => {
    destroy(wrapper);
  });

  describe("targetVisibility - computed", () => {
    test.skip("isLoggedIn is true", () => {
      wrapper = initComponent(App, {}, true);
      wrapper.vm.rpc = {
        invoke: jest.fn(),
      };
      wrapper.vm.$data.rpc = {
        invoke: jest.fn(),
      };
      wrapper.vm.$data.isLoggedIn = true;
      expect(wrapper.vm.targetVisibility).toEqual("");
    });
  });
});
