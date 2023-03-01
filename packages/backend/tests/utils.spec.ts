import { expect, assert } from "chai";
import * as sinon from "sinon";
import * as path from "path";
import * as fs from "fs";
import * as fsSync from "fs";
import _ = require("lodash");
import { stringify } from "comment-json";
import { fail } from "assert";
import * as nsVsMock from "./ext/mockVscode";
import { mockVscode } from "./ext/mockUtil";

mockVscode(nsVsMock.testVscode, "src/utils.ts");
import * as utils from "../src/utils";
import * as cfLocal from "@sap/cf-tools/out/src/cf-local";
import { ServiceInstanceInfo, eFilters, ITarget } from "@sap/cf-tools";
import * as PropertiesReader from "properties-reader";
import * as messages from "../src/messages";

describe("utils unit tests", () => {
  let sandbox: sinon.SinonSandbox;
  let vscodeWorkspaceMock: sinon.SinonMock;
  let fsMock: sinon.SinonMock;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    vscodeWorkspaceMock = sandbox.mock(nsVsMock.testVscode.workspace);
    fsMock = sandbox.mock(fs.promises);
  });

  afterEach(() => {
    vscodeWorkspaceMock.verify();
    fsMock.verify();
    sandbox.restore();
  });

  describe("toText", () => {
    it("ok:: 'name' attribute defined", () => {
      const name = "test name";
      const e = new Error();
      e.name = name;
      expect(utils.toText(e)).to.be.equal(name);
    });

    it("ok:: 'message' attribute defined", () => {
      const message = "test description";
      const e = new Error(message);
      expect(utils.toText(e)).to.be.equal(message);
    });

    it("ok:: neither 'message' and 'name' attribute is defined", () => {
      const e = new Error();
      e.stack = "stack trace";
      expect(utils.toText(e)).to.be.equal(_.toString(e));
    });
  });

  describe("getEnvResources", () => {
    it("ok:: sanity with valid VCAP_SERVICES value", async () => {
      sandbox.stub(fsSync, "existsSync").returns(true);
      const envFilePath: string = path.join(__dirname, "resources", ".testValidEnv");
      const envResources = await utils.getEnvResources(envFilePath);
      const vcapServicesObj = envResources.vcapObject;
      expect(vcapServicesObj).to.not.be.empty;
      expect(vcapServicesObj.hana).to.exist;
    });

    it("ok:: sanity with valid VCAP_SERVICES value surrounded with single quotes", async () => {
      sandbox.stub(fsSync, "existsSync").returns(true);
      const envFilePath: string = path.join(__dirname, "resources", ".testValidEnvVCAPWithQuotes");
      const envResources = await utils.getEnvResources(envFilePath);
      const vcapServicesObj = envResources.vcapObject;
      expect(vcapServicesObj).to.not.be.empty;
      expect(vcapServicesObj.hana).to.exist;
    });

    it("ok:: sanity with valid VCAP_SERVICES value surrounded with single quotes and spaces", async () => {
      sandbox.stub(fsSync, "existsSync").returns(true);
      const envFilePath: string = path.join(__dirname, "resources", ".testValidEnvVCAPWithQuotesAndSpaces");
      const envResources = await utils.getEnvResources(envFilePath);
      const vcapServicesObj = envResources.vcapObject;
      expect(vcapServicesObj).to.not.be.empty;
      expect(vcapServicesObj.hana).to.exist;
    });

    it("fail:: invalid VCAP_SERVICES value in env file", async () => {
      sandbox.stub(fsSync, "existsSync").returns(true);
      const envFilePath: string = path.join(__dirname, "resources", ".testInValidVCAP");
      let vcapServicesObj;
      try {
        const envResources = await utils.getEnvResources(envFilePath);
        vcapServicesObj = envResources.vcapObject;
        fail("test should fail here");
      } catch (e) {
        expect(vcapServicesObj).to.be.undefined;
      }
    });

    it("ok:: '.env' file does not exist", async () => {
      sandbox.stub(fsSync, "existsSync").returns(false);
      const envFilePath: string = path.join(__dirname, "resources", ".notExists");
      expect((await utils.getEnvResources(envFilePath)).vcapObject).to.be.null;
    });

    it("ok:: '.env' file without VCAP_SERVICES key", async () => {
      sandbox.stub(fsSync, "existsSync").returns(true);
      const envFilePath: string = path.join(__dirname, "resources", ".envNoVCAP");
      expect((await utils.getEnvResources(envFilePath)).vcapObject).to.be.null;
    });
  });

  describe("Tests for removeResourceFromEnv when VCAP_SERVICES surrounded with quotes", () => {
    const envFilePath: string = path.join(__dirname, "resources", ".testValidEnvVCAPWithQuotes");
    const propReader = PropertiesReader(envFilePath);
    let vcapServicesObjBeforeChange: any;
    before(() => {
      sandbox = sinon.createSandbox();
      vcapServicesObjBeforeChange = propReader.get(utils.ENV_VCAP_RESOURCES);
    });

    afterEach(async () => {
      sandbox.restore();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      propReader.set(utils.ENV_VCAP_RESOURCES, vcapServicesObjBeforeChange);
      await propReader.save(envFilePath);
    });

    it("ok:: remove resource when VCAP is surrounded with single quotes and leave single quotes after removal", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "hana",
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      const vcapServicesObjAfterChange: string | null = PropertiesReader(envFilePath).getRaw(utils.ENV_VCAP_RESOURCES);

      if (vcapServicesObjAfterChange) {
        expect(vcapServicesObjAfterChange).to.not.include("hana");
        expect(_.startsWith(vcapServicesObjAfterChange, "'")).to.be.true;
        expect(_.endsWith(vcapServicesObjAfterChange, "'")).to.be.true;
      } else {
        expect(fail("VCAP_SERVICES must exists and be empty after removing the last dependency"));
      }
    });
  });

  describe("Tests for removeResourceFromEnv", () => {
    const envFilePath: string = path.join(__dirname, "resources", ".envtest");
    const propReader = PropertiesReader(envFilePath);
    let vcapServicesObjBeforeChange: any;
    before(() => {
      sandbox = sinon.createSandbox();
      vcapServicesObjBeforeChange = propReader.get(utils.ENV_VCAP_RESOURCES);
    });

    afterEach(async () => {
      sandbox.restore();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      propReader.set(utils.ENV_VCAP_RESOURCES, vcapServicesObjBeforeChange);
      await propReader.save(envFilePath);
    });

    // does not work on linux ?! - clarification needed
    it("Test removeResourceFromEnv - exception thrown", async () => {
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath + "_readonly",
        },
        depContext: {
          type: "hana",
          data: {
            resourceTag: "tag-not-found:",
          },
          displayName: "bookshop-hdi-container",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fsSync.chmodSync(bindContext.envPath.fsPath, 0o444);
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await utils.removeResourceFromEnv(bindContext);
        fail("test should fail here");
      } catch (e) {
        // ...
      }
    });

    it("ok:: remove resource when it is not tagged & verify it is left unquoted as it was.", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "xsuaa",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      const envPropertiesAfterChange = PropertiesReader(envFilePath);
      const vcapProperty: string = envPropertiesAfterChange.getRaw(utils.ENV_VCAP_RESOURCES) ?? "";
      expect(vcapProperty).to.not.include("xsuaa");
      expect(vcapProperty).to.include('"instance_name":"hdi-test-instance"');
      expect(vcapProperty).to.not.include("xsuaa");

      expect(_.startsWith(vcapProperty, "'")).to.be.false;
      expect(_.endsWith(vcapProperty, "'")).to.be.false;
    });

    it("ok:: remove resource when it is not tagged by wrong type", async () => {
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "_xsuaa",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      assert.deepEqual(PropertiesReader(envFilePath).get(utils.ENV_VCAP_RESOURCES), vcapServicesObjBeforeChange);
    });

    it("ok:: remove resource when it has a tag", async () => {
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "hana",
          data: {
            resourceTag: "mta-resource-name:",
            resourceName: "bookshop-hdi-container",
          },
          displayName: "bookshop-hdi-container",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      const envPropertiesAfterChange = PropertiesReader(envFilePath);
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include(
        '"instance_name":"hdi-test-instance"'
      );
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("xsuaa");
    });

    it("ok:: remove resource when it has a tag, resource type has more then 1 instance (e.g. two dependencies bound to different instances)", async () => {
      let envPropertiesAfterChange;
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "hanatest",
          data: {
            resourceTag: "mta-resource-name:",
            resourceName: "hana1-mta",
          },
          displayName: "hana1-mta",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      envPropertiesAfterChange = PropertiesReader(envFilePath);
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("hanatest");
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include('"instance_name":"hana-2"');
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-1"');

      // Another remove should remove this key completely and not leave an empty array
      const bindContext2: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "hanatest",
          data: {
            resourceTag: "mta-resource-name:",
            resourceName: "hana2-mta",
          },
          displayName: "hana2-mta",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext2);
      envPropertiesAfterChange = PropertiesReader(envFilePath);
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include("hanatest");
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-2"');
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-1"');
    });

    it("ok:: remove resource when it has a tag but it has not been found", async () => {
      const bindContext: any = {
        envPath: {
          fsPath: envFilePath,
        },
        depContext: {
          type: "hana",
          data: {
            resourceTag: "tag-not-found:",
          },
          displayName: "bookshop-hdi-container",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await utils.removeResourceFromEnv(bindContext);
      const envPropertiesAfterChange = PropertiesReader(envFilePath);
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include('"instance_name":"hdi-test-instance"');
      expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("xsuaa");
    });
  });

  describe("API for creation service", () => {
    const plan = "application";
    it("generateParams4Service - xsuaa, plan - application", () => {
      const data = utils.generateParams4Service("xsuaa", plan);
      expect(_.startsWith(data.xsappname as string, "xsuaa_")).to.be.true;
      expect(data["tenant-mode"]).to.be.equal("dedicated");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(_.size(data["oauth2-configuration"]["redirect-uris"])).to.be.equal(1);
    });

    it("generateParams4Service - xsuaa, plan - other", () => {
      assert.deepEqual(utils.generateParams4Service("xsauu", "other"), {});
    });

    it("validateParams - other : valid", () => {
      expect(utils.validateParams("other")('{ "key" : "value" }')).to.be.undefined;
    });

    it("validateParams - other : incorrect", () => {
      expect(_.size(utils.validateParams("other")('{ "key" :: "value" }'))).to.be.gt(1);
    });

    it("validateParams - xsuaa : valid", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      expect(utils.validateParams("xsuaa", plan)(stringify(xsuaaData))).to.be.undefined;
    });

    it("validateParams - xsuaa : invalid xsappname", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      xsuaaData.xsappname = "xs.ass_345";
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : padded xsappname", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      xsuaaData.xsappname = "   ";
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : missing xsappname", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      delete xsuaaData.xsappname;
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : long xsappname", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      xsuaaData.xsappname = _.repeat("x", 103);
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : invalid tenant-mode", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      xsuaaData["tenant-mode"] = "lite";
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : invalid redirect-uris", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      xsuaaData["oauth2-configuration"]["redirect-uris"] = ["localhost://*", "localhos://*"];
      expect(_.size(utils.validateParams("xsuaa", plan)(stringify(xsuaaData)))).to.be.gt(1);
    });

    it("validateParams - xsuaa : missing redirect-uris", () => {
      const xsuaaData = utils.generateParams4Service("xsuaa", plan);
      delete xsuaaData["oauth2-configuration"]["redirect-uris"];
      expect(utils.validateParams("xsuaa", plan)(stringify(xsuaaData))).to.be.undefined;
    });
  });

  describe("suite for getAllServiceInstances", () => {
    const services: ServiceInstanceInfo[] = [
      { label: "s1", serviceName: "hana", plan: "s-plan-1", plan_guid: "s-plan-guid-1" },
      { label: "s1", serviceName: "hana", plan: "s-plan-2", plan_guid: "s-plan-guid-2" },
    ];
    const ups = [
      { label: "ups1", serviceName: "user-provided-service", credentials: { tags: ["monodb", "hana"] } },
      { label: "ups2", serviceName: "user-provided-service", credentials: { tags: ["david"] } },
    ];

    it("ok:: there are both kind of services", async () => {
      sandbox.stub(cfLocal, "cfGetManagedServiceInstances").resolves(services);
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getAllServiceInstances({ ups: { isShow: true } }), _.concat(services, ups));
    });

    it("ok:: contain 'managed' and 'ups' filtered services", async () => {
      sandbox.stub(cfLocal, "cfGetManagedServiceInstances").resolves(services);
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getAllServiceInstances({ ups: { tag: "/.*dav.*/" } }), _.concat(services, ups[1]));
    });

    it("ok:: ups services are not required", async () => {
      sandbox.stub(cfLocal, "cfGetManagedServiceInstances").resolves(services);
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getAllServiceInstances(), services);
    });

    it("ok:: there are ups filtered services", async () => {
      const opts = {
        query: {
          filters: [
            { key: eFilters.broker_catalog_ids, value: "test" },
            { key: eFilters.space_guids, value: "testSpace" },
          ],
        },
        ups: { tag: "monodb" },
      };
      const expectedQuery = _.cloneDeep(opts.query);
      expectedQuery.filters = [{ key: eFilters.space_guids, value: "testSpace" }];
      sandbox.stub(cfLocal, "cfGetManagedServiceInstances").resolves(services);
      sandbox.stub(cfLocal, "cfGetUpsInstances").withArgs(expectedQuery).resolves(ups);
      assert.deepEqual(await utils.getAllServiceInstances(opts), _.concat(services, ups[0]));
    });
  });

  describe("getUpsServiceInstances", () => {
    const ups = [
      { label: "ups1", serviceName: "user-provided-service", credentials: { tags: ["monodb", "hana"] } },
      { label: "ups2", serviceName: "user-provided-service", credentials: { tags: ["david"] } },
      { label: "ups3", serviceName: "user-provided-service", credentials: { tags: "hana" } },
      { label: "wrong-credential-tags", serviceName: "user-provided-service", credentials: { tags: 2 } },
      {
        label: "wrong-credential-tags2",
        serviceName: "user-provided-service",
        credentials: { tags: [2, { data: "hana" }] },
      },
      { label: "wrong-credential", serviceName: "user-provided-service" },
    ];

    it("ok:: get all user provides services, tags not specified", async () => {
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getUpsServiceInstances(), ups);
    });

    it("ok:: get all user provides services filtered by credential tag", async () => {
      const options = { credentials: { tag: "hana" } };
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getUpsServiceInstances(options), [ups[0], ups[2]]);
    });

    it("ok:: get all user provides services filtered by credential tag as regex expression", async () => {
      const options = { credentials: { tag: "/.*mono|vid.*/" } };
      sandbox.stub(cfLocal, "cfGetUpsInstances").resolves(ups);
      assert.deepEqual(await utils.getUpsServiceInstances(options), [ups[0], ups[1]]);
    });
  });

  const UTF8 = "utf8";
  const EOL = require("os").EOL;
  const GITIGNORE = ".gitignore";

  describe("updateGitIgnoreList suite", () => {
    const project = { uri: nsVsMock.testVscode.Uri.file(path.resolve("myProject")) };
    const ignorePattern = new nsVsMock.testVscode.RelativePattern(project, GITIGNORE);
    const gitIgnoreFile = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/${GITIGNORE}`));

    it("ok:: '.env' pattern added", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .resolves(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: '.env' pattern not added - already exists", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line", "subFolder/.env"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").exactly(2).returns([testEnv]);
      fsMock.expects("readFile").resolves(gitIgnoreContent);
      fsMock.expects("writeFile").never();
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: empty project", async () => {
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: '.env' pattern added, .gitIgnore file not exist", async () => {
      const gitIgnoreContent = "";
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([]);
      fsMock.expects("open").withExactArgs(path.resolve(gitIgnoreFile.fsPath), "w").resolves(undefined);
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .resolves(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("fail:: '.env' pattern NOT added, .gitIgnore file not exist, creation failed", async () => {
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([]);
      fsMock.expects("open").withExactArgs(path.resolve(gitIgnoreFile.fsPath), "w").throws(new Error("access denied"));
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("fail:: '.env' pattern NOT added, writeFile failed", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .throws(new Error("access denied"));
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    describe("notifyWhenServicesInfoResultIncomplete method", () => {
      let vscodeWindowMock: sinon.SinonMock;

      beforeEach(() => {
        vscodeWindowMock = sandbox.mock(nsVsMock.testVscode.window);
      });

      afterEach(() => {
        vscodeWindowMock.verify();
      });

      it("ok:: serviceInstanceInfo list is fullfilled", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "type-1",
            plan: "plan-1",
          },
          {
            label: "instance-2",
            serviceName: "type-2",
            plan: "plan-2",
          },
        ];
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });

      it("ok:: serviceInstanceInfo list is empty", async () => {
        const list = Promise.resolve([]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect(await utils.notifyWhenServicesInfoResultIncomplete(list)).to.be.deep.equal([]);
      });

      it("ok:: serviceInstanceInfo list is incomplete", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "unknown",
            plan: "plan-1",
          },
        ];
        vscodeWindowMock
          .expects("showWarningMessage")
          .withExactArgs(messages.messages.service_instances_list_incomplete(_.map(infos, "label")))
          .resolves();
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });

      it("ok:: serviceInstanceInfo list is incomplete more than 3 instances", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "unknown",
            plan: "plan-1",
          },
          {
            label: "instance-2",
            serviceName: "type-2",
            plan: "unknown",
          },
          {
            label: "instance-3",
            serviceName: "type-3",
            plan: "unknown",
          },
          {
            label: "instance-4",
            serviceName: "type-4",
            plan: "unknown",
          },
        ];
        vscodeWindowMock
          .expects("showWarningMessage")
          .withExactArgs(messages.messages.service_instances_list_incomplete(_.map(infos, "label")))
          .resolves();
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });
    });

    describe("verifyCFTarget", () => {
      const target: ITarget = {
        "api endpoint": "endPoint",
        org: "test-org",
        space: "test-space",
        user: "user",
        "api version": "3.100.0",
      };

      it("ok:: validate", async () => {
        sandbox.stub(cfLocal, "cfGetTarget").resolves(target);
        expect(await utils.examCFTarget("", ["user"], false)).to.be.deep.equal(target);
      });

      it("error:: invalid key requested", async () => {
        sandbox.stub(cfLocal, "cfGetTarget").resolves(target);
        const error = "invalid key";
        try {
          await utils.examCFTarget(error, ["user", "wrong"], false);
          fail("should fail");
        } catch (e) {
          expect(e.message).to.be.equal(error);
        }
      });

      it("ok:: weak mode", async () => {
        const t: ITarget = { "api endpoint": "endPoint", user: "user", "api version": "3.100.0" };
        sandbox.stub(cfLocal, "cfGetTarget").resolves(t);
        expect(await utils.examCFTarget("", ["api endpoint"], true)).to.be.deep.equal(t);
      });

      it("exception:: throws error", async () => {
        const text = "error text";
        sandbox.stub(cfLocal, "cfGetTarget").throws(new Error(text));
        try {
          await utils.examCFTarget("", [], false);
          fail("should fail");
        } catch (e) {
          expect(e.message).to.be.equal(text);
        }
      });
    });
  });

  describe("updateGitIgnoreList suite", () => {
    const project = { uri: nsVsMock.testVscode.Uri.file(path.resolve("myProject")) };
    const ignorePattern = new nsVsMock.testVscode.RelativePattern(project, GITIGNORE);
    const gitIgnoreFile = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/${GITIGNORE}`));

    it("ok:: '.env' pattern added", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .resolves(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: '.env' pattern not added - already exists", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line", "subFolder/.env"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").exactly(2).returns([testEnv]);
      fsMock.expects("readFile").resolves(gitIgnoreContent);
      fsMock.expects("writeFile").never();
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: empty project", async () => {
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("ok:: '.env' pattern added, .gitIgnore file not exist", async () => {
      const gitIgnoreContent = "";
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([]);
      fsMock.expects("open").withExactArgs(path.resolve(gitIgnoreFile.fsPath), "w").resolves(undefined);
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .resolves(undefined);
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("fail:: '.env' pattern NOT added, .gitIgnore file not exist, creation failed", async () => {
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([]);
      fsMock.expects("open").withExactArgs(path.resolve(gitIgnoreFile.fsPath), "w").throws(new Error("access denied"));
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    it("fail:: '.env' pattern NOT added, writeFile failed", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const gitIgnoreContent = _.join(["     # empty line"], EOL);
      const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
      vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
      vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
      fsMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, { encoding: UTF8 }).resolves(gitIgnoreContent);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const patterns = _.split(gitIgnoreContent, EOL);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
      fsMock
        .expects("writeFile")
        .withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 })
        .throws(new Error("access denied"));
      await utils.updateGitIgnoreList(testEnv.fsPath);
    });

    describe("notifyWhenServicesInfoResultIncomplete method", () => {
      let vscodeWindowMock: sinon.SinonMock;

      beforeEach(() => {
        vscodeWindowMock = sandbox.mock(nsVsMock.testVscode.window);
      });

      afterEach(() => {
        vscodeWindowMock.verify();
      });

      it("ok:: serviceInstanceInfo list is fullfilled", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "type-1",
            plan: "plan-1",
          },
          {
            label: "instance-2",
            serviceName: "type-2",
            plan: "plan-2",
          },
        ];
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });

      it("ok:: serviceInstanceInfo list is empty", async () => {
        const list = Promise.resolve([]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect(await utils.notifyWhenServicesInfoResultIncomplete(list)).to.be.deep.equal([]);
      });

      it("ok:: serviceInstanceInfo list is incomplete", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "unknown",
            plan: "plan-1",
          },
        ];
        vscodeWindowMock
          .expects("showWarningMessage")
          .withExactArgs(messages.messages.service_instances_list_incomplete(_.map(infos, "label")))
          .resolves();
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });

      it("ok:: serviceInstanceInfo list is incomplete more than 3 instances", async () => {
        const infos: ServiceInstanceInfo[] = [
          {
            label: "instance-1",
            serviceName: "unknown",
            plan: "plan-1",
          },
          {
            label: "instance-2",
            serviceName: "type-2",
            plan: "unknown",
          },
          {
            label: "instance-3",
            serviceName: "type-3",
            plan: "unknown",
          },
          {
            label: "instance-4",
            serviceName: "type-4",
            plan: "unknown",
          },
        ];
        vscodeWindowMock
          .expects("showWarningMessage")
          .withExactArgs(messages.messages.service_instances_list_incomplete(_.map(infos, "label")))
          .resolves();
        expect(await utils.notifyWhenServicesInfoResultIncomplete(Promise.resolve(infos))).to.be.deep.equal(infos);
      });
    });

    describe.only("misc", () => {
      it("ok:: generate a .crt file with a specified content", () => {
        const ext = "crt";
        const data = `--BEGIN CONTENT--\nMIIFwjCCA6qgAwIBAgIRAO2k+oDf0awNmOnAgpMqVQQwDQYJKoZIhvcNAQELBQAw\ngYAxCzAJBgNVBAYTAkRFMRQwEgYDVQQHDAtFVTEwLUNhbmFyeTEPMA0GA1UECgwG--END CONTENT--`;
        const name = utils.internal.makeFile({ nameExt: `.${ext}`, content: data }) as string;
        expect(name.split(".").slice(-1)[0]).to.be.equal(ext);
        expect(fs.readFileSync(name).toString()).to.be.equal(data);
      });

      it("ok:: generate an empty .pem file", () => {
        const ext = "pem";
        const name = utils.internal.makeFile({ nameExt: `.${ext}` }) as string;
        expect(name.split(".").slice(-1)[0]).to.be.equal(ext);
        expect(fs.readFileSync(name).toString()).to.be.empty;
      });

      it.only("obtainCisOAuthToken", () => {
        const data: utils.TCisOAuth = {
          cert: `-----BEGIN CERTIFICATE-----\nMIIFwjCCA6qgAwIBAgIRAO2k+oDf0awNmOnAgpMqVQQwDQYJKoZIhvcNAQELBQAw\ngYAxCzAJBgNVBAYTAkRFMRQwEgYDVQQHDAtFVTEwLUNhbmFyeTEPMA0GA1UECgwG\nU0FQIFNFMSMwIQYDVQQLDBpTQVAgQ2xvdWQgUGxhdGZvcm0gQ2xpZW50czElMCMG\nA1UEAwwcU0FQIENsb3VkIFBsYXRmb3JtIENsaWVudCBDQTAeFw0yMjExMTUwNjEy\nMTFaFw0yMzA2MTUwNzEyMTFaMIGnMQswCQYDVQQGEwJERTEPMA0GA1UEChMGU0FQ\nIFNFMSMwIQYDVQQLExpTQVAgQ2xvdWQgUGxhdGZvcm0gQ2xpZW50czEPMA0GA1UE\nCxMGQ2FuYXJ5MRAwDgYDVQQLEwdzYXAtdWFhMRAwDgYDVQQHEwdzYXAtdWFhMS0w\nKwYDVQQDEyRiNDBlM2UzMC00N2VhLTRkZDQtOWZkNC1lY2EzOWU3ZjU5MTYwggEi\nMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCOO/xawAR9hCfPK1vdprsoO90O\nnFDCmv0fro92LA28f6CYEv8dEwElag87LgQ6l7TJ5imoHUHqJpyi9bSGheM0Na4t\ndfl4Vt7QIUxAcSaAdgN1z8h+6Ca6gXtCUerW6vxAqRJvBCKpj4qcx0dRYYdqtskt\nsHk/OwcAOnsvHU5etRQcyqFTcd10LOGryyRS2t0LsVz/KGp37VC+JtV0ZnWhdcur\n2uFNcgwJ1FSWUzycFnRVayeQIkJsYMyeNyzpiKGj4Vp7LwERk5PRe9hMS6y3z44l\nHn4NTy5jlQMbCigZvA7ts4YU8iDMkuIeyD2I5kh45vJEpTaZqyJnUcmasJ8vAgMB\nAAGjggEMMIIBCDAJBgNVHRMEAjAAMB8GA1UdIwQYMBaAFMwghFuHFYs3+X6Hsck+\nw2+VBG6RMB0GA1UdDgQWBBRDsprrK+HqsNnVZK2fjd+klzpAxzAOBgNVHQ8BAf8E\nBAMCBaAwEwYDVR0lBAwwCgYIKwYBBQUHAwIwgZUGA1UdHwSBjTCBijCBh6CBhKCB\ngYZ/aHR0cDovL3NhcC1jbG91ZC1wbGF0Zm9ybS1jbGllbnQtY2EtZXUxMC1jYW5h\ncnktY3Jscy5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9jcmwvZjhhYmU1\nNGUtMTk1MS00NzBlLWFlMmQtZGU0MGMxNjMzNDFjLmNybDANBgkqhkiG9w0BAQsF\nAAOCAgEAYUCSxRF6lYWo7FYsACq3Gtn+d4ilNskV0woJ0gNVwcQ6pioHmw58/Y2m\nTeFfnfjmIXv0O/XPhHbv+8zy1JSQN9lGuSzUmhVRNBD7qUO+/P1yV1PXLMFUn8KS\nuNrWOuCIzCaTmlq0nYM8KQVDmHc8eMyggMjcn7WnuAES6WcrldUY9EFqklk6PswI\nRk/pP6eLzsk3DT663YOin1/ApTPwFZCLxkNPFashUYNisPxxDvbJMTnw8g6YpXul\nOJm6Zba546wJflc28sm71+idLB7oE1I57nOM+FQ2P1wCva9osv/4CtA8ttJwcy9N\nhZ2krp+eyqRDOTTmiDUIqFH5DB0BQLAjs9uY+FnDQN5az0CpqUyB3dfS3wM8hkdT\nK+49ICEEMzfwR+bXCcUDWzYlFoyDhJ0zFI+ictzkP+KU+rNtrEgdzIEM1BLEVJlC\nj+z9qkk7VzHGX8Fk8/kHuuopERHJB2sc+eMVPxfYdZbwLKrTmNXOu/oOf5drXXn+\nGoXakW9tO+CjL+IOKCYxyHvmAUATediMiZzAZH4Lcc1kVdVaYRAesPJsuRLktgMu\nO2fWfCU34UYGXMK6ZxTa7Hpao7JxL1oXnIS1C1i2NRAzU+HmqG3nJddd/gu8poIq\nTL3LAp5hP5Hx/DVEdXO4JOqYkxgj1RqwjosVnO2rhF4hbP3nDAg=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\n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\n2JX4S0blcGoU+np5\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nMIIFZjCCA06gAwIBAgIQGHcPvmUGa79M6pM42bGFYjANBgkqhkiG9w0BAQsFADBN\nMQswCQYDVQQGEwJERTERMA8GA1UEBwwIV2FsbGRvcmYxDzANBgNVBAoMBlNBUCBT\nRTEaMBgGA1UEAwwRU0FQIENsb3VkIFJvb3QgQ0EwHhcNMTkwMjEzMTExOTM2WhcN\nMzkwMjEzMTEyNjMyWjBNMQswCQYDVQQGEwJERTERMA8GA1UEBwwIV2FsbGRvcmYx\nDzANBgNVBAoMBlNBUCBTRTEaMBgGA1UEAwwRU0FQIENsb3VkIFJvb3QgQ0EwggIi\nMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQChbHLXJoe/zFag6fB3IcN3d3HT\nY14nSkEZIuUzYs7B96GFxQi0T/2s971JFiLfB4KaCG+UcG3dLXf1H/wewq8ahArh\nFTsu4UR71ePUQiYlk/G68EFSy2zWYAJliXJS5k0DFMIWHD1lbSjCF3gPVJSUKf+v\nHmWD5e9vcuiPBlSCaEnSeimYRhg0ITmi3RJ4Wu7H0Xp7tDd5z4HUKuyi9XRinfvG\nkPALiBaX01QRC51cixmo0rhVe7qsNh7WDnLNBZeA0kkxNhLKDl8J6fQHKDdDEzmZ\nKhK5KxL5p5YIZWZ8eEdNRoYRMXR0PxmHvRanzRvSVlXSbfqxaKlORfJJ1ah1bRNt\no0ngAQchTghsrRuf3Qh/2Kn29IuBy4bjKR9CdNLxGrClvX/q26rUUlz6A3lbXbwJ\nEHSRnendRfEiia+xfZD+NG2oZW0IdTXSqkCbnBnign+uxGH5ECjuLEtvtUx6i9Ae\nxAvK2FqIuud+AchqiZBKzmQAhUjKUoACzNP2Bx2zgJOeB0BqGvf6aldG0n2hYxJF\n8Xssc8TBlwvAqtiubP/UxJJPs+IHqU+zjm7KdP6dM2sbE+J9O3n8DzOP0SDyEmWU\nUCwnmoPOQlq1z6fH9ghcp9bDdbh6adXM8I+SUYUcfvupOzBU7rWHxDCXld/24tpI\nFA7FRzHwKXqMSjwtBQIDAQABo0IwQDAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/\nBAUwAwEB/zAdBgNVHQ4EFgQUHLxmKw7KjUufjZNxqQ/KZ0ZpEyIwDQYJKoZIhvcN\nAQELBQADggIBABdSKQsh3EfVoqplSIx6X43y2Pp+kHZLtEsRWMzgO5LhYy2/Fvel\neRBw/XEiB5iKuEGhxHz/Gqe0gZixw3SsHB1Q464EbGT4tPQ2UiMhiiDho9hVe6tX\nqX1FhrhycAD1xHIxMxQP/buX9s9arFZauZrpw/Jj4tGp7aEj4hypWpO9tzjdBthy\n5vXSviU8L2HyiQpVND/Rp+dNJmVYTiFLuULRY28QbikgFO2xp9s4RNkDBnbDeTrT\nCKWcVsmlZLPJJQZm0n2p8CvoeAsKzIULT9YSbEEBwmeqRlmbUaoT/rUGoobSFcrP\njrBg66y5hA2w7S3tDH0GjMpRu16b2u0hYQocUDuMlyhrkhsO+Qtqkz1ubwHCJ8PA\nRJw6zYl9VeBtgI5F69AEJdkAgYfvPw5DJipgVuQDSv7ezi6ZcI75939ENGjSyLVy\n4SuP99G7DuItG008T8AYFUHAM2h/yskVyvoZ8+gZx54TC9aY9gPIKyX++4bHv5BC\nqbEdU46N05R+AIBW2KvWozQkjhSQCbzcp6DHXLoZINI6y0WOImzXrvLUSIm4CBaj\n6MTXInIkmitdURnmpxTxLva5Kbng/u20u5ylIQKqpcD8HWX97lLVbmbnPkbpKxo+\nLvHPhNDM3rMsLu06agF4JTbO8ANYtWQTx0PVrZKJu+8fcIaUp7MVBIVZ\n-----END CERTIFICATE-----\n`,
          certUrl: new URL(`https://devxnew.authentication.cert.sap.hana.ondemand.com`),
          clientId: `sb-c19d4fcf-5407-4f3f-94b5-d58757878790-clone!b192|cis-system!b13`,
          key: `-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAjjv8WsAEfYQnzytb3aa7KDvdDpxQwpr9H66PdiwNvH+gmBL/\nHRMBJWoPOy4EOpe0yeYpqB1B6iacovW0hoXjNDWuLXX5eFbe0CFMQHEmgHYDdc/I\nfugmuoF7QlHq1ur8QKkSbwQiqY+KnMdHUWGHarbJLbB5PzsHADp7Lx1OXrUUHMqh\nU3HddCzhq8skUtrdC7Fc/yhqd+1QvibVdGZ1oXXLq9rhTXIMCdRUllM8nBZ0VWsn\nkCJCbGDMnjcs6Yiho+Faey8BEZOT0XvYTEust8+OJR5+DU8uY5UDGwooGbwO7bOG\nFPIgzJLiHsg9iOZIeObyRKU2masiZ1HJmrCfLwIDAQABAoIBAAp7hUey6yHNAZoV\nGfol9ZkrgEk5YAJXpdwV42DUMlb4GP/cNo0P/3+gZ2r3IzymPZ67pcpMDbWSDu07\nqohXib0pT6LuFOq3jEhOi+4b6LiC+hJOs/oWZfRM4qaqnuIkA19IlqEz7tIMUCzp\nyunGhFJrEjyZyvXMBeIQbU+1mzcDiUmx+QI9/MRFC6vjHT+D2xdzM8hM0CDGeVvE\nkBdjsS41S6vHUkOQ9MSm2rWSRpR1zEF2OCd628EN8ECQjBev/QQUv1oMtoLC54LM\n/IIUjZYmk4AE0M3/QQLeXIcFoso6fwI24hISQz11iqJzdJeyj0Bych85rjaQrVnc\nBRtna/ECgYEAxRxo+QIoyVS6ScPycO5SMGYgMmXAQ+ya9fuPgurU6Q9a8iov+VFj\nQIasXineManOFCBGuw0nwU4ubIKHI2RBxkrGUPQN54le6swX87kpoV8F9fpt5QJo\n/uMxoG75XkzvsC0M1SwT2/wW9LtEFRkln3gw953yQzSfI2l2szhCDIUCgYEAuLp1\nOx8y3soEq5Ku+x/I4Xk940jrCwFFu6KU/27Cz5IUY8j0rs0jqPnLdHClKR5cREMA\n7s6BfP0IpYOipVWSFR3coX7biAQn0b4F52FcXUAvlsHVwvolvA53juiV1VyT6Qzf\ntMf9Qi3VEmJzkOVABt580A4QQ6B3zoTwPK66FSMCgYA4fgb77wl/gmANyjIO+c7m\nfi6WIyFyljpna5za+bDhxvva0gqD2zamBLMcHcXH2BHvJL0A2SletqiJgvN2SkKr\nsTybcQcXKADjLHFk8dmjnVdZA1hBvWoYO0c64vNneodrp824vvRGJT7zD0TZAycM\nSGdIYKVRa6B8hrp1bRdI/QKBgDiAJ00e/MMxzP3hTo3Wqe101N4ItoNWL0r1rlb2\nPLWaO4xNsbEpY2fSh00lCw8pjxT93XItTWO6TQO64GtrYdP9nzbyAxl2E+vOECY2\nHDcVY7jbrpMFSbdcQWs/blylBUR5wI6dwLOWKx6FaE2AIPY45LoKIyVcFmjfNk+J\nLbc7AoGADx9OP5yTMMKcmDyXdVGYWsUfk3ygReFJj5IiQXNvhhh+5QnW9gmZlAY2\nBWN9PNyNGIa0yXAW7Y5xkVBvQlo8SCn+W0nOCCcF6pgAMPvSqdtoPQjIFXKuFT1m\nKTdZYA4nEKwpNdrl064NXETOh0Aa5LuSE0QEZlHtDtKajZbMvWU=\n-----END RSA PRIVATE KEY-----\n`,
        };
        const token = utils.obtainCisOAuthToken(data) as string;
        expect(token).to.be.empty;
      });
    });
  });
});
