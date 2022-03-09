import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { resolvePrivateKey } from './private-key-resolver';

const branch = 'master';
const remoteName = 'origin';
const rebaseStrategy = 'ours';
const gitignore = `
.DS_Store
`;

const makeUploadChanges = async ({ remote, key, collectionsPath }: any) => {
  const sshCommand = `ssh -i ${resolvePrivateKey(
    key
  )} -o IdentitiesOnly=yes -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -F /dev/null`;

  const git = simpleGit({
    baseDir: collectionsPath,
    maxConcurrentProcesses: 1,
  }).env('GIT_SSH_COMMAND', sshCommand);

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

  const addGitConfig = async () => {
    console.log(`git: writing local config`);
    await git
      .addConfig('user.name', 'moxyd')
      .addConfig('user.email', 'moxyd@moxy-jsd.org')
      .addConfig('core.sshCommand', sshCommand);
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

  const commit = async (message: any) => {
    await git.add(['-A']);
    await git.commit(message);
  };

  const push = async (message: any) => {
    console.log(`git: pushing changes`);
    await commit(message);

    if (await branchExistOnRemote()) {
      await git.fetch(remoteName, branch);
      console.log(
        `git: rebasing remote changes with strategy ${rebaseStrategy}`
      );
      await git.rebase(['-X', rebaseStrategy, `${remoteName}/${branch}`]);
    }

    await git.push(remoteName, branch);
  };

  await initLocalRepository();
  await addGitConfig();
  await initRemote();
  await push('application startup' + new Date().toUTCString());

  return { push, commit };
};

export { makeUploadChanges };
