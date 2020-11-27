const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');

exports.command = 'entity <entityName> [app]'
exports.desc = 'Create entity'
exports.aliases = ['e']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('entity_cmds')
}
*/
exports.handler = function (argv) {
    console.log('executing entity command', argv);
    let config = getConfigFileContent()
    let force = argv.force || argv.f || config.forceMode;
    app = argv.app || config.currentApp;
    if(!app){
      console.log("Application Name Required after entityName")
      return;
    } 

    post(`/Generator/RunEntity/${app}/${argv.entityName}`, {
      force
    })
      .then(() => console.log(`[${second}] Entity generated for Application: [${app}]`))
      .catch(err => console.error(err));  
}