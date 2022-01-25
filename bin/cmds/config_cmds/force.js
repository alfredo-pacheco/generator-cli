const { updateConfigFile, getConfigFileContent } = requireFromRoot('configFileController');

exports.command = 'force';
exports.desc = 'toggles whether to overwrite generated resources';
exports.aliases = ['f'];
exports.builder = {};
exports.handler = function () {
  // false by default
  let { forceMode = false } = getConfigFileContent();

  // toggles the force parameter
  forceMode = !forceMode;

  updateConfigFile({ forceMode });
  console.log(`[Force Mode] toggled to ${forceMode}`);
};
