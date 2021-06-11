// jest.config.ts
var { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Sync object
module.exports = {
  verbose: true,
  preset: "@shelf/jest-mongodb",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
