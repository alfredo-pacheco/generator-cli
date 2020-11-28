const { getConfigFileContent } = requireFromRoot('configFileController')
const { post } = requireFromRoot('../http');

exports.command = 'entity <entityName> [app]'
exports.desc = 'create a new entity'
exports.aliases = ['e']
exports.builder = {};

exports.handler = function (argv) {
    
    const {forceMode, currentApp } = getConfigFileContent();

    const force = new Boolean(argv.force || argv.f || forceMode);
    const app = argv.app || currentApp;
    
    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

    post(`/Generator/RunEntity/${app}/${argv.entityName}`, {
      force
    })
    .then(() => console.log(`[${argv.entityName}] Entity generated for Application: [${app}]`))
    .catch(console.error);  
}