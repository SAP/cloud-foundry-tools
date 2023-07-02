import { Organization, Space } from "@sap/cf-tools";
import { fail } from "assert";
import { expect } from "chai";
import * as proxyquire from "proxyquire";
import { cfendpoint } from "@sap/bas-sdk";

import { mock, SinonMock, stub } from "sinon";

describe("loginTargetView tests", () => {
  let cfApiMock: SinonMock;
  let cfendpointMock: SinonMock;
  const cfApiProxy = {
    cfGetConfigFileField: () => Promise.reject(new Error("not implemented")),
    cfGetAvailableOrgs: () => Promise.reject(new Error("not implemented")),
    cfGetAvailableSpaces: () => Promise.reject(new Error("not implemented")),
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
    cfendpointMock = mock(cfendpoint);
  });

  afterEach(() => {
    cfApiMock.verify();
    cfendpointMock.verify();
  });

  describe("getCFDefaultLandscape", () => {
    const envEndpoint = "https://my.env.endpoint";
    const fileEndpoint = "https://my.test.endpoint";

    it("ok:: getCFDefaultLandscape - 'Target' is defined in .cf config file - return it first", async () => {
      cfApiMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves(fileEndpoint);
      expect(await internal.getCFDefaultLandscape()).to.be.equal(fileEndpoint);
    });

    it("ok:: getCFDefaultLandscape - 'Target' is undefined in .cf config file - fetch from env", async () => {
      cfApiMock.expects("cfGetConfigFileField").withExactArgs("Target").resolves();
      cfendpointMock.expects("getCFEndpoint").resolves(envEndpoint);
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

  it("ok:: getOrgs", async () => {
    const orgs: Organization[] = [{ label: "org", guid: "guid" }];
    cfApiMock.expects("cfGetAvailableOrgs").resolves(orgs);
    expect(await internal.getOrgs()).to.be.deep.equal(orgs);
  });

  it("ok:: getOrgs - error occured", async () => {
    cfApiMock.expects("cfGetAvailableOrgs").rejects();
    expect(await internal.getOrgs()).to.be.deep.equal([]);
  });

  it("ok:: getSpaces", async () => {
    const org = "org-1";
    const spaces: Space[] = [{ label: "space", guid: "guid", orgGUID: "orgGUID" }];
    cfApiMock.expects("cfGetAvailableSpaces").withExactArgs(org).resolves(spaces);
    expect(await internal.getSpaces(org)).to.be.deep.equal(spaces);
  });

  it("ok:: getSpaces - error occured", async () => {
    const org = "org-1";
    cfApiMock.expects("cfGetAvailableSpaces").withExactArgs(org).rejects();
    expect(await internal.getSpaces(org)).to.be.deep.equal([]);
  });

  it("ok:: calculatePasscodeUrl", () => {
    const endpoint = "https://api.cf.test.org.my.com";
    expect(internal.calculatePasscodeUrl(endpoint)).to.be.equal("https://login.cf.test.org.my.com/passcode");
  });
});
