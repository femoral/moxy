import fs from 'fs';
import path from 'path';

const staticContentResolver = () => {
  for (const requirePath of require.resolve.paths('@moxy/web') || []) {
    const candidatePath = path.join(requirePath, process.env["WEB_PACKAGE_ROOT"] || '@moxy/web', 'static');
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error('moxy-js-spa could not be resolved');
};

export { staticContentResolver };
