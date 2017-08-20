const libs = `${process.cwd()}/libs`;

const config = require(`${libs}/config`);

const log = require(`${libs}/log`)(module);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
    // Get mongodb URI (ip and port) in config file
    const mongoUri = process.env.MONGO_URI || config.mongodb.uri;
    log.info(`Connecting to MongoDB on URI ${mongoUri}`);
    // Connection singleton
    const db = mongoose.connect(mongoUri);

    mongoose.connection.once('open', () => { log.info("MongoDB connected"); });

    return db;
};
