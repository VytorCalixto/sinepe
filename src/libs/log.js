const libs = `${process.cwd()}/libs`;
const config = require(`${libs}/config`);

const winston = require('winston');

winston.emitErrs = true;

function getFilePath(module) {
    // using filename in log statements
    return module.filename.split('/').slice(-2).join('/');
}

function logger(module) {
    const logPath = `${process.cwd()}/logs`;
    const maxLogFiles = 5;
    const maxLogSize = 5242880;
    const log = new winston.Logger({
        transports: [
            new winston.transports.File({
                name: 'info-log',
                level: 'info',
                filename: `${logPath}/simcaq-info.log`,
                handleException: true,
                json: false,
                maxSize: maxLogSize, // 5MB
                maxFiles: maxLogFiles,
                colorize: false,
            }),
            new winston.transports.File({
                name: 'error-log',
                level: 'error',
                filename: `${logPath}/simcaq-error.log`,
                handleException: true,
                json: false,
                maxSize: maxLogSize, // 5MB
                maxFiles: maxLogFiles,
                colorize: false,
            }),
            new winston.transports.Console({
                name: 'debug-log',
                level: (process.env.NODE_ENV === 'development') ? 'debug' : 'error',
                label: getFilePath(module),
                handleException: true,
                json: false,
                colorize: true,
            }),
        ],
        exitOnError: false,
    });
    if (!config.debug) {
        log.remove('debug-log');
    }
    return log;
}

module.exports = logger;
