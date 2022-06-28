module.exports = {
  reporter: ["text", "lcov"],
  "check-coverage": true,
  all: true,
  // To enable **merged** coverage report all relevant file extensions must be listed.
  extension: [".js", ".ts", ".vue"],
};
