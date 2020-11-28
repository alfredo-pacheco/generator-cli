
exports.command = 'get <item>'
exports.desc = 'display existing application resources'
exports.aliases = ['ls']
exports.builder = function (yargs) {
  yargs.demandCommand(1).strict();
  return yargs.commandDir('get_cmds');
}
exports.handler = function (argv) {}