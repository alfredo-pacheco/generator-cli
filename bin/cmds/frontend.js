const { getConfigFileContent } = requireFromRoot('config_file_controller')
const { post } = requireFromRoot('../http');

exports.command = 'frontend [app]'
exports.desc = 'generate frontends'
exports.aliases = ['f']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('frontend_cmds')
}
*/
exports.handler = function (argv) {

    console.log('executing frontend command', argv);

    let config = getConfigFileContent()
    let force = argv.force || argv.f || config.forceMode;
    app = argv.app || config.currentApp;

      post(`/Generator/RunFrontend`, {
        ApplicationName: app,
        force
      })
        .then(() => {
          if (app) console.log(`[${app}] Frontend generated.`);
          else console.log('All Frontends for all outdated Applications generated.');
        })
        .catch(err => console.error(err));
}