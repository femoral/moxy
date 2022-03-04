import { homedir } from "os";

import { mkdir } from "shelljs";

export const configureLocalStorage = () => {
  const configPath = `${homedir()}/.moxy`;
  const collectionsPath = `${configPath}/collections`;

  mkdir("-p", collectionsPath);
  return {
    configPath,
    collectionsPath
  };
};
