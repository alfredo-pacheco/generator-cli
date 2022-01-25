const fs = require('fs');
const GENERATOR_CLI_CONFIG = require('os').homedir() + '/generator.cli.config.json';

function getConfigFileContent() {
  let configFileContent = null;

  try {
    fileContent = fs.readFileSync(GENERATOR_CLI_CONFIG);
    configFileContent = JSON.parse(fileContent);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    fs.writeFileSync(GENERATOR_CLI_CONFIG, JSON.stringify({}, null, 2));
    configFileContent = {};
  }

  if (!configFileContent) {
    throw new Error(`ups :( there is something wrong with the config file: ${GENERATOR_CLI_CONFIG}`);
  }

  return configFileContent;
}

function updateConfigFile(moreContent) {
  const configFileContent = getConfigFileContent();

  config = Object.assign(configFileContent, moreContent);
  fs.writeFileSync(GENERATOR_CLI_CONFIG, JSON.stringify(config, null, 2));

  //console.log(GENERATOR_CLI_CONFIG, 'updated')
}

function cleanConfigFile() {
  const configFileContent = getConfigFileContent();

  fs.writeFileSync(GENERATOR_CLI_CONFIG, JSON.stringify({}, null, 2));
}

module.exports = {
  updateConfigFile,
  getConfigFileContent,
  cleanConfigFile
};
