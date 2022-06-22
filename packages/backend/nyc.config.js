const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 83,
  lines: 79,
  functions: 74,
  statements: 79,
  include: ["**/src/**"],
  exclude: ["**/src/run-configuration-*", "**/src/sql-tools.ts", "**/src/logger/logger-wrapper.ts", "**/usage/*.ts"],
});
