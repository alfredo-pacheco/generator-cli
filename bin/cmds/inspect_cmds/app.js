const { getConfigFileContent } = require('../../configFileController');
const { get } = requireFromRoot('../http');

exports.command = 'app [app]';
exports.desc = 'inspect app';
exports.aliases = ['a'];
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

  get(`/Generator/InspectApplication/${app}`).then(djson => {
    try {
      console.log(JSON.stringify(djson, null, 2));
    } catch (e) {
      console.error(e);
    }
  });
};
