const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(`${libs}/config`);
const cache = require('apicache').options({ debug: config.debug }).middleware;

const app = express();

const api = require('./routes/api');

const passport = require('passport');

const mongoose = require(`${libs}/db/mongoose`);

const db = mongoose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(methodOverride());

app.use((req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});
// Mounts all API routes under /api/v1
app.use('/api/v1', api);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404);
    log.error('%s %d %s', req.method, res.statusCode, req.url);
    res.json({ error: 'Error 404: Page not found' }).end();
});

// Express' default error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    log.error(err);
    res.json({ error: err.message }).end();
});

module.exports = app;
