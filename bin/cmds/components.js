const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'components [app] [frontend]';
exports.desc = 'generates all components for an application';
exports.aliases = ['cs'];
exports.builder = {};

exports.handler = function (argv) {
  const { forceMode, currentApp, currentFrontend } = getConfigFileContent();

  const force = new Boolean(argv.force || argv.f || forceMode);
  const app = argv.app || currentApp;
  const frontend = argv.frontend || currentFrontend;

  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');
  if (!frontend) return console.log('ups, frontend name is not defined and is needed (check config frontend)...');

  post(`/Generator/RunComponents/${app}/${frontend}`, {
    force
  })
    .then(() => console.log(`[${frontend}] All Components generated for Application: [${app}]`))
    .catch(console.error);
};
