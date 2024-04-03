Per avviare correttamente i test dei components per il frontend:
1. Nel tsconfig.json utilizzare "jsx": "react-jsx";
2. Nel jest.config.json utilizzare testEnvironment: 'jsdom' e setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/src/tests/setupTests.ts'].