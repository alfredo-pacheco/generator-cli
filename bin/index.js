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
const fs = require('fs');
const configPath = require('os').homedir() + '/generator.cli.config.json';

let config = {};
let configFileContent = fs.readFileSync(configPath);
if (configFileContent) {
  config = JSON.parse(configFileContent);
}

function runCommand(first, second, third, fourth) {
  let app;
  const command = first;

  switch (command) {
    case 'config':
      switch (second) {
        case 'app':
          config.currentApp = third;
          fs.writeFile(configPath, JSON.stringify(config, null, 2), function(err) {
            if (err) {
              console.error('Error: ', err);
              return;
            }
            console.log(`[${third}] Application configured as default.`);
          });
          break;
        case 'frontend':
          config.currentFrontend = third;
          fs.writeFile(configPath, JSON.stringify(config, null, 2), function(err) {
            if (err) {
              console.error('Error: ', err);
              return;
            }
            console.log(`[${third}] Frontend configured as default.`);
          });
          break;
        case 'clear':
          fs.writeFile(configPath, JSON.stringify({}, null, 2), function(err) {
            if (err) {
              console.error('Error: ', err);
              return;
            }
            console.log('Configuration cleared.');
          });
          break;
        default:
          console.log(config);
          break;
      }

      break;
    case 'get':
    case 'ls':
      switch (second) {
        case 'apps':
        case 'a':
          get(`Generator/GetApplications`).then(apps => {
            console.log(apps.map(a => a.Name).join('\n'));
          });
          break;
        case 'djson':
          app = third || config.currentApp;
          if (app)
            get(`Generator/GetApplicationDJSON/${app}`).then(djson => {
              console.log(JSON.stringify(djson, null, 3));
            });
          else console.error('Application Name required');
          break;
        case 'c':
        case 'components':
          app = third || config.currentApp;
          if (app)
            get(`Generator/GetComponentsInApplication/${app}`).then(components => {
              console.log(components.map(a => a.Name).join('\n'));
            });
          else console.error('Application Name required');
          break;
        case 'e':
        case 'entities':
          app = third || config.currentApp;
          if (app)
            get(`Generator/GetEntitiesInApplication/${app}`).then(entities => {
              console.log(entities.map(a => a.Name).join('\n'));
            });
          else console.error('Application Name required');
          break;
        case 'f':
        case 'frontends':
          app = third || config.currentApp;
          if (app)
            get(`Generator/GetFrontendsInApplication/${app}`).then(frontends => {
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
          app = third || config.currentApp;
          frontend = fourth || config.currentFrontend;
          if (app && frontend)
            get(`Generator/GetPagesInApplicationAndFrontend/${app}/${frontend}`).then(pages => {
              console.log(pages);
            });
          else console.error('Application Name and Frontend Name required');
          break;
      }
      break;
    case 'create':
    case 'new':
    case 'n':
      switch (second) {
        case 'app':
        case 'a':
          post('/Application', {
            Name: third,
            GeneratorId: 1
          })
            .then(() => {
              console.log(`[${third}] Application created.`);
              runCommand('config', 'app', third);
              runCommand('a', third);
            })
            .catch(err => console.error(err));
          break;
        case 'entity':
        case 'e':
          app = fourth || config.currentApp;
          post('/Application/CreateEntity', {
            Name: third,
            Application: app
          })
            .then(() => {
              console.log(`[${third}] Entity created.`);
              runCommand('e', third);
            })
            .catch(ex => console.error(ex));
          break;
        case 'frontend':
        case 'f':
          app = fourth || config.currentApp;
          post('/Application/CreateFrontend', {
            Name: third,
            Application: app
          })
            .then(() => {
              console.log(`[${third}] Frontend created.`);
              runCommand('f', third);
            })
            .catch(ex => console.log(ex));
          break;
        case 'component':
        case 'c':
          app = fourth || config.currentApp;
          post('/Application/CreateComponent', {
            Name: third,
            Application: app
          })
            .then(() => {
              console.log('Done');
              runCommand(`[${third}] Component created`);
            })
            .catch(ex => console.error(ex));
          break;
        default:
          console.log(`Create resource. Invalid Param: [${second}]. Available: entity (e), frontend (f), component (c)`);
          break;
      }
      break;
    case 'backend':
    case 'b':
      post('/Generator/RunBackend')
        .then(() => console.log('All Backends of all enabled Applications generated.'))
        .catch(err => console.error(err));
      break;
    case 'frontend':
    case 'f':
      post(`/Generator/RunFrontend`)
        .then(() => console.log('All Frontends of all enabled Applications generated.'))
        .catch(err => console.error(err));
      break;
    case 'entity':
    case 'e':
      app = third || config.currentApp;
      if (second && app) {
        post(`/Generator/RunEntity/${app}/${second}`)
          .then(() => console.log(`[${second}] Entity generated of application: [${app}]`))
          .catch(err => console.error(err));
      } else console.log(`Entity Name and Application Name required.`);
      break;
    case 'component':
    case 'c':
      app = third || config.currentApp;
      if (second && app) {
        post(`/Generator/RunComponent/${app}/${second}`)
          .then(() => console.log(`[${second}] Component generated of application: [${app}]`))
          .catch(err => console.error('err'));
      } else console.error(`Invalid parameters.`);
      break;
    case 'app':
    case 'a':
      app = second || config.currentApp;
      if (app) {
        post(`/Generator/RunApplication/${app}`)
          .then(() => console.log(`[${app}] Application generated.`))
          .catch(err => console.error(err));
      } else console.error(`Invalid application name.`);
      break;
    case 'pages':
    case 'p':
      app = second || config.currentApp;
      frontend = third || config.currentFrontend;
      if (app && frontend) {
        post(`/Generator/RunPages/${app}/${frontend}`)
          .then(() => console.log(`[${frontend}] Frontend generated of Application: [${app}]`))
          .catch(err => console.error(err));
      } else console.error(`Application Name and Frontend Name are required.`);
      break;
    default:
      console.log(`Display Help.`);
  }
}

runCommand(args._[0], args._[1], args._[2], args._[3], args._[4]);
