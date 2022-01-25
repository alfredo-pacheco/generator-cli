#!/usr/bin/env node

if (!process.env.TESTING_GENERATOR_CLI) {
  global.requireFromRoot = moduleName => require(`${__dirname}/${moduleName}`);
  global.runCommand = require('../runCommand');
}

const { getConfigFileContent } = require('./configFileController');

let yargs = require('yargs');

if (getConfigFileContent.force) {
  console.log('Force: true');
}

function main(commands) {
  yargs(commands).wrap(100).usage('$0 <cmd> [args]').commandDir('cmds').demandCommand(1).strict().help().argv;
}

if (!process.env.TESTING_GENERATOR_CLI) {
  main(process.argv.slice(2));
}

module.exports = main;
