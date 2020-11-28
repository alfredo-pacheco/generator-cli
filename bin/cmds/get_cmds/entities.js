
const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'entities [app]';
exports.desc = 'display existing entities for a given application';
exports.aliases = ['e'];

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

    get(`/Generator/GetEntitiesInApplication/${app}`).then(entities => {
        try {
            console.log(entities.map(a => a.Name).join('\n'));
        }catch(e){
            console.error(e);
        }
        
    });
}
