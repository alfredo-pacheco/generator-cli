
exports.command = 'get <item>'
exports.desc = 'show specific resource'
exports.aliases = ['ls']
exports.builder = function (yargs) {
  return yargs.commandDir('get_cmds')
}
exports.handler = function (argv) {}