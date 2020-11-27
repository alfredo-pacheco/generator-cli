const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');
exports.command = 'backend [app]'
exports.desc = 'generate backends'
exports.aliases = ['b']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('backend_cmds')
}
*/
exports.handler = function (argv) {
    console.log(argv)
    //console.log('executing backend command', argv);
    let config = getConfigFileContent()
    
    let force = argv.force || argv.f || config.forceMode;

    
    app = argv.app || config.currentApp;
      post('/Generator/RunBackend', {
        ApplicationName: app,
        force
      })
        .then(() => {
          if (app) console.log(`[${app}] Backend generated.`);
          else console.log('All Backends for all outdated Applications generated.');
        })
        .catch(err => console.error(err));
}