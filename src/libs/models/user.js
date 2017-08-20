const mongoose = require('mongoose');
const crypto = require('crypto')
const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const Schema = mongoose.Schema;

// set up a mongoose model
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'O campo Usuário é obrigatório.']
    },
    name: {
        type: String,
        required: [true, 'O campo Nome é obrigatório']
    },
    hashedPassword: {
        type: String,
        required: [true, 'O campo Senha é obrigatório.']
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: undefined
    },
    admin: {
        type: Boolean,
        default: false
    },
    teacher: {
        type: Boolean,
        default: false
    },
    student: {
        type: Boolean,
        default: false
    },
    parent: {
        type: Boolean,
        default: false
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    year: {
        type: String
    }

});

UserSchema.methods.encryptPassword = function(password) {
    return crypto.pbkdf2Sync(password + '', this.salt + '', 10000, 512, 'sha512');
};

UserSchema.virtual('password').set(function(password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(128).toString('hex');
    this.hashedPassword = this.encryptPassword(password).toString('hex');
}).get(function() {
    return this._plainPassword;
});

UserSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password).toString('hex') === this.hashedPassword;
}


module.exports = mongoose.model('User', UserSchema);
