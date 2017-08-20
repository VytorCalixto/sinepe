const express = require('express');

const topicApp = express.Router();

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const User = require(`${libs}/models/user`);

const Topic = require(`${libs}/models/topic`);

topicApp.get('/', (req, res, next) => {
    Topic.find((err, topics) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(topics);
    })
});

topicApp.get('/:id', (req, res, next) => {
    Topic.findById(req.params.id, (err, topic) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(topic);
    })
});

topicApp.get('/tree/:id', (req, res, next) => {
    Topic.findById(req.params.id)
    .populate('dependencies')
    .exec((err, topic) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(topic);
    })
});

topicApp.post('/', (req, res, next) => {
    let ratingQuestion = new RatingQuestion({
        question: req.body.question
    });

    ratingQuestion.save((err) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(topic);
    });
});

module.exports = topicApp;