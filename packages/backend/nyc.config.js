const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 90.35,
  lines: 96.33,
  functions: 91.86,
  statements: 96.27,
  include: ["**/src/**"],
  exclude: ["**/src/run-configuration-*", "**/src/sql-tools.ts", "**/src/logger/logger-wrapper.ts", "**/usage/*.ts"],
});
