
const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'pages [app] [frontend]';
exports.desc = 'display existing pages for a given application and frontend';
exports.aliases = ['p'];

exports.builder = function (yargs) {

    const { currentApp, currentFrontend } = getConfigFileContent();

    yargs.positional('app', {
        describe: 'the app name',
        type: 'string',
        default: currentApp
    });

    yargs.positional('frontend', {
        describe: 'the frontend name',
        type: 'string',
        default: currentFrontend
    });
};
exports.handler = function (argv) {
    
    const { app, frontend } = argv;
    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');
    if (!frontend) return console.log('ups, frontend name is not defined and is needed (check config frontend)...');

    get(`/Generator/GetPagesInApplicationAndFrontend/${app}/${frontend}`).then(pages => {
        console.log(pages);
    });
}
