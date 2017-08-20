const express = require('express');

const userApp = express.Router();

const libs = `${process.cwd()}/libs`;

const log = require(`${libs}/log`)(module);

const User = require(`${libs}/models/user`);

userApp.get('/', (req, res, next) => {
    User.find((err, users) => {
        if(err) {
            log.error(err);
            return next(err);
        }
        let resArray = [];
        users.forEach((user) => {
            let u = user.toObject();
            delete u.salt;
            delete u.hashedPassword;
            resArray.push(u);
        });
        res.json(resArray); 
    })
});

userApp.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            log.error(err);
            return next(err);
        }
        let u = user.toObject();
        delete u.salt;
        delete u.hashedPassword;
        res.json(u); 
    })
});

userApp.post('/', (req, res, next) => {
    let user = new User({
        email: req.body.email || undefined,
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin || false,
        teacher: req.body.teacher || false,
        student: req.body.student || false,
        parent: req.body.parent || false,
        year: req.body.user,
        children: []
    });

    user.save((err) => {
        if(err) {
            log.error(err);
            return next(err);
        }
        
        let u = user.toObject();
        delete u.salt;
        delete u.hashedPassword;
        res.json(u);
    });
});

userApp.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username}, (err, user) => {
        if(err) {
            log.error(err);
            return next(err);
        }

        if(!user || !user.checkPassword(password)) {
            log.error('user not found');
            return next({message: 'Usuário/Senha incorretos'});
        } else {
            let u = user.toObject();
            delete u.salt;
            delete u.hashedPassword;
            return res.json(u);
        }
    });
});

module.exports = userApp;