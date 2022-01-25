const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'app [app]';
exports.desc = 'generates complete application';
exports.aliases = ['a'];

exports.builder = {};

exports.handler = function (argv) {
  const { forceMode, currentApp } = getConfigFileContent();

  const force = new Boolean(argv.force || argv.f || forceMode);
  const app = argv.app || currentApp;

  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  post(`/Generator/RunApplication/${app}`, {
    force
  })
    .then(() => console.log(`[${app}] Application generated.`))
    .catch(console.error);
};
