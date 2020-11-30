const { getConfigFileContent } = requireFromRoot('configFileController')
const { startWatching } = require('../../fileWatcher');

exports.command = 'watch [app]';
exports.desc = 'watches for changes on default app';
exports.aliases = ['w'];

exports.builder = {};

exports.handler = function (argv) {

    const { currentApp} = getConfigFileContent();
    const app = argv.app || currentApp;

    if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');
      
    startWatching(app);
      
}