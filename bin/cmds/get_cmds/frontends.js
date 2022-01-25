const { getConfigFileContent } = requireFromRoot('configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'frontends [app]';
exports.desc = 'display existing frontends for a given application';
exports.aliases = ['f'];

exports.builder = function (yargs) {
  const { currentApp } = getConfigFileContent();

  yargs.positional('app', {
    describe: 'the app name',
    type: 'string',
    default: currentApp
  });
};
exports.handler = function (argv) {
  const { app } = argv;
  if (!app) return console.log('ups, app name is not defined and is needed (check config app)...');

  get(`/Generator/GetFrontendsInApplication/${app}`).then(frontends => {
    try {
      console.log(
        frontends.map(f => {
          let front = { ...f };
          delete front.EntryState;
          delete front.yaml;
          return front;
        })
      );
      console.log('All frontends:', frontends.map(a => a.Name).join());
    } catch (e) {
      console.error(e);
    }
  });
};
