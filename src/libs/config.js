let conf = require(`${process.cwd()}/config.json`);

conf = conf[process.env.NODE_ENV];

module.exports = conf;
