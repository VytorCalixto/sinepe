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

describe('request schools', () => {
    it('should list a school by id', (done) => {
        chai.request(server)
            .get('/api/v1/school?filter=id:11000023')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('year');
                //res.body.result[0].should.have.property('nome_entidade');
                done();
            });
    });

    it('should list all schools from a state', (done) => {
        chai.request(server)
            .get('/api/v1/school?filter=state:41')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('year');
                //res.body.result[0].should.have.property('nome_entidade');
                done();
            });
    });

    it('should list all schools from a city', (done) => {
        chai.request(server)
            .get('/api/v1/school?filter=city:4102802')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('year');
                //res.body.result[0].should.have.property('nome_entidade');
                done();
            })
    });

    it('should return 400 with no filters', (done) => {
        chai.request(server)
            .get('/api/v1/school')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('error');
                res.body.error.should.be.equal('Wrong/No filter specified');
                done();
            })
    });
});
