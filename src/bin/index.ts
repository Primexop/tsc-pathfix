#! /usr/bin/env node
import { Option, program } from 'commander';
import { replaceTscAliasPaths } from '..';
import { notifyUpdates } from '../utils';

const { version } = require('../../package.json');

program
  .name('tsc-path-fix')
  .version(version)
  .option('-p, --project <file>', 'path to tsconfig.json')
  .option('-w, --watch', 'Observe file changes')
  .option(
    '--outDir, --dir <dir>',
    'Run in a folder leaving the "outDir" of the tsconfig.json (relative path to tsconfig)'
  )
  .option(
    '-f, --resolve-full-paths',
    'Attempt to fully resolve import paths if the corresponding .js file can be found'
  )
  .addOption(
    new Option(
      '-fe, --resolve-full-extension [ext]',
      'Specify the extension of incomplete import paths, works with resolveFullPaths'
    )
      .choices(['.js', '.mjs', '.cjs'])
      .default('.js')
  )
  .option(
    '-s, --silent',
    'Reduced terminal output (default: true) [deprecated]'
  )
  .option('-v, --verbose', 'Additional information is send to the terminal')
  .option('--debug', 'Debug information is send to the terminal')
  .option('-r, --replacer <replacers...>', 'path to optional extra replacer')
  .option('--inputGlob <glob>', 'Overwrite glob used for file scanning')
  .option(
    '--outputCheck <extensions...>',
    'Overwrite file extensions used for path resolution'
  )
  .option(
    '--progress [boolean]',
    'Show progress bar for long-running operations (default: true)',
    true
  )
  .parseAsync(process.argv);

const options = program.opts();

// Make the function async to properly await the replaceTscAliasPaths completion
(async () => {
  // Wait for replaceTscAliasPaths to complete
  await replaceTscAliasPaths({
    resolveFullExtension: options.resolveFullExtension,
    configFile: options.project,
    watch: !!options.watch,
    outDir: options.dir,
    verbose: !!options.verbose,
    debug: !!options.debug,
    resolveFullPaths: !!options.resolveFullPaths,
    replacers: options.replacer,
    showProgress: options.progress !== 'false' && !!options.progress,
    fileExtensions: {
      inputGlob: options.inputGlob,
      outputCheck: options.outputCheck
    }
  });

  // Only check for updates after replaceTscAliasPaths has completed
  notifyUpdates(true, true);
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
