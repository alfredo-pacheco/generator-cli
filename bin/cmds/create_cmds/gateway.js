const { post } = requireFromRoot('../http');
const { getConfigFileContent } = requireFromRoot('configFileController');

exports.command = 'gateway <name> <entityName> [app]';
exports.desc = 'create a new gateway for a given application';
exports.aliases = ['d'];

exports.builder = function (yargs) {
  const { currentApp } = getConfigFileContent();

  yargs.positional('name', {
    describe: 'the gateway name',
    type: 'string'
  });
  yargs.positional('entityName', {
    describe: 'the entity name',
    type: 'string'
  });
  yargs.positional('app', {
    describe: 'the app name',
    type: 'string',
    default: currentApp
  });
};
exports.handler = function (argv) {
  const { name, entityName, app } = argv;

  if (!name) return console.log('ups, gateway name is not defined and is needed...');
  if (!entityName) return console.log('ups, entity name is not defined and is needed...');
  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  post('/Application/CreateGateway', {
    Name: name,
    Entity: entityName,
    Application: app
  })
    .then(() => {
      console.log(`[${name}] gateway created.`);
      runCommand(`gateway ${name}`);
    })
    .catch(console.error);
};
