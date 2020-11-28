
const { post } = requireFromRoot('../http');
const { getConfigFileContent } = requireFromRoot('configFileController');


exports.command = 'component <name> [app]';
exports.desc = 'creates a new component for a given application';
exports.aliases = ['c'];

exports.builder = function (yargs) {
    const { currentApp } = getConfigFileContent();

    yargs.positional('name', {
        describe: 'the component name',
        type: 'string',
    });
    yargs.positional('app', {
        describe: 'the app name',
        type: 'string',
        default: currentApp
    });
};
exports.handler = function (argv) {
    
    const { name, app } = argv;
    
    if (!name) return console.log('ups, component name is not defined and is needed...');
    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

    post('/Application/CreateComponent', {
        Name: name,
        Application: app
      })
    .then(() => {
        console.log(`[${name}] component created.`);
        // runCommand(`component ${name}`); // Need to specify Entity and Type first.
    })
    .catch(console.error);
}
