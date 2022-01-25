const { updateConfigFile } = requireFromRoot('configFileController');

exports.command = 'app <name>';
exports.desc = 'set the app to work with from CLI';
exports.aliases = ['app', 'a'];
exports.builder = {};
exports.handler = function (argv) {
  const { name } = argv;
  updateConfigFile({ currentApp: name });
};
