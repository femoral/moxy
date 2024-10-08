import { staticContentResolver } from './static-content-resolver';

import { configureLocalStorage } from './configure-local-storage';

import { makeUploadChanges } from '../git';

import args from './args';
import moxy from '@moxy-js/api';

const {
  childPort,
  debounce,
  port,
  skipOpen,
  git: { pushInterval, privateKey, remote, config },
  enableHealth,
}: any = args;

const oneMinuteInMilliseconds = 60000;

export const bootstrap = async () => {
  const { collectionsPath, configPath } = configureLocalStorage();

  const { commit, push } = remote
    ? await makeUploadChanges({
        collectionsPath,
        remote,
        key: privateKey,
        config,
      })
    : {
        commit: () => {
          //noop
        },
        push: () => {
          //noop
        },
      };

  const { childController, moxyApiRouter } = moxy({
    childPort,
    configPath: configPath,
    debounceTime: debounce,
    onChange: commit,
  });

  if (remote) {
    setInterval(async () => {
      await push('Periodic commit: ' + new Date().toUTCString());
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
};
