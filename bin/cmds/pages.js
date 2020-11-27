exports.command = 'pages <resource>'
exports.desc = 'configure specific resource'
exports.aliases = ['ps']
/*
exports.builder = function (yargs) {
  return yargs.commandDir('pages_cmds')
}
*/
exports.handler = function (argv) {
    console.log('executing pages command', argv);
    console.log("pending to confirm with Freddy");
}