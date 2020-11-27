const { updateConfigFile, getConfigFileContent } = requireFromRoot('config_file_controller')

exports.command = 'force';
exports.desc = 'force to merge';
exports.aliases = ['f'];
exports.builder = {};
exports.handler = function () {
    
    // false by default
    let { forceMode = false } = getConfigFileContent();

    // toggles the force parameter
    forceMode = !forceMode;

    updateConfigFile({forceMode});
}