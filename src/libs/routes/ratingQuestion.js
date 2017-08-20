const express = require('express');

const ratingQuestionApp = express.Router();

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const User = require(`${libs}/models/user`);

const RatingQuestion = require(`${libs}/models/ratingQuestion`);

ratingQuestionApp.get('/', (req, res, next) => {
    RatingQuestion.find((err, ratings) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(ratings);
    })
});

ratingQuestionApp.get('/:id', (req, res, next) => {
    RatingQuestion.findById(req.params.id, (err, rating) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(rating);
    })
});

ratingQuestionApp.post('/', (req, res, next) => {
    let ratingQuestion = new RatingQuestion({
        question: req.body.question
    });

    ratingQuestion.save((err) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(ratingQuestion);
    });
});

module.exports = ratingQuestionApp;