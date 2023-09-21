module.exports = {
  verbose: true,
  testRegex: "(/test/(.*).(test|spec)).[jt]sx?$",
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!<rootDir>/src/utils.js",
    "!<rootDir>/src/exploregens/**",
    "!<rootDir>/src/main.js",
    "!<rootDir>/src/plugins/**",
    "!<rootDir>/src/directives/**",
    "!<rootDir>/src/styles/**",
  ],
  coverageReporters: ["lcov", "html", "text-summary"],
  moduleFileExtensions: ["js", "vue", "json"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(@sap-devx)/)"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
