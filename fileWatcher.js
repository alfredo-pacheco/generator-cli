const fs = require('fs');
const path = require('path');
const command = require('./runCommand');
const { getConfigFileContent } = requireFromRoot('configFileController');

function startWatching(appName) {
  let { applicationsPath } = getConfigFileContent();
  let fsWait = false;
  if (applicationsPath.substr(-1) === '/') {
    applicationsPath = applicationsPath.substr(0, applicationsPath.length - 1);
  }
  const folderWatched = `${applicationsPath}/${appName}/definition`;
  console.log(`Watching for file changes on folder ${folderWatched}`);
  fs.watch(folderWatched, (options = { recursive: true }), (event, filename) => {
    if (filename && event === 'change') {
      if (fsWait) return;
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 100);
      const file = path.parse(filename);
      const { dir, name } = { ...file };
      console.log(`file ${name} on folder ${dir} was changed`);
      if (!dir) return;
      const option = dir.split('')[0];
      const commandToRun = `${option} ${name}`;
      console.log(`command`, commandToRun);
      const result = command(commandToRun);
      console.log(`result`, result);
    }
  });
}

module.exports = { startWatching };
