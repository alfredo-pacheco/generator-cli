const { getConfigFileContent } = requireFromRoot('configFileController')
const { post } = requireFromRoot('../http');

exports.command = 'component <componentName> [app]';
exports.desc = 'generates existing component';
exports.aliases = ['c'];

exports.builder = {};

exports.handler = function (argv) {

    const {forceMode, currentApp} = getConfigFileContent();
    const force = new Boolean(argv.force || argv.f || forceMode);
    const app = argv.app || currentApp;

    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');
      
    post(`/Generator/RunComponent/${app}/${argv.componentName}`, {
      force
    })
    .then(() => console.log(`[${argv.componentName}] Component generated for Application: [${app}]`))
    .catch(console.error);
      
}