const { homedir } = require("os");
const { mkdir } = require("shelljs");

module.exports = {
  configureLocalStorage: () => {
    const configPath = `${homedir()}/.moxy`;
    const collectionsPath = `${configPath}/collections`;

    mkdir("-p", collectionsPath);
    return {
      configPath,
      collectionsPath,
    };
  },
};
