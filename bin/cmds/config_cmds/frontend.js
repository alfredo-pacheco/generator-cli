const { updateConfigFile } = requireFromRoot('config_file_controller');

exports.command = 'frontend <name>'
exports.desc = 'define the frontend name for the project'
exports.aliases = ['frontend', 'f']
exports.builder = {}
exports.handler = function (argv) {
    const {name} = argv;
    updateConfigFile({currentFrontend: name})
}