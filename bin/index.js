#!/usr/bin/env node

require('yargs')
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]',
    'welcome ter yargs!',
    yargs => {
      yargs.positional('name', {
        type: 'string',
        default: 'Cambi',
        describe: 'the name to say hello to'
      });
    },
    function(argv) {
      console.log('hello', argv.name, 'welcome to yargs!');
    }
  )
  .help().argv;

const args = require('yargs').argv;
const { get, post } = require('../http');

const command = args._[0];
const name = args._[1] || null;

// console.log(JSON.stringify(args, null, 3))
// console.log(command, name)

switch (command) {
  case 'backend':
  case 'b':
    post('/Generator/RunBackend')
      .then(response => {
        console.log('Done.');
        // console.log(response);
      })
      .catch(err => {
        console.log('err');
        console.log(err);
      });
    break;
  case 'frontend':
  case 'f':
    console.log(`frontend ${name}`);
    break;
  case 'entity':
  case 'e':
    console.log(`entity ${name}`);
    break;
  case 'component':
  case 'c':
    console.log(`component ${name}`);
    break;
  case 'app':
  case 'a':
    console.log(`app ${name}`);
    break;
  default:
    console.log(`default ${name}`);
}
