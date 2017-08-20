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
describe('request class', () => {
    it('should list the locations', (done) => {
        chai.request(server)
            .get('/api/v1/class/location')
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

    it('should list the rural locations', (done) => {
        chai.request(server)
            .get('/api/v1/class/rural_location')
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

    it('should list the education level', (done) => {
        chai.request(server)
            .get('/api/v1/class/education_level_mod')
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

    it('should list the education level short', (done) => {
        chai.request(server)
            .get('/api/v1/class/education_level_short')
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

    it('should list the administrative dependencies', (done) => {
        chai.request(server)
            .get('/api/v1/class/adm_dependency_detailed')
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

    it('should list the administrative dependencies detailed', (done) => {
        chai.request(server)
            .get('/api/v1/class/adm_dependency')
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

    it('should list the periods', (done) => {
        chai.request(server)
            .get('/api/v1/class/period')
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

    it('should list class', (done) => {
        chai.request(server)
            .get('/api/v1/class')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list class with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/class?filter=state:41')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list class with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/class?dims=region,state,adm_dependency,location&filter=region:1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('adm_dependency_name');
                res.body.result[0].should.have.property('location_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list class with invalid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/class?dims=foo,bar')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list class with valid dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/class?dims=region,state,education_level_mod,school,period&filter=min_year:2015,max_year:2015,city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('school_name');
                res.body.result[0].should.have.property('education_level_mod_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list class with dimension rural_location', (done) => {
        chai.request(server)
            .get('/api/v1/class?dims=rural_location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('rural_location_name');
                done();
            });
    });

    it('should list enrollment with dimension education_level_short', (done) => {
        chai.request(server)
            .get('/api/v1/class?dims=education_level_short')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_level_short_name');
                done();
            });
    });
});
