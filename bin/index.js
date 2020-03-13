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

const command = args._[0];
const first = command;
const name = args._[1] || null;
const second = name;
const third = args._[2] || null;
const fourth = args._[3] || null;

let config = {};
let configFileContent = fs.readFileSync(configPath);
if (configFileContent) {
  config = JSON.parse(configFileContent);
}

let app;

switch (command) {
  case 'config':
    switch (second) {
      case 'app':
        config.currentApp = third;
        fs.writeFile(configPath, JSON.stringify(config, null, 2), function(err) {
          if (err) {
            console.log('Error: ', err);
            return;
          }
          console.log('App saved.');
        });
        break;
      case 'frontend':
        config.currentFrontend = third;
        fs.writeFile(configPath, JSON.stringify(config, null, 2), function(err) {
          if (err) {
            console.log('Error: ', err);
            return;
          }
          console.log('Frontend saved.');
        });
        break;
      case 'clear':
        fs.writeFile(configPath, JSON.stringify({}, null, 2), function(err) {
          if (err) {
            console.log('Error: ', err);
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
    switch (name) {
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
      case 'entity':
      case 'e':
        app = fourth || config.currentApp;
        post('/Application/CreateEntity', {
          Name: third,
          Application: app
        })
          .then(() => {
            console.log('Done');
          })
          .catch(ex => console.log(ex));
        break;
      case 'frontend':
      case 'f':
        app = fourth || config.currentApp;
        post('/Application/CreateFrontend', {
          Name: third,
          Application: app
        })
          .then(() => {
            console.log('Done');
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
          })
          .catch(ex => console.log(ex));
        break;
      default:
        console.log(`Create resource. Invalid Param: [${second}]. Available: entity (e), frontend (f), component (c)`);
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
    app = third || config.currentApp;
    if (name && app) {
      post(`/Generator/RunEntity/${app}/${name}`)
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
    app = third || config.currentApp;
    if (name && app) {
      post(`/Generator/RunComponent/${app}/${name}`)
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
  case 'app':
  case 'a':
    app = name || config.currentApp;
    if (app) {
      post(`/Generator/RunApplication/${app}`)
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
    app = name || config.currentApp;
    frontend = third || config.currentFrontend;
    if (app && frontend) {
      post(`/Generator/RunPages/${app}/${frontend}`)
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
