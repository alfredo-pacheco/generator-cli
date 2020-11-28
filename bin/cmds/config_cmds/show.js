
const { getConfigFileContent } = requireFromRoot('configFileController')

exports.command = 'show'
exports.desc = 'display current cli configuration'
exports.aliases = ['display', 's']
exports.builder = {}
exports.handler = function (argv) {
    const config = getConfigFileContent();
    console.log(config)
}