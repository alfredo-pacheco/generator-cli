const { post } = requireFromRoot('../http');
const { getConfigFileContent } = requireFromRoot('configFileController');

exports.command = 'frontend <name> [app]';
exports.desc = 'create a new frontend for a given application';
exports.aliases = ['f'];

exports.builder = function (yargs) {
  const { currentApp } = getConfigFileContent();

  yargs.positional('name', {
    describe: 'the front name',
    type: 'string'
  });
  yargs.positional('app', {
    describe: 'the app name',
    type: 'string',
    default: currentApp
  });
};
exports.handler = function (argv) {
  const { name, app } = argv;

  if (!name) return console.log('ups, entity name is not defined and is needed...');
  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  post('/Application/CreateFrontend', {
    Name: name,
    Application: app
  })
    .then(() => {
      console.log(`[${name}] Frontend created.`);
      console.log(runCommand(`get frontends ${app}`));
    })
    .catch(console.error);
};
