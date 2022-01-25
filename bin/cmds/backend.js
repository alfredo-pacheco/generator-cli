const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'backend [app]';
exports.desc = 'generates backend';
exports.aliases = ['b'];

exports.builder = {};

exports.handler = function (argv) {
  const { forceMode, currentApp } = getConfigFileContent();
  const force = new Boolean(argv.force || argv.f || forceMode);
  const app = argv.app || currentApp;

  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  post('/Generator/RunBackend', {
    ApplicationName: app,
    force
  })
    .then(() => {
      if (app) console.log(`[${app}] Backend generated.`);
      else console.log('All Backends for all outdated Applications generated.');
    })
    .catch(console.error);
};
