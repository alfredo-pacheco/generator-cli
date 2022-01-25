const execSync = require('child_process').execSync;

module.exports = command => {
  const commandWithPath = `${__dirname}/bin/index.js ${command}`;
  const options = { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 };

  return execSync(commandWithPath, options).toString();
};
