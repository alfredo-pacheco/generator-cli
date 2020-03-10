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
const third = args._[2] || null;
const fourth = args._[3] || null;

// console.log(JSON.stringify(args, null, 3))
// console.log(command, name)

switch (command) {
  case 'get':
  case 'ls':
    switch (name) {
      case 'apps':
      case 'a':
        get(`Generator/GetApplications`).then(apps => {
          console.log(apps.map(a => a.Name).join('\n'));
        });
        break;
      case 'djson':
        if (third)
          get(`Generator/GetApplicationDJSON/${third}`).then(djson => {
            console.log(JSON.stringify(djson, null, 3));
          });
        else console.error('Application Name required');
        break;
      case 'c':
      case 'components':
        if (third)
          get(`Generator/GetComponentsInApplication/${third}`).then(components => {
            console.log(components.map(a => a.Name).join('\n'));
          });
        else console.error('Application Name required');
        break;
      case 'e':
      case 'entities':
        if (third)
          get(`Generator/GetEntitiesInApplication/${third}`).then(entities => {
            console.log(entities.map(a => a.Name).join('\n'));
          });
        else console.error('Application Name required');
        break;
      case 'f':
      case 'frontends':
        if (third)
          get(`Generator/GetFrontendsInApplication/${third}`).then(frontends => {
            console.log(
              frontends.map(f => {
                let front = { ...f };
                delete front.EntryState;
                delete front.yaml;
                return front;
              })
            );
            console.log('All frontends:', frontends.map(a => a.Name).join());
          });
        else console.error('Application Name required');
        break;
      case 'p':
      case 'pages':
        if (third && fourth)
          get(`Generator/GetPagesInApplicationAndFrontend/${third}/${fourth}`).then(pages => {
            console.log(pages);
          });
        else console.error('Application Name and Frontend Name required');
        break;
    }
    break;
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
    if (name && third) {
      post(`/Generator/RunEntity/${third}/${name}`)
        .then(response => {
          console.log('Done');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(`Entity Name and Application Name required.`);
    }
    break;
  case 'component':
  case 'c':
    if (name && third) {
      post(`/Generator/RunComponent/${third}/${name}`)
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
  case 'pages':
  case 'p':
    if (name && third) {
      post(`/Generator/RunPages/${name}/${third}`)
        .then(response => {
          console.log('Done.');
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      console.error(`Application Name and Frontend Name are required.`);
    }
    break;
  default:
    console.log(`Display Help.`);
}
