const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'entity <name> [app]';
exports.desc = 'inspect entity for a given application';
exports.aliases = ['e'];

exports.builder = function (yargs) {
  const { currentApp } = getConfigFileContent();

  yargs.positional('name', {
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
  const { name, app } = argv;

  if (!name) return console.log('ups, entity name is not defined and is needed...');
  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  get(`/Generator/InspectEntity/${app}/${name}`).then(djson => {
    try {
      console.log(JSON.stringify(djson, null, 2));
    } catch (e) {
      console.error(e);
    }
  });
};
