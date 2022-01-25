exports.command = 'inspect <item>';
exports.desc = 'inspect application resource definition';
exports.aliases = ['i'];
exports.builder = function (yargs) {
  yargs.demandCommand(1).strict();
  return yargs.commandDir('inspect_cmds');
};
exports.handler = function (argv) {};
