const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');

exports.command = 'page [app] [frontend]'
exports.desc = 'configure specific resource'
exports.aliases = ['p']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('page_cmds')
}
*/
exports.handler = function (argv) {
    console.log('executing page command', argv);

    let config = getConfigFileContent()
    let force = argv.force || argv.f || config.forceMode;
    app = argv.app || config.currentApp;
    frontend = argv.frontend || config.currentFrontend;

      if (!app || !frontend) {
        console.error(`Application Name and Frontend Name are required.`);
        return;
      }
        post(`/Generator/RunPages/${app}/${frontend}`, {
          force
        })
          .then(() => console.log(`[${frontend}] All Pages generated for Application: [${app}]`))
          .catch(err => console.error(err));
}