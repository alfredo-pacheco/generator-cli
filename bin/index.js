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
      })
      .catch(err => {
        console.log('err');
        console.log(err);
      });
    break;
  case 'frontend':
  case 'f':
    post(`/Generator/RunFrontend`)
      .then(response => {
        console.log('Done.');
      })
      .catch(err => {
        console.log('err');
        console.log(err);
      });
    break;
  case 'entity':
  case 'e':
    console.log(`entity ${name}`);
    break;
  case 'component':
  case 'c':
    const appName = args._[2] || null;
    if (name && appName) {
      post(`/Generator/RunComponent/${appName}/${name}`)
        .then(response => {
          console.log('Done.');
        })
        .catch(err => {
          console.log('err');
          console.log(err);
        });
    } else {
      console.log(`Invalid parameters.`);
    }
    break;
  case 'cache':
  case 'clearCache':
    get(`/Generator/ClearCache`)
      .then(response => {
        console.log('Done.');
      })
      .catch(err => {
        console.log('err');
        console.log(err);
      });
    break;
  case 'app':
  case 'a':
    if (name) {
      post(`/Generator/RunApplication/${name}`)
        .then(response => {
          console.log('Done.');
        })
        .catch(err => {
          console.log('err');
          console.log(err);
        });
    } else {
      console.log(`Invalid application name.`);
    }
    break;
  default:
    console.log(`Display Help.`);
}
