module.exports = {
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
    '.interface.ts',
    '.module.ts',
  ],
  coverageReporters: ['cobertura', 'lcov', 'text', 'text-summary'],
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  preset: 'ts-jest',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }],
  ],
  rootDir: "src",
  setupFiles: ['.././test/tests-setup.ts'],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testEnvironment: "node"
};
