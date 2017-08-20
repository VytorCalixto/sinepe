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


describe('test response', () => {
    it('should list all regions in json', (done) => {
        chai.request(server)
            .get('/api/v1/region')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should list all regions in xml', (done) => {
        chai.request(server)
            .get('/api/v1/region?format=xml')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.xml;
                done();
            });
    });
    it('should list all regions in csv', (done) => {
        chai.request(server)
            .get('/api/v1/region?format=csv')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
