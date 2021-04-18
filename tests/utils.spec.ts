/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, assert } from "chai";
import * as sinon from "sinon";
import * as fsextra from 'fs-extra';
import * as path from 'path';
import * as fs from 'fs';
import _ = require("lodash");
import { stringify } from "comment-json";
import { fail } from "assert";
import * as nsVsMock from "./ext/mockVscode";
import { mockVscode } from "./ext/mockUtil";

mockVscode(nsVsMock.testVscode, "src/utils.ts");
import * as utils from "../src/utils";
import * as cfLocal from "@sap/cf-tools/out/src/cf-local";
import { ServiceInstanceInfo, eFilters } from "@sap/cf-tools";
import * as PropertiesReader from "properties-reader";

describe('utils unit tests', () => {
    let sandbox: sinon.SinonSandbox;
    let vscodeWorkspaceMock: sinon.SinonMock;
    let fsExtraMock: sinon.SinonMock;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        vscodeWorkspaceMock = sandbox.mock(nsVsMock.testVscode.workspace);
        fsExtraMock = sandbox.mock(fsextra);
    });

    afterEach(() => {
        vscodeWorkspaceMock.verify();
        fsExtraMock.verify();
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
            e.stack = 'stack trace';
            expect(utils.toText(e)).to.be.equal(_.toString(e));
        });
    });

    describe("getEnvResources", () => {

        it("ok:: sanity with valid VCAP_SERVICES value", async () => {
            sandbox.stub(fsextra, "existsSync").returns(true);
            const envFilePath: string = path.join(__dirname, "resources", ".testValidEnv");
            const vcapServicesObj = await utils.getEnvResources(envFilePath);
            expect(vcapServicesObj).to.not.be.empty;
            expect(vcapServicesObj.hana).to.exist;
        });

        it("fail:: invalid VCAP_SERVICES value in env file", async () => {
            sandbox.stub(fsextra, "existsSync").returns(true);
            const envFilePath: string = path.join(__dirname, "resources", ".testInValidVCAP");
            let vcapServicesObj;
            try {
                vcapServicesObj = await utils.getEnvResources(envFilePath);
                fail("test should fail here");
            } catch (e) {
                expect(vcapServicesObj).to.be.undefined;
            }
        });

        it("ok:: '.env' file does not exist", async () => {
            sandbox.stub(fsextra, "existsSync").returns(true);
            const envFilePath: string = path.join(__dirname, "resources", ".notExists");
            expect(await utils.getEnvResources(envFilePath)).to.be.null;
        });

        it("ok:: '.env' file without VCAP_SERVICES key", async () => {
            sandbox.stub(fsextra, "existsSync").returns(true);
            const envFilePath: string = path.join(__dirname, "resources", ".envNoVCAP");
            expect(await utils.getEnvResources(envFilePath)).to.be.null;
        });
    });

    describe("Tests for removeResourceFromEnv", () => {
        const envFilePath: string = path.join(__dirname, "resources", ".env");
        const propReader = PropertiesReader(envFilePath);
        let vcapServicesObjBeforeChange: any;
        before(() => {
            sandbox = sinon.createSandbox();
            vcapServicesObjBeforeChange = propReader.get(utils.ENV_VCAP_RESOURCES);
        });

        afterEach(async () => {
            sandbox.restore();
            propReader.set(utils.ENV_VCAP_RESOURCES, vcapServicesObjBeforeChange);
            await propReader.save(envFilePath);
        });

        // does not work on linux ?! - clarification needed
        it.skip("Test removeResourceFromEnv - exception thrown", async () => {
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath + '_readonly'
                },
                depContext: {
                    type: "hana",
                    data: {
                        resourceTag: "tag-not-found:"
                    },
                    displayName: "bookshop-hdi-container"
                }
            };
            fs.chmodSync(bindContext.envPath.fsPath, 0o444);
            try {
                await utils.removeResourceFromEnv(bindContext);
                fail("test should fail here");
            } catch (e) {
                // ...
            }
        });

        it("ok:: remove resource when it is not tagged", async () => {
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "xsuaa"
                }
            };
            await utils.removeResourceFromEnv(bindContext);
            const envPropertiesAfterChange = PropertiesReader(envFilePath);
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include("xsuaa");
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include('"instance_name":"hdi-test-instance"');
        });

        it("ok:: remove resource when it is not tagged by wrong type", async () => {
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "_xsuaa"
                }
            };
            await utils.removeResourceFromEnv(bindContext);
            assert.deepEqual(PropertiesReader(envFilePath).get(utils.ENV_VCAP_RESOURCES), vcapServicesObjBeforeChange);
        });

        it("ok:: remove resource when it has a tag", async () => {
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "hana",
                    data: {
                        resourceTag: "mta-resource-name:",
                        resourceName: "bookshop-hdi-container"
                    },
                    displayName: "bookshop-hdi-container"
                }
            };
            await utils.removeResourceFromEnv(bindContext);
            const envPropertiesAfterChange = PropertiesReader(envFilePath);
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hdi-test-instance"');
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("xsuaa");
        });

        it("ok:: remove resource when it has a tag, resource type has more then 1 instance (e.g. two dependencies bound to different instances)", async () => {
            let envPropertiesAfterChange;
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "hanatest",
                    data: {
                        resourceTag: "mta-resource-name:",
                        resourceName: "hana1-mta"
                    },
                    displayName: "hana1-mta"
                }
            };
            await utils.removeResourceFromEnv(bindContext);
            envPropertiesAfterChange = PropertiesReader(envFilePath);
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("hanatest");
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include('"instance_name":"hana-2"');
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-1"');

            // Another remove should remove this key completely and not leave an empty array
            const bindContext2: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "hanatest",
                    data: {
                        resourceTag: "mta-resource-name:",
                        resourceName: "hana2-mta"
                    },
                    displayName: "hana2-mta"
                }
            };
            await utils.removeResourceFromEnv(bindContext2);
            envPropertiesAfterChange = PropertiesReader(envFilePath);
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include("hanatest");
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-2"');
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.not.include('"instance_name":"hana-1"');
        });

        it("ok:: remove resource when it has a tag but it has not been found", async () => {
            const bindContext: any = {
                envPath: {
                    fsPath: envFilePath
                },
                depContext: {
                    type: "hana",
                    data: {
                        resourceTag: "tag-not-found:"
                    },
                    displayName: "bookshop-hdi-container"
                }
            };
            await utils.removeResourceFromEnv(bindContext);
            const envPropertiesAfterChange = PropertiesReader(envFilePath);
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include('"instance_name":"hdi-test-instance"');
            expect(envPropertiesAfterChange.get(utils.ENV_VCAP_RESOURCES)).to.include("xsuaa");
        });
    });

    describe("API for creation service", () => {
        const plan = 'application';
        it("generateParams4Service - xsuaa, plan - application", () => {
            const data = utils.generateParams4Service("xsuaa", plan);
            expect(_.startsWith(data.xsappname, 'xsuaa_')).to.be.true;
            expect(data['tenant-mode']).to.be.equal("dedicated");
            expect(_.size(data['oauth2-configuration']['redirect-uris'])).to.be.equal(1);
        });

        it("generateParams4Service - xsuaa, plan - other", () => {
            assert.deepEqual(utils.generateParams4Service("xsauu", 'other'), {});
        });

        it("validateParams - other : valid", () => {
            expect(utils.validateParams('other')('{ "key" : "value" }')).to.be.undefined;
        });

        it("validateParams - other : incorrect", () => {
            expect(_.size(utils.validateParams('other')('{ "key" :: "value" }'))).to.be.gt(1);
        });

        it("validateParams - xsuaa : valid", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            expect(utils.validateParams('xsuaa', plan)(stringify(xsuaaData))).to.be.undefined;
        });

        it("validateParams - xsuaa : invalid xsappname", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            xsuaaData.xsappname = 'xs.ass_345';
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : padded xsappname", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            xsuaaData.xsappname = '   ';
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : missing xsappname", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            delete xsuaaData.xsappname;
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : long xsappname", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            xsuaaData.xsappname = _.repeat('x', 103);
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : invalid tenant-mode", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            xsuaaData["tenant-mode"] = 'lite';
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : invalid redirect-uris", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            xsuaaData["oauth2-configuration"]["redirect-uris"] = ["localhost://*", "localhos://*"];
            expect(_.size(utils.validateParams('xsuaa', plan)(stringify(xsuaaData)))).to.be.gt(1);
        });

        it("validateParams - xsuaa : missing redirect-uris", () => {
            const xsuaaData = utils.generateParams4Service('xsuaa', plan);
            delete xsuaaData["oauth2-configuration"]["redirect-uris"];
            expect(utils.validateParams('xsuaa', plan)(stringify(xsuaaData))).to.be.undefined;
        });
    });

    describe("suite for getAllServiceInstances", () => {

        const services: ServiceInstanceInfo[] = [{ label: 's1', serviceName: 'hana', plan: 's-plan-1', plan_guid: 's-plan-guid-1' }, { label: 's1', serviceName: 'hana', plan: 's-plan-2', plan_guid: 's-plan-guid-2' }];
        const ups = [{ label: 'ups1', serviceName: 'user-provided-service', credentials: { tags: ['monodb', 'hana'] } }, { label: 'ups2', serviceName: 'user-provided-service', credentials: { tags: ['david'] } }];

        it("ok:: there are both kind of services", async () => {
            sandbox.stub(cfLocal, 'cfGetManagedServiceInstances').resolves(services);
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getAllServiceInstances({ ups: { isShow: true } }), _.concat(services, ups));
        });

        it("ok:: contain 'managed' and 'ups' filtered services", async () => {
            sandbox.stub(cfLocal, 'cfGetManagedServiceInstances').resolves(services);
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getAllServiceInstances({ ups: { tag: '/.*dav.*/' } }), _.concat(services, ups[1]));
        });

        it("ok:: ups services are not required", async () => {
            sandbox.stub(cfLocal, 'cfGetManagedServiceInstances').resolves(services);
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getAllServiceInstances(), services);
        });

        it("ok:: there are ups filtered services", async () => {
            const opts = {
                query: {
                    filters: [{ key: eFilters.broker_catalog_ids, value: 'test' }, { key: eFilters.space_guids, value: 'testSpace' }]
                },
                ups: { tag: 'monodb' }
            };
            const expectedQuery = _.cloneDeep(opts.query);
            expectedQuery.filters = [{ key: eFilters.space_guids, value: 'testSpace' }];
            sandbox.stub(cfLocal, 'cfGetManagedServiceInstances').resolves(services);
            sandbox.stub(cfLocal, 'cfGetUpsInstances').withArgs(expectedQuery).resolves(ups);
            assert.deepEqual(await utils.getAllServiceInstances(opts), _.concat(services, ups[0]));
        });
    });

    describe("getUpsServiceInstances", () => {
        const ups = [
            { label: 'ups1', serviceName: 'user-provided-service', credentials: { tags: ['monodb', 'hana'] } },
            { label: 'ups2', serviceName: 'user-provided-service', credentials: { tags: ['david'] } },
            { label: 'ups3', serviceName: 'user-provided-service', credentials: { tags: 'hana' } },
            { label: 'wrong-credential-tags', serviceName: 'user-provided-service', credentials: { tags: 2 } },
            { label: 'wrong-credential-tags2', serviceName: 'user-provided-service', credentials: { tags: [2, { data: 'hana' }] } },
            { label: 'wrong-credential', serviceName: 'user-provided-service' }
        ];

        it("ok:: get all user provides services, tags not specified", async () => {
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getUpsServiceInstances(), ups);
        });

        it("ok:: get all user provides services filtered by credential tag", async () => {
            const options = { credentials: { tag: "hana" } };
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getUpsServiceInstances(options), [ups[0], ups[2]]);
        });

        it("ok:: get all user provides services filtered by credential tag as regex expression", async () => {
            const options = { credentials: { tag: "/.*mono|vid.*/" } };
            sandbox.stub(cfLocal, 'cfGetUpsInstances').resolves(ups);
            assert.deepEqual(await utils.getUpsServiceInstances(options), [ups[0], ups[1]]);
        });
    });

    const UTF8 = "utf8";
    const EOL = require('os').EOL;
    const GITIGNORE = ".gitignore";

    describe("updateGitIgnoreList suite", () => {

        const project = { uri: nsVsMock.testVscode.Uri.file(path.resolve("myProject")) };
        const ignorePattern = new nsVsMock.testVscode.RelativePattern(project, GITIGNORE);
        const gitIgnoreFile = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/${GITIGNORE}`));

        it("ok:: '.env' pattern added", async () => {
            const gitIgnoreContent = _.join(["     # empty line"], EOL);
            const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
            vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
            vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
            fsExtraMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, UTF8).resolves(gitIgnoreContent);
            const patterns = _.split(gitIgnoreContent, EOL);
            const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
            fsExtraMock.expects("writeFile").withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 }).resolves();
            await utils.updateGitIgnoreList(testEnv.fsPath);
        });

        it("ok:: '.env' pattern not added - already exists", async () => {
            const gitIgnoreContent = _.join(["     # empty line", "subFolder/.env"], EOL);
            const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
            vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
            vscodeWorkspaceMock.expects("findFiles").exactly(2).returns([testEnv]);
            fsExtraMock.expects("readFile").resolves(gitIgnoreContent);
            fsExtraMock.expects("writeFile").never();
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
            fsExtraMock.expects("createFileSync").withExactArgs(path.resolve(gitIgnoreFile.fsPath)).returns(undefined);
            fsExtraMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, UTF8).resolves(gitIgnoreContent);
            const patterns = _.split(gitIgnoreContent, EOL);
            const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
            fsExtraMock.expects("writeFile").withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 }).resolves();
            await utils.updateGitIgnoreList(testEnv.fsPath);
        });

        it("fail:: '.env' pattern NOT added, .gitIgnore file not exist, creation failed", async () => {
            const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
            vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
            vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([]);
            fsExtraMock.expects("createFileSync").withExactArgs(path.resolve(gitIgnoreFile.fsPath)).throws(new Error("access denied"));
            await utils.updateGitIgnoreList(testEnv.fsPath);
        });

        it("fail:: '.env' pattern NOT added, writeFile failed", async () => {
            const gitIgnoreContent = _.join(["     # empty line"], EOL);
            const testEnv = nsVsMock.testVscode.Uri.file(path.resolve(`${project.uri.fsPath}/subFolder/.env`));
            vscodeWorkspaceMock.expects("getWorkspaceFolder").returns(project);
            vscodeWorkspaceMock.expects("findFiles").withExactArgs(ignorePattern).returns([gitIgnoreFile]);
            fsExtraMock.expects("readFile").withExactArgs(gitIgnoreFile.fsPath, UTF8).resolves(gitIgnoreContent);
            const patterns = _.split(gitIgnoreContent, EOL);
            const expectedPatterns = _.join(_.concat(patterns, [`# auto generated wildcard`, "subFolder/.env"]), EOL);
            fsExtraMock.expects("writeFile").withExactArgs(gitIgnoreFile.fsPath, expectedPatterns, { encoding: UTF8 }).throws(new Error("access denied"));
            await utils.updateGitIgnoreList(testEnv.fsPath);
        });
    });
});
