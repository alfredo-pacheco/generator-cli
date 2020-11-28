
const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'djson [app]';
exports.desc = 'get complete definition for a given application';
exports.aliases = ['definition'];

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

    get(`/Generator/GetApplicationDJSON/${app}`).then(djson => {
        try {
            console.log(JSON.stringify(djson, null, 3));
        }catch(e){
            console.error(e);
        }
        
    });

}