import fs from 'fs';
import path from 'path';

const staticContentResolver = () => {
  const candidatePaths = process.env["WEB_PACKAGE_DIST_PATH"] ?
    [process.env["WEB_PACKAGE_DIST_PATH"]] : require.resolve.paths('@moxy-js/web') || [];

  for (const requirePath of candidatePaths) {
    const candidatePath = path.join(requirePath, process.env["WEB_PACKAGE_ROOT"] || '@moxy-js/web', 'static');
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error('@moxy-js/web could not be resolved');
};

export { staticContentResolver };
