const express = require('express');

const api = express();

const libs = `${process.cwd()}/libs`;

const config = require(`${libs}/config`);

const cache = require('apicache').options({ debug: config.debug, statusCodes: {include: [200]} }).middleware;

const user = require(`${libs}/routes/user`);

const rating = require(`${libs}/routes/rating`);

const ratingQuestion = require(`${libs}/routes/ratingQuestion`);

const topic = require(`${libs}/routes/topic`);

const studentExam = require(`${libs}/routes/studentExam`);

api.get('/', (req, res) => {
    res.json({ msg: 'API is running' });
});

api.use('/user', user);
api.use('/rating', rating);
api.use('/ratingQuestion', ratingQuestion);
api.use('/topic', topic);
api.use('/studentExam', studentExam);


module.exports = api;
