const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;
const User = require(`${libs}/models/user`);
const RatingQuestion = require(`${libs}/models/ratingQuestion`);

// set up a mongoose model
var Rating = new Schema({
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'RatingQuestion',
        required: true
    }
});

module.exports = mongoose.model('Rating', Rating);
