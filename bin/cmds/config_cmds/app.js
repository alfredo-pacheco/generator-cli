
const { updateConfigFile } = requireFromRoot('config_file_controller')

exports.command = 'app <name>'
exports.desc = 'name for the project'
exports.aliases = ['app', 'a']
exports.builder = {}
exports.handler = function (argv) {
    const {name} = argv;
    updateConfigFile({currentApp: name})
}