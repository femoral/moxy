import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

export default yargs(hideBin(process.argv))
  .option(
    'port' as any,
    {
      alias: 'p',
      type: 'number',
      description: 'Port of the main server, where control panel will be served',
      default: 3500,
    } as any
  )
  .option('child-port', {
    alias: 'c',
    type: 'number',
    description: 'Port of the child server, where mocks & proxies will be served',
    default: 3501,
  })
  .option('debounce', {
    alias: 'd',
    type: 'number',
    description: 'Debounce time in milliseconds for child server restarts',
    default: 5000,
  })
  .option('skip-open', {
    alias: 's',
    type: 'boolean',
    description: 'Skip browser launch',
    default: false,
  })
  .option('enable-health', {
    alias: 'h',
    type: 'boolean',
    description: 'Enable health check on /health',
    default: false,
  })
  .option('git', {
    type: 'object',
  } as any)
  .option('git.remote', {
    type: 'string',
    description: 'Remote url of git repository',
  })
  .option('git.private-key', {
    type: 'string',
    description: "Path to private key or base64 encoded private key (with 'encoded:' prefix)",
  })
  .option('git.push-interval', {
    type: 'number',
    description: 'Interval after which changes will be pushed to the remote repository (in minutes)',
    default: 60,
  })
  .check((argv: any) => {
    if (argv.git.remote && !argv.git.privateKey && !argv.git.config) {
      throw new Error('Private key or authorization header provided via --git.private-key or --git.config is required');
    }

    if (argv.git.interval < 1) {
      throw new Error('--git.interval should be greater than 0');
    }

    return true;
  })
  .strictOptions(true)
  .env('MOXY').argv;
