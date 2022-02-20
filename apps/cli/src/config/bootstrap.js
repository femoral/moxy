const { staticContentResolver } = require("./static-content-resolver");
const { configureLocalStorage } = require("./configure-local-storage");
const { makeUploadChanges } = require("../git");
const {
  childPort,
  debounce,
  port,
  skipOpen,
  git: { pushInterval, privateKey, remote },
  enableHealth,
} = require("./args");
const { default: moxy } = require("moxy-js-server");

const oneMinuteInMilliseconds = 60000;

module.exports = {
  bootstrap: async () => {
    const { collectionsPath, configPath } = configureLocalStorage();

    const { commit, push } = remote
      ? await makeUploadChanges({
          collectionsPath,
          remote: remote,
          key: privateKey,
        })
      : { commit: () => {}, push: () => {} };

    const { childController, moxyApiRouter } = moxy({
      childPort,
      configPath: configPath,
      debounceTime: debounce,
      onChange: commit,
    });

    if (remote) {
      setInterval(async () => {
        await push("Periodic commit: " + new Date().toUTCString());
      }, pushInterval * oneMinuteInMilliseconds);
    }

    return {
      commit,
      childController,
      moxyApiRouter,
      collectionsPath,
      configPath,
      port,
      skipOpen,
      enableHealth,
      staticContentPath: staticContentResolver(),
    };
  },
};
