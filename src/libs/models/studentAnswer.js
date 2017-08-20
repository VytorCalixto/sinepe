const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;
const Answer = require(`${libs}/models/answer`);
const User = require(`${libs}/models/user`);
const Question = require(`${libs}/models/question`);

// set up a mongoose model
var StudentAnswer = new Schema({
    answerType: {
        type: String,
        enum: ['multiple-choice', 'open'],
        required: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'É obrigatório identificar o estudante']
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    correctAnswer: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('StudentAnswer', StudentAnswer);
