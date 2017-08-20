const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;
const Answer = require(`${libs}/models/answer`);
const Topic = require(`${libs}/models/topic`);

// set up a mongoose model
var Question = new Schema({
    question: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        enum: ['multiple-choice', 'open']
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    correctAnswer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    },
    difficulty: {
        type: String,
        enum: ['low', 'medium', 'hard']
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

module.exports = mongoose.model('Question', Question);
