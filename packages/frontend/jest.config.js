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
  moduleNameMapper: {
    "^vue$": "<rootDir>/node_modules/vue",
  },
  moduleFileExtensions: ["js", "vue", "json"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(.+)/)"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
