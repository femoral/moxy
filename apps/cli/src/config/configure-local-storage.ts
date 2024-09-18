import { homedir } from 'os';
import { join } from 'path';

import { mkdir } from 'shelljs';

export const configureLocalStorage = () => {
  const dir = homedir().replace(/\//g, '').trim().length > 0 ? homedir() : process.cwd();
  const configPath = join(dir, '.moxy');
  const collectionsPath = join(configPath, 'collections');

  mkdir('-p', collectionsPath);
  return {
    configPath,
    collectionsPath,
  };
};
