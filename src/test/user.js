process.env.NODE_ENV = 'test';

const chai = require('chai');

const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

const chaiXml = require('chai-xml');

chai.use(chaiXml);

const chaiHttp = require('chai-http');

const assert = chai.assert;

const expect = chai.expect;

const should = chai.should(); // actually call the function

const libs = `${process.cwd()}/libs`;

const server = require(`${libs}/app`);

const mongoose = require('../libs/db/mongoose');
//const Simulation = require('../libs/models/simulation');
const User = require('../libs/models/user');

chai.use(chaiHttp);

describe('Saves a user', () => {
    beforeEach(() => {
        User.remove({}, (err) => {
            console.log('Test collection purged')
        });
    });

    it('should save a user', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('msg');
            res.body.msg.should.be.equal('Usuário cadastrado com sucesso!');
            done();
        });
    });

    it('should not save a user without email', (done) => {
        let newUser = {};
        newUser.email = null;
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Email é obrigatório.');
            done();
        });
    });

    it('should not save a user without password', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Senha é obrigatório.');
            done();
        });
    });

    it('should not save a user with invalid email', (done) => {
        let newUser = {};
        newUser.email = 'invalid email';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg.should.be.equal('O email informado é inválido.');
            done();
        });
    });

    it('should not save a user without a name', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Nome é obrigatório.');
            done();
        });
    });

    it('should not save a user without CPF', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo CPF é obrigatório.');
            done();
        });
    });

    it('should not save a user without schooling', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Escolaridade é obrigatório.');
            done();
        });
    });

    it('should not save a user without segment', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Segmento é obrigatório.');
            done();
        });
    });

    it('should not save a user without role', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Função é obrigatório.');
            done();
        });
    });

    it('should not save a user without institution_name', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Instituição em que trabalha é obrigatório.');
            done();
        });
    });

    it('should not save a user without state', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.city = 'Curitiba';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Estado é obrigatório.');
            done();
        });
    });

    it('should not save a user without city', (done) => {
        let newUser = {};
        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'Paraná';

        chai.request(server)
        .post('/api/v1/user/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-apicache-bypass', 'true')
        .send(newUser)
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('msg');
            res.body.msg[0].should.be.equal('O campo Cidade é obrigatório.');
            done();
        });
    });

})

describe('Authenticates a user', () => {

    beforeEach(() => {
        User.remove({}, (err) => {
            console.log('Test collection purged');
        });
    });

    it('should authenticate a user', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({email: 'lorem@ipsum.com',
            password: '123mudar'})
            .end((err, res) => {
                let token;

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('token');
                token = res.body.token;
                token.substr(0, 3).should.equal('JWT');
                done();
            });
        });
    });

    it('should not authenticate a user with wrong password', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({email: 'lorem@ipsum.com',
            password: 'umasenhaerrada'})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('msg');
                res.body.msg[0].should.equal('A Senha informada é inválida.')
                done();
            });
        });
    });

    it('should not authenticate a user with wrong email', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({email: 'dolor@ipsum.com',
            password: '123mudar'})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('msg');
                res.body.msg[0].should.equal('O Email informado não está cadastrado.')
                done();
            });
        });
    });

    it('should not authenticate a user with missing email', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({password: '123mudar'})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('msg');
                res.body.msg.should.equal('O campo Email é obrigatório.')
                done();
            });
        });
    });

    it('should not authenticate a user with missing password', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({email:'lorem@ipsum.com'})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('msg');
                res.body.msg.should.equal('O campo Senha é obrigatório.')
                done();
            });
        });
    });

    it('should not authenticate a user with wrong password', (done) => {
        let newUser = new User();

        newUser.email = 'lorem@ipsum.com';
        newUser.password = '123mudar';
        newUser.name = 'Gute';
        newUser.cpf = '08236017907';
        newUser.schooling = 'Doutorado';
        newUser.course = 'Ciência da Computação';
        newUser.segment = 'Comunidade acadêmica';
        newUser.role = 'Pesquisador';
        newUser.institution_name = 'UFPR';
        newUser.state = 'PR';
        newUser.city = 'Curitiba';

        newUser.save((err) => {
            if (err) {
                console.log('MongoDB error:' + err);
            }
        }).then(function(newuser){
            chai.request(server)
            .post('/api/v1/user/authenticate')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({email:'lorem@ipsum.com', password: '123'})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('msg');
                res.body.msg[0].should.equal('A Senha informada é inválida.')
                done();
            });
        });
    });
});
