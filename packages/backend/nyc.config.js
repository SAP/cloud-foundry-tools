const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 80,
  lines: 77,
  functions: 73,
  statements: 77,
  include: ["**/src/**"],
  exclude: ["**/src/run-configuration-*", "**/src/sql-tools.ts", "**/src/logger/logger-wrapper.ts", "**/usage/*.ts"],
});
