const baseNycConfig = require("../../nyc.config");

module.exports = Object.assign(baseNycConfig, {
  branches: 83,
  functions: 50,
  lines: 89,
  statements: 89,
  include: ["**/src/**/*.js", "**/src/**/*.vue"],
  exclude: ["**/test/**", "**/src/styles/**", "**/src/directives/**", "**/src/main.js"],
  // https://github.com/vuejs/vue-cli/issues/1363#issuecomment-609913867
  extension: [".js", ".vue"],
  instrument: true,
  sourceMap: false,
});
