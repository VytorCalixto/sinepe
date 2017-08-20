const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;
const Question = require(`${libs}/models/question`);

// set up a mongoose model
var Answer = new Schema({
    description: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
});

module.exports = mongoose.model('Answer', Answer);
