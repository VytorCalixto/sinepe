const express = require('express');

const ratingApp = express.Router();

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const User = require(`${libs}/models/user`);

const Rating = require(`${libs}/models/teacherRating`);

ratingApp.get('/', (req, res, next) => {
    Rating.find((err, ratings) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(ratings);
    })
});

ratingApp.get('/:id', (req, res, next) => {
    Rating.findById(req.params.id, (err, rating) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        if(!rating) {
            return next({message: 'Avaliação não encontrada.'});
        }

        res.json(rating);
    })
});

ratingApp.get('/teacher/:id', (req, res, next) => {
    Rating.find({teacher: req.params.id}, (err, ratings) => {
        if(err) {
            log.error(err);
            return next(err);
        }
        let total = 0.0;
        ratings.forEach((rating) => {
            total += rating;
        });
        total = total / ratings.length;
        res.json({ratings, total});
    });
});

ratingApp.get('/student/:id', (req, res, next) => {
    Rating.find({student: req.params.id}, (err, ratings) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(ratings);
    });
});

ratingApp.post('/', (req, res, next) => {
    let rating = new Rating({
        rating: req.body.rating,
        description: req.body.description || '',
        teacher: req.body.teacher,
        student: req.body.student,
        question: req.body.question
    });

    rating.save((err) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(rating);
    });
});

ratingApp.get('/question/:id', (req, res, next) => {
    Rating.find({question: req.params.id}, (err, ratings) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        res.json(ratings);
    });
});

module.exports = ratingApp;