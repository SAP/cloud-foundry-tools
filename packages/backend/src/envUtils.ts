import * as fs from "fs";
import * as dotenv from "dotenv";

export const ENV_VCAP_RESOURCES = "VCAP_SERVICES";
export type TPROPERTIES = { [name: string]: string };

// TODO : delete this section, just a workaround for consuming the method exactly the same way as if it was used by importing from @sap/bas-sdk
//------------------------------------------------------//
export const envfile = {
    // TODO: this implementation is currently in node. It writes the given envResources in .env file from scratch
    // i.e envResources includes all the exact key value pairs that should be in the .env file at the end.
    writeDotEnvKeyValues: (envFilePath: string, envResources: TPROPERTIES): void => {
      try {
        let text = "";
        Object.keys(envResources).forEach((key) => {
          const value = envResources[key];
          if (value) {
            // TODO - we want to write differently in case key=VCAP_SERVICES?
            text += `${key}=${value.trim()}\n`;
          }
        });
        fs.writeFileSync(envFilePath, text, { encoding: "utf-8" });
      } catch (err) {
        throw new Error(`Could not write to the '.env' file: ${envFilePath}. Error: ${err}`);
      }
    },
    getDotEnvFileKeyValues: (envFilePath: string) => {
      const envFileContent = fs.readFileSync(envFilePath, { encoding: "utf8" });
      return dotenv.parse(envFileContent);
    },
    getVCapServices: (envFilePath: string) => {
      try {
        if (fs.existsSync(envFilePath)) {
          const envProperties = envfile.getDotEnvFileKeyValues(envFilePath);
          const vcapServiceValue: string = envProperties[ENV_VCAP_RESOURCES];
          if (vcapServiceValue) {
            return JSON.parse(vcapServiceValue);
          } else {
            console.log(`The ${envFilePath} file is missing a key '${ENV_VCAP_RESOURCES}'.`);
            return null;
          }
        } else {
          console.log(`The ${envFilePath} file does not exist.`);
          return null;
        }
      } catch (err) {
        throw new Error(`Could not get the '${ENV_VCAP_RESOURCES}' value from '${envFilePath}'. Error: ${err}`);
      }
    },
  };
  