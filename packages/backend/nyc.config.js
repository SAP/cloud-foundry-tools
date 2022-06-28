const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 79,
  lines: 75,
  functions: 72,
  statements: 75,
  include: ["**/src/**"],
  exclude: ["**/src/run-configuration-*", "**/src/sql-tools.ts", "**/src/logger/logger-wrapper.ts", "**/usage/*.ts"],
});
