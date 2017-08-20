const curPath = process.cwd();
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const chalk = require('chalk');
const packageConf = require(`${curPath}/package.json`);

module.exports = () => {
    // Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
    function parseVersionNumber(versionString) {
        return parseFloat(versionString.replace(/[^\d\.]/g, ''));
    }
    // Ensure minimum supported node version is used
    const minNodeVersion = parseVersionNumber(packageConf.engines.node);
    const currentNodeVersion = parseVersionNumber(process.version);
    if (minNodeVersion > currentNodeVersion) {
        log.error(chalk.red(`You must upgrade node to >=${minNodeVersion}.x to use simcaq-node!`));
        return false;
    } else {
        log.info('Node version should work!');
        return true;
    }
};
