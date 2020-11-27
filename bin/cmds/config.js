exports.command = 'config <resource>'
exports.desc = 'configure specific resource'
exports.builder = function (yargs) {
  return yargs.commandDir('config_cmds')
}
exports.handler = function (argv) {}