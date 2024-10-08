import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';
import { resolvePrivateKey } from './private-key-resolver';

const branch = 'master';
const remoteName = 'origin';
const rebaseStrategy = 'ours';
const gitignore = `
.DS_Store
`;

const makeUploadChanges = async ({
  remote,
  key,
  collectionsPath,
  config = [],
}: {
  remote: string;
  key?: string;
  collectionsPath: string;
  config?: string[];
}) => {
  let git: SimpleGit;
  const baseConfig = ['user.name=moxyd', 'user.email=moxyd@moxy-jsd.org', ...config];

  if (key) {
    const sshCommand = `ssh -i ${resolvePrivateKey(
      key
    )} -o IdentitiesOnly=yes -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -F /dev/null`;

    git = simpleGit({
      baseDir: collectionsPath,
      maxConcurrentProcesses: 1,
      config: [`core.sshCommand=${sshCommand}`, ...baseConfig],
    }).env('GIT_SSH_COMMAND', sshCommand);
  } else {
    git = simpleGit({
      baseDir: collectionsPath,
      maxConcurrentProcesses: 1,
      config: baseConfig,
    });
  }

  const branchExistOnRemote = async () => {
    const branchSummary = await git.branch(['-r']);
    return branchSummary.all.includes(`${remoteName}/${branch}`);
  };

  const initLocalRepository = async () => {
    if (!(await git.checkIsRepo())) {
      console.log(`git: executing init on ${collectionsPath}`);
      await git.init();
      fs.writeFileSync(path.join(collectionsPath, '.gitignore'), gitignore);
    }
  };

  const initRemote = async () => {
    console.log(`git: verifying remote config`);
    const remotes = await git.getRemotes();

    if (remotes.find((element) => element.name === remoteName)) {
      await git.remote(['set-url', remoteName, remote]);
    } else {
      console.log(`git: adding remote ${remoteName} -> ${remote}`);
      await git.addRemote(remoteName, remote);
    }

    await git.fetch();
  };

  const commit = async (message: string) => {
    await git.add(['-A']);
    await git.commit(message);
  };

  const push = async (message: any) => {
    console.log(`git: pushing changes`);
    await commit(message);

    if (await branchExistOnRemote()) {
      await git.fetch(remoteName, branch);
      console.log(`git: rebasing remote changes with strategy ${rebaseStrategy}`);
      await git.rebase(['-X', rebaseStrategy, `${remoteName}/${branch}`]);
    }

    await git.push(remoteName, branch);
  };

  await initLocalRepository();
  await initRemote();
  await push('application startup' + new Date().toUTCString());

  return { push, commit };
};

export { makeUploadChanges };
