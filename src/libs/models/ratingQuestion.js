const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;

// set up a mongoose model
var RatingQuestion = new Schema({
    question: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RatingQuestion', RatingQuestion);
