#!/usr/bin/env node

(function () {
  const path = require('path');
  const { CLIEngine } = require('eslint');
  const { ArgumentParser } = require('argparse');

  // Load package config
  const packageConfig = path.resolve(__dirname, '../package.json');
  const packageInfo = require(packageConfig);

  // Configure arguments
  const parser = new ArgumentParser({
    version: packageInfo.version,
    description: packageInfo.description,
  });
  parser.addArgument(['--paths'], {
    help: 'Define search paths, comma separated. Default "src/"',
    defaultValue: 'src/',
  });

  // Check arguments
  const args = parser.parseArgs();

  // Resolve paths to the calling directory
  args.paths = args.paths.split(',')
    .map(folderPath => path.resolve(process.cwd(), folderPath));

  console.log(`\x1b[34m ➜ Running ESLint.\x1b[0m`);

  // Load eslint config
  const configPath = path.resolve(__dirname, '../.eslintrc.json');
  const baseConfig = require(configPath);

  // Setup engine
  const cli = new CLIEngine({
    baseConfig,
    extensions: ['.mjs', '.js', '.json'],
  });

  // Lint and report
  const report = cli.executeOnFiles(args.paths);
  const formatter = cli.getFormatter('codeframe');

  if (report.errorCount || report.warningCount) {
    const results = formatter(report.results);
    console.log(`\n${results}`);
    process.exit(1);
  }

  console.log(`\x1b[32m ✔ No ESLint errors.\x1b[0m`);
}());
