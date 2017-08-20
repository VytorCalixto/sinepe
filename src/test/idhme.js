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
describe('request idhme', () => {
    it('should list the year range', (done) => {
        chai.request(server)
            .get('/api/v1/idhme/year_range')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('start_year');
                res.body.result[0].should.have.property('end_year');
                done();
            });
    });

    it('should list the available years', (done) => {
        chai.request(server)
            .get('/api/v1/idhme/years')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list idhme with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/idhme?filter=min_year:2000,state:41')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                res.body.result[0].should.have.property('state_id');
                done();
            });
    });

    it('should list idhme with invalid filters', (done) => {
        chai.request(server)
            .get('/api/v1/idhme?filter=foo:2010,bar:41')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('error');
                res.body.error.should.be.equal('Wrong/No filter specified');
                done();
            });
    });

    it('should list idhme with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/idhme?dims=state&filter=min_year:2010')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                res.body.result[0].should.have.property('state_id');
                res.body.result[0].should.have.property('state_name');
                done();
            });
    });

    it('should list idhme with valid filters and dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/idhme?filter=state:41,min_year:2010&dims=city')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                res.body.result[0].should.have.property('city_id');
                res.body.result[0].should.have.property('city_name');
                done();
            });
    });

    it('should return 400 with no filters', (done) => {
        chai.request(server)
            .get('/api/v1/idhme')
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('error');
                res.body.error.should.be.equal('Wrong/No filter specified');
                done();
            });
    });

});
