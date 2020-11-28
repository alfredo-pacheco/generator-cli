
const { post } = requireFromRoot('../http');

exports.command = 'app <name>';
exports.desc = 'creates a new application';
exports.aliases = ['a'];

exports.builder = function (yargs) {
    yargs.positional('name', {
        describe: 'the app name',
        type: 'string',
    });
};
exports.handler = function (argv) {
    
    const { name } = argv;
    if (!name) return console.log('ups, app name is not defined and is needed (check config app)...');

    post('/Application', {
        Name: name,
        GeneratorId: 1
      })
    .then(() => {
        console.log(`[${name}] Application created.`);
        runCommand(`config app ${name}`);
        runCommand(`app ${name}`);
    })
    .catch(console.error);
}
