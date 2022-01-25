const { get } = requireFromRoot('../http');

exports.command = 'apps';
exports.desc = 'display existing apps';
exports.aliases = ['a'];
exports.builder = {};
exports.handler = function (argv) {
  get('/Generator/GetApplications').then(apps => {
    try {
      console.log(apps.map(a => a.Name).join('\n'));
    } catch (e) {
      console.error(e);
    }
  });
};
