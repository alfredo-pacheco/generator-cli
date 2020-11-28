const { getConfigFileContent } = requireFromRoot('configFileController');
const { post } = requireFromRoot('../http');

exports.command = 'frontends [app]';
exports.desc = 'generate frontends';
exports.aliases = ['f'];
exports.builder = {};
exports.handler = function (argv) {

    const {forceMode, currentApp } = getConfigFileContent();
    const force = new Boolean(argv.force || argv.f || forceMode);
    const app = argv.app || currentApp;

    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

    post(`/Generator/RunFrontend`, {
      ApplicationName: app,
      force
    })
    .then(() => {
      console.log('All Frontends for all outdated Applications generated.');
    })
    .catch(console.error);
}