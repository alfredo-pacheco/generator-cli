const { updateConfigFile } = requireFromRoot('configFileController');

exports.command = 'frontend <name>';
exports.desc = 'set the frontend name to work with from CLI';
exports.aliases = ['frontend', 'f'];
exports.builder = {};
exports.handler = function (argv) {
  const { name } = argv;
  updateConfigFile({ currentFrontend: name });
};
