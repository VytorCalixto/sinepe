const debug = require('debug')('simcaq-api');
const libs = `${process.cwd()}/libs`;
const config = require(`${libs}/config`);
const log = require(`${libs}/log`)(module);
const app = require(`${libs}/app`);
const compatVersion = require(`${libs}/middlewares/checkVersion`);
const cluster = require('cluster');

// Check if Node version is compatible
if (!compatVersion()) {
    process.exit(1);
}

if(cluster.isMaster) {
    log.info(`Master ${process.pid} is running`);

    const numCPUs = require('os').cpus().length;
    log.info(`Master will create ${numCPUs} workers`);
    for(let i=0; i < numCPUs; ++i) {
        cluster.fork();
    }

    // Caso uma instâcia morra
    cluster.on('exit',  (worker, code, signal) => {
        log.info(`Worker ${worker.process.pid} died`);
        // Revive a instância
        cluster.fork();
    });
} else {
    // Set default port: first environment variable PORT, then configuration and last 3000
    app.set('port', process.env.PORT || config.port || 3000);
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    // Set default ip: first environment variable IOP, then configuration and last '127.0.0.1'
    app.set('ip', process.env.IP || config.ip || '127.0.0.1');

    const server = app.listen(app.get('port'), () => {
        log.info(`Express server listening on port ${server.address().port}`);
    });

    log.info(`Worker ${cluster.worker.id} is running (${process.pid})`);

    // For testing
    module.exports = server;
}
