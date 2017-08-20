const mongoose = require('mongoose');
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;
const User = require(`${libs}/models/user`);

// set up a mongoose model
var Class = new Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Class', Class);
