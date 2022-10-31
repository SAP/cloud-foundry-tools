import { fail } from "assert";
import { expect } from "chai";
import * as proxyquire from "proxyquire";

import { mock, SinonMock, stub } from "sinon";

describe("loginTargetView tests", () => {
  let cfApiMock: SinonMock;
  const cfApiProxy = {
    cfGetConfigFileField: () => Promise.reject(new Error("not implemented")),
  };
  let internal: any;

  before(() => {
    internal = proxyquire("../../src/loginTargetView/loginTargetView", {
      vscode: {
        "@noCallThru": true,
      },
      "@sap/cf-tools": cfApiProxy,
      "@noCallThru": true,
    }).internal;
  });

  beforeEach(() => {
    cfApiMock = mock(cfApiProxy);
  });

  afterEach(() => {
    cfApiMock.verify();
  });

  describe("getCFDefaultLandscape", () => {
    const envEndpoint = "https://my.env.endpoint";
    const fileEndpoint = "https://my.test.endpoint";

    beforeEach(() => {
      stub(process, "env").value({ CF_API_ENDPOINT: envEndpoint });
    });

    it("ok:: getCFDefaultLandscape - 'Target' is defined in .cf config file - return it first", async () => {
      cfApiMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves(fileEndpoint);
      expect(await internal.getCFDefaultLandscape()).to.be.equal(fileEndpoint);
    });

    it("ok:: getCFDefaultLandscape - 'Target' is undefined in .cf config file - fetch from env", async () => {
      cfApiMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves();
      expect(await internal.getCFDefaultLandscape()).to.be.equal(envEndpoint);
    });

    it("fail:: getCFDefaultLandscape - cfGetConfigFileField is rejected", () => {
      const error = new Error("cfGetConfigFileField rejected");
      cfApiMock.expects("cfGetConfigFileField").withExactArgs("Target").rejects(error);
      return internal
        .getCFDefaultLandscape()
        .then(() => {
          fail("should fail");
        })
        .catch((e: Error) => {
          expect(e.message).to.be.equal(error.message);
        });
    });
  });
});
