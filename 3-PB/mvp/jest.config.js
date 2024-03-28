module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest',
  },
};