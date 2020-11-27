
exports.command = 'apps';
exports.desc = 'show the apps';
exports.aliases = ['a'];
exports.builder = {};
exports.handler = function (argv) {
    const {name} = argv;
    updateConfigFile({currentApp: name})
}