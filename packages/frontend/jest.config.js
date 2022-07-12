module.exports = {
  verbose: true,
  testRegex: "(/test/(.*).(test|spec)).[jt]sx?$",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!<rootDir>/src/utils.js",
    "!<rootDir>/src/main.js",
  ],
  coverageReporters: ["lcov", "html", "text-summary"],
  moduleFileExtensions: ["js", "vue", "json"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(@sap-devx)/)"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
