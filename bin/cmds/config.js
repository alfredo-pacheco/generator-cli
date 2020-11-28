exports.command = 'config <resource>';
exports.desc = 'configure your CLI';

exports.builder = function (yargs) {
  yargs.demandCommand(1).strict();
  return yargs.commandDir('config_cmds')
}
exports.handler = function (argv) {}