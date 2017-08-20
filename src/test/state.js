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


describe('request states', () => {
    it('should list all states', (done) => {
        chai.request(server)
            .get('/api/v1/state')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('region_id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });

    it('should list a state by id', (done) => {
        chai.request(server)
            .get('/api/v1/state?filter=id:11')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result.should.have.length(1);
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('region_id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });

    it('should list states by region id', (done) => {
        chai.request(server)
            .get('/api/v1/state?filter=region:1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('region_id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });

    it('should search for Paraná', (done) => {
        chai.request(server)
            .get('/api/v1/state?search=name:paran')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result.should.have.length(1);
                res.body.result[0].should.have.property('id');
                res.body.result[0].should.have.property('region_id');
                res.body.result[0].should.have.property('name');
                done();
            });
    });
});
