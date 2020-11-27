const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');

exports.command = 'component <componentName> [app]'
exports.desc = 'create component'
exports.aliases = ['c']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('component_cmds')
}
*/
exports.handler = function (argv) {
    console.log('executing component command', argv);

    let config = getConfigFileContent()
    let force = argv.force || argv.f || config.forceMode;
    app = argv.app || config.currentApp;

    if(!app){
      console.log("Application Name Required after componentName")
      return;
    } 
      
        post(`/Generator/RunComponent/${app}/${argv.componentName}`, {
          force
        })
          .then(() => console.log(`[${argv.componentName}] Component generated for Application: [${app}]`))
          .catch(err => console.error(err));
      
}