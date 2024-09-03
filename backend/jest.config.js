export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    globals: {
      "ts-jest": {
        isolatedModules: true,
      },
    },

  };
  