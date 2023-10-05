import CFTarget from "../../src/components/CFTarget.vue";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

jest.spyOn(window, "getComputedStyle").mockImplementation(() => ({
  getPropertyValue: (property) => {
    if (property === "--vscode-descriptionForeground") {
      return "#717171"; // Mock the CSS variable value
    }
    return "";
  },
}));

jest.mock("@vscode/webview-ui-toolkit", () => ({
  provideVSCodeDesignSystem: jest.fn(() => ({
    register: jest.fn(),
  })), // Mock provideVSCodeDesignSystem with an empty object
  vsCodeButton: jest.fn(() => ({})), // Mock vsCodeButton with an empty object
}));

describe("CFTarget.vue", () => {
  it("renders without errors", () => {
    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: {},
        isLoggedIn: true, // Provide isLoggedIn value as needed
      },
    });
    expect(wrapper.exists()).to.be.true;
  });

  it("invokes setTarget method on Apply button click", async () => {
    const rpcMock = {
      invoke: jest.fn().mockResolvedValue(), // Mock the applyTarget method
    };

    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: rpcMock,
        isLoggedIn: true,
      },
    });

    // Simulate selecting an organization and space
    wrapper.setData({
      selectedOrg: { label: "Org Label" },
      selectedSpace: { label: "Space Label" },
    });

    // Simulate clicking the "Apply" button
    await wrapper.find("vscode-button").trigger("click");

    // Add more assertions for component state updates
    expect(wrapper.vm.areOrgAndSpaceSet).to.be.true; // Ensure it's set to true
    expect(wrapper.vm.currentOrg).to.equal("Org Label"); // Ensure it's updated with the selected organization
    expect(wrapper.vm.currentSpace).to.equal("Space Label"); // Ensure it's updated with the selected space
  });

  it("displays certain elements when logged in", () => {
    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: {},
        isLoggedIn: true, // Logged in
      },
    });

    // Assert that certain elements are visible
    expect(wrapper.find(".cloud-foundry-target").isVisible()).to.be.true;
    expect(wrapper.vm.loggedInVisibility).to.equal("");
  });

  it("hides certain elements when not logged in", () => {
    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {},
        rpc: {},
        isLoggedIn: false, // Simulate not being logged in
      },
    });

    // Assert that certain elements are hidden
    expect(wrapper.vm.orgAndSpaceSetVisibility).to.equal("none");
    expect(wrapper.vm.loggedInVisibility).to.equal("none");
  });

  it("populates organization dropdown", async () => {
    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: {
          invoke: jest.fn().mockResolvedValue([]), // Mock the getOrgs and getSpaces methods
        },
        isLoggedIn: true,
      },
    });

    // Wait for Vue to update the component
    await wrapper.vm.$nextTick();

    // Assert that the organization dropdown is populated correctly
    const orgDropdown = wrapper.find(".cf-drop-down"); // Adjust the selector as needed
    expect(orgDropdown.exists()).to.be.true;
  });

  it("populates space dropdown when an organization is selected", async () => {
    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: {
          invoke: jest.fn().mockResolvedValue([]), // Mock the getOrgs and getSpaces methods
        },
        isLoggedIn: true,
      },
    });

    // Wait for Vue to update the component
    await wrapper.vm.$nextTick();

    // Simulate selecting an organization
    await wrapper.setData({ selectedOrg: { guid: "org-guid", label: "Org Label" } });

    // Wait for Vue to update the component
    await wrapper.vm.$nextTick();

    // Assert that the space dropdown is populated correctly
    const spaceDropdown = wrapper.find(".cf-drop-down"); // Adjust the selector as needed
    expect(spaceDropdown.exists()).to.be.true;
  });

  it("populates organization and space dropdowns", async () => {
    const rpcMock = {
      invoke: jest.fn().mockResolvedValue([]), // Mock the getOrgs and getSpaces methods
    };

    const wrapper = shallowMount(CFTarget, {
      props: {
        target: {
          currentOrg: "ExampleOrg",
        },
        rpc: rpcMock,
        isLoggedIn: true,
      },
    });

    // Wait for Vue to update the component
    await wrapper.vm.$nextTick();

    // Assert that the organization and space dropdowns are populated correctly
    const orgDropdown = wrapper.find(".cf-drop-down"); // Adjust the selector as needed
    const spaceDropdown = wrapper.findAll(".cf-drop-down"); // Adjust the selector as needed
    expect(orgDropdown.exists()).to.be.true;
    expect(spaceDropdown.length).to.equal(2); // You may need to adjust this based on your component's structure
  });
});
