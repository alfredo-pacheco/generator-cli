const { cleanConfigFile } = requireFromRoot('config_file_controller')

exports.command = 'clean'
exports.desc = 'clean the config file'
exports.builder = {}
exports.handler = function (argv) {
    cleanConfigFile()
}