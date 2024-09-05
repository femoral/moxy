import fs from 'fs';
import { mkdir } from 'shelljs';
import { homedir } from 'os';
import { join } from 'path';

const dir = homedir().replace(/\//g, '').trim().length > 0 ? homedir() : process.cwd();
const sshUserConfPath = join(dir, '.ssh');
const defaultKeyPath = join(sshUserConfPath, 'moxy_id_rsa');
const base64EncodedPrefix = 'encoded:';

const resolvePrivateKey = (privateKey: any) => {
  if (privateKey ? privateKey.startsWith(base64EncodedPrefix) : undefined) {
    mkdir('-p', sshUserConfPath);
    const keyBuffer = Buffer.from(privateKey.substring(base64EncodedPrefix.length), 'base64');
    fs.writeFileSync(defaultKeyPath, keyBuffer, { mode: parseInt('0600', 8) });

    return defaultKeyPath;
  } else if (fs.existsSync(privateKey) && fs.statSync(privateKey).isFile()) {
    return privateKey;
  } else {
    throw new Error('Git: Invalid private key provided');
  }
};

export { resolvePrivateKey };
