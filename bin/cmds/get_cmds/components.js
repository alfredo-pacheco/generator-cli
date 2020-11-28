
const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'components [app]';
exports.desc = 'display existing components for a given application';
exports.aliases = ['c'];

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

    get(`/Generator/GetComponentsInApplication/${app}`).then(components => {
        try {
            console.log(components.map(a => a.Name).join('\n'));
        }catch(e){
            console.error(e);
        }
    });
}