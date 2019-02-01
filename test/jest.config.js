const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  coverageReporters: ['text-summary', 'lcov'],
  coverageDirectory: '<rootDir>/test/coverage',
}
