import * as _ from "lodash";
import { getModuleLogger } from "./logger/logger-wrapper";
import { readEnvResources, toText, TPROPERTIES, writeEnvResources } from "./utils";

const LOGGER_MODULE = "chisel";

//Chisel fields array
enum ChiselKeys {
  CHISEL_URL = "CHISEL_URL",
  CHISEL_USER = "CHISEL_USER",
  CHISEL_PASSWORD = "CHISEL_PASSWORD",
  TUNNEL_PARAM = "TUNNEL_PARAM",
}

function getEnvProperties(filePath: string): TPROPERTIES | void {
  try {
    return readEnvResources(filePath);
  }
  catch (e) {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
    getModuleLogger(LOGGER_MODULE).error(
      "checkAndCreateChiselTask: propertiesReader : environment file is broken or not exists",
      { filePath: filePath },
      { exception: toText(new Error(e?.message as string)) }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkAndCreateChiselTask(filePath: string, name: string): any | undefined {
  const envProperties = getEnvProperties(filePath);
  if (envProperties) {
    const chiselUrl = envProperties[ChiselKeys.CHISEL_URL];
    if (_.isEmpty(chiselUrl)) {
      getModuleLogger(LOGGER_MODULE).debug("checkAndCreateChiselTask: empty chisel_url", { filePath: filePath });
      return undefined;
    }
    getModuleLogger(LOGGER_MODULE).debug(
      "checkAndCreateChiselTask: chisel task <%s> composed",
      `openChiselTunnerFor-${name}`,
      { filePath: filePath }
    );
    return {
      label: `openChiselTunnerFor-${name}`,
      type: "shell",
      command: "chisel",
      isBackground: true,
      problemMatcher: "$chisel-client",
      args: [
        "client",
        "--auth",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${envProperties[ChiselKeys.CHISEL_USER]}:${envProperties[ChiselKeys.CHISEL_PASSWORD]}`,
        chiselUrl,
        envProperties[ChiselKeys.TUNNEL_PARAM],
      ],
    };
  }
}

function dropChiselProperties(propObj: any): Record<string, string> {
  const properties: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.keys(propObj).forEach((key) => {
    if (!(Object as any).values(ChiselKeys).includes(key)) {
      const value = propObj[key];
      if (!_.isEmpty(value)) {
        properties[key] = value;
      }
    }
  });
  return properties;
}

export function deleteChiselParamsFromFile(filePath: string): boolean {
  const envProperties = getEnvProperties(filePath);
  if (!envProperties) {
    return false;
  }
  const chiselUrl = envProperties[ChiselKeys.CHISEL_URL];
  if (_.isEmpty(chiselUrl)) {
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    writeEnvResources(filePath, dropChiselProperties(envProperties));
    getModuleLogger(LOGGER_MODULE).debug(
      `deleteChiselParamsFromFile: override the paramters to ${filePath} file without chisel parameters`
    );
    return true;
  } catch (err) {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
    getModuleLogger(
      LOGGER_MODULE
    ).error(
      `deleteChiselParamsFromFile: failed to override the paramters to ${filePath} file without chisel parameters`,
      { exception: toText(new Error(err?.message as string)) }
    );
    return false;
  }
}
