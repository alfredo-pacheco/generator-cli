
const { updateConfigFile } = requireFromRoot('config_file_controller')
const { setURL } = requireFromRoot('../http');

exports.command = 'url <value>'
exports.desc = 'define the <url> for the project'
exports.builder = (yargs) => yargs.default('value', 'true')
exports.handler = function (argv) {
    const {value:url} = argv;
    updateConfigFile({GeneratorURL: url})
    setURL(url)
}