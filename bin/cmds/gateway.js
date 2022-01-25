const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'gateway <gatewayName> [app]';
exports.desc = 'generates existing gateway';
exports.aliases = ['d'];
exports.builder = {};

exports.handler = function (argv) {
  const { forceMode, currentApp } = getConfigFileContent();

  const force = new Boolean(argv.force || argv.f || forceMode);
  const app = argv.app || currentApp;

  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  post(`/Generator/RunGateway/${app}/${argv.gatewayName}`, {
    force
  })
    .then(() => console.log(`[${argv.gatewayName}] Gateway generated for Application: [${app}]`))
    .catch(console.error);
};
