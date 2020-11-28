exports.command = 'create <item>'
exports.desc = 'create a new application resource'
exports.aliases = ['new', 'n']

exports.builder = function (yargs) {
  yargs.demandCommand(1).strict();
  return yargs.commandDir('create_cmds')
}
exports.handler = function (argv) {}