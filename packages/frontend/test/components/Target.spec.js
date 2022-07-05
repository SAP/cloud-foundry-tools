import { initComponent, destroy } from "../Utils";
import Target from "../../src/components/Target.vue";
import _ from "lodash";

let wrapper;

describe("Target.vue", () => {
  afterEach(() => {
    destroy(wrapper);
  });

  let target1 = {
    defaultEndpoint: "endpoint1",
    isLoggedIn: true,
    passcodeUrl: "url1",
    currentOrg: "org1",
    currentSpace: "space1",
  };

  test("component name", () => {
    wrapper = initComponent(Target, { target: target1 });
    expect(wrapper.name()).toBe("Target");
  });

  test("component props", () => {
    wrapper = initComponent(Target, { target: target1 });
    expect(_.keys(wrapper.props())).toHaveLength(3);
  });

  test.skip("click triggers collapseOutput method", async () => {
    const rpcInvokeMockFunction = jest.fn();
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

    // wrapper.findAll("button").wrappers[0].trigger("click");
    expect(rpcInvokeMockFunction).toHaveBeenCalledWith("getSelectedTarget", [{}]);
  });
});
