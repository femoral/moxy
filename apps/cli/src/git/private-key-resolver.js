const fs = require("fs");
const { mkdir } = require("shelljs");
const { homedir } = require("os");

const sshUserConfPath = `${homedir()}/.ssh`;
const defaultKeyPath = `${sshUserConfPath}moxy_id_rsa`;
const base64EncodedPrefix = "encoded:";

const resolvePrivateKey = (privateKey) => {
  if (privateKey ? privateKey.startsWith(base64EncodedPrefix) : undefined) {
    mkdir("-p", sshUserConfPath);
    const keyBuffer = Buffer.from(
      privateKey.substring(base64EncodedPrefix.length),
      "base64"
    );
    fs.writeFileSync(defaultKeyPath, keyBuffer, { mode: parseInt("0600", 8) });

    return defaultKeyPath;
  } else if (fs.existsSync(privateKey) && fs.statSync(privateKey).isFile()) {
    return privateKey;
  } else {
    throw new Error("Git: Invalid private key provided");
  }
};

module.exports = {
  resolvePrivateKey,
};
