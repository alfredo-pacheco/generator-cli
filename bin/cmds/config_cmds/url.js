const { updateConfigFile } = requireFromRoot('configFileController');

exports.command = 'url <value>';
exports.desc = 'url for generator to use from CLI';
exports.builder = yargs => yargs.default('value', 'true');
exports.handler = function (argv) {
  let { value: url } = argv;

  if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1);
  }

  updateConfigFile({ GeneratorURL: url });
  console.log(runCommand('config show'));
};
