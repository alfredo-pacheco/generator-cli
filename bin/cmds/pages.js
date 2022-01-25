const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'pages [app] [frontend]';
exports.desc = 'configure specific resource';
exports.aliases = ['ps'];
exports.builder = {};

exports.handler = function (argv) {
  const { forceMode, currentApp, currentFrontend } = getConfigFileContent();

  const force = new Boolean(argv.force || argv.f || forceMode);
  const app = argv.app || currentApp;
  const frontend = argv.frontend || currentFrontend;

  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');
  if (!frontend) return console.log('ups, frontend name is not defined and is needed (check config frontend)...');

  post(`/Generator/RunPages/${app}/${frontend}`, {
    force
  })
    .then(() => console.log(`[${frontend}] All Pages generated for Application: [${app}]`))
    .catch(console.error);
};
