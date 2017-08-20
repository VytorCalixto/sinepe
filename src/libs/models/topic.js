const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;

// set up a mongoose model
var Topic = new Schema({
    description: {
        type: String,
        required: true
    },
    dependencies: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

module.exports = mongoose.model('Topic', Topic);
