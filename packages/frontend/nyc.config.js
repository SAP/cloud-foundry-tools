const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 0,
  lines: 0,
  functions: 0,
  statements: 0,
  include: ["**/src/**/*.js", "**/src/**/*.vue"],
  exclude: ["**/test/**"],
  // https://github.com/vuejs/vue-cli/issues/1363#issuecomment-609913867
  extension: [".js", ".vue"],
  instrument: true,
  sourceMap: false,
});
