const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'gateways [app]';
exports.desc = 'display existing gateways for a given application';
exports.aliases = [];

exports.builder = function (yargs) {
  const { currentApp } = getConfigFileContent();

  yargs.positional('app', {
    describe: 'the app name',
    type: 'string',
    default: currentApp
  });
};
exports.handler = function (argv) {
  const { app } = argv;
  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  get(`/Generator/GetGatewaysInApplication/${app}`).then(gateways => {
    try {
      console.log(gateways.map(a => a.Name).join('\n'));
    } catch (e) {
      console.error(e);
    }
  });
};
