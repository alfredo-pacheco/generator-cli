const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');

exports.command = 'app [app]'
exports.desc = 'configure specific resource'
exports.aliases = ['a']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('app_cmds')
}
*/
exports.handler = function (argv) {
    console.log('executing app command', argv);

    let config = getConfigFileContent()
    let force = argv.force || argv.f || config.forceMode;
    app = argv.app || config.currentApp;

    
    if (!app) {
      console.error(`Application Name Required`);
      return;
    }
      post(`/Generator/RunApplication/${app}`, {
        force
      })
        .then(() => console.log(`[${app}] Application generated.`))
        .catch(err => console.error(err));
    
}