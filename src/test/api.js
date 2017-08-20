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

describe('API is running', () => {
    it('should respond it\'s running', (done) => {
        chai.request(server)
            .get('/api/v1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('msg');
                done();
            })
    });

    it('should respond with 404 error', (done) => {
        chai.request(server)
            .get('/api/v1/thisrouteshouldgivea404')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.have.property('error');
                done();
            })
    });
});
