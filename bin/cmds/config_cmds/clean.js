const { cleanConfigFile } = requireFromRoot('configFileController');

exports.command = 'clean';
exports.desc = 'clean the CLI config';
exports.builder = {};
exports.handler = function (argv) {
  cleanConfigFile();
};
