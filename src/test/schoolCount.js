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

describe('request schools count', () => {
    it('should list the locations', (done) => {
        chai.request(server)
            .get('/api/v1/school/location')
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
            .get('/api/v1/school/adm_dependency')
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
            .get('/api/v1/school/adm_dependency_detailed')
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

    it('should list the government agreement', (done) => {
        chai.request(server)
            .get('/api/v1/school/government_agreement')
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

    it('should list the agreement', (done) => {
        chai.request(server)
            .get('/api/v1/school/agreement')
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

    it('should list the education day care child', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_day_care_child')
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

    it('should list the education preschool child', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_preschool_child')
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

    it('should list the education begin elementary school', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_begin_elementary_school')
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

    it('should list the education middle school', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_middle_school')
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

    it('should list the education professional', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_professional')
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

    it('should list the education eja', (done) => {
        chai.request(server)
            .get('/api/v1/school/education_eja')
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

    it('should list school with valid dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=location,adm_dependency,government_agreement')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('location_name');
                res.body.result[0].should.have.property('adm_dependency_name');
                res.body.result[0].should.have.property('government_agreement_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with valid dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=region,state&filter=min_year:2015,max_year:2016,city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with no argument dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/school/count')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with valid dimensions and filters of states', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=state,education_professional,education_eja&filter=min_year:2015,max_year:2016')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('education_professional_name');
                res.body.result[0].should.have.property('education_eja_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with valid dimensions and filters of states', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=state&filter=min_year:2015,max_year:2016')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with valid dimensions and filters of states that have no toilet inside building', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=state&filter=min_year:2015,max_year:2016,education_begin_elementary_school:0')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with valid dimensions and filters of states with energy and water', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=state&filter=min_year:2015,max_year:2016,government_agreement:1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list school with dimension rural_location', (done) => {
        chai.request(server)
            .get('/api/v1/school/count?dims=location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('location_name');
                done();
            });
    });
});
