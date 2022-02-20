const fs = require("fs");
const path = require("path");

const staticContentResolver = () => {
  for (const requirePath of require.resolve.paths("moxy-js-spa")) {
    const candidatePath = path.join(requirePath, "moxy-js-spa", "build");
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error("moxy-js-spa could not be resolved");
};

module.exports = {
  staticContentResolver,
};
