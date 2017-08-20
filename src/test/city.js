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

chai.use(chaiHttp);


describe('request cities', () => {
    it('should list all cities', (done) => {
        chai.request(server)
            .get('/api/v1/city')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });

    it('should list a city by id', (done) => {
        chai.request(server)
            .get('/api/v1/city?filter=id:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });

    it('should list all cities from a state', (done) => {
        chai.request(server)
            .get('/api/v1/city?filter=state:41')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('name');
                done();
            })
    })

    it('should search for Curitiba', (done) => {
        chai.request(server)
            .get('/api/v1/city?search=name:curitiba')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });
});
