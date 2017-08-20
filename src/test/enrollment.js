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
describe('request enrollments', () => {
    it('should list the year range', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/year_range')
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

    it('should list the locations', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/location')
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
            .get('/api/v1/enrollment/rural_location')
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

    it('should list the school year', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/school_year')
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
            .get('/api/v1/enrollment/education_level')
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

    it('should list the education level mod', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/education_level_mod')
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
            .get('/api/v1/enrollment/education_level_short')
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
            .get('/api/v1/enrollment/adm_dependency')
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
            .get('/api/v1/enrollment/adm_dependency_detailed')
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

    it('should list genders', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/gender')
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

    it('should list the ethnic groups', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/ethnic_group')
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
            .get('/api/v1/enrollment/period')
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

    it('should list the integral time', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/integral_time')
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

    it('should list enrollments', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment')
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

    it('should list enrollments with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?filter=min_year:2014,state:41')
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

    it('should list enrollments with invalid filters', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?filter=foo:2010,bar:41')
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

    it('should list enrollments with invalid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=foo,bar')
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

    it('should list enrollments with multivalue filter and single value filter', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?filter=region:[1,2],min_year:2015')
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

    it('should list enrollments with valid dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=region,state,school_year,school,gender,period&filter=min_year:2015,max_year:2015,city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('school_name');
                res.body.result[0].should.have.property('school_year_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list enrollment with dimension location', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('location_name');
                done();
            });
    });

    it('should list enrollment with dimension rural_location', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=rural_location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('rural_location_name');
                done();
            });
    });

    it('should list enrollment with dimension school year', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=school_year')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('school_year_name');
                done();
            });
    });

    it('should list enrollment with dimension education_level', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=education_level')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_level_name');
                done();
            });
    });

    it('should list enrollment with dimension education_level_mod', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=education_level_mod')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_level_mod_name');
                done();
            });
    });

    it('should list enrollment with dimension education_level_short', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=education_level_short')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_level_short_name');
                done();
            });
    });

    it('should list enrollment with dimension adm_dependency', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=adm_dependency')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_name');
                done();
            });
    });

    it('should list enrollment with dimension adm_dependency_detailed', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=adm_dependency_detailed')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_detailed_name');
                done();
            });
    });

    it('should list enrollment with dimension gender', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=gender')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('gender_name');
                done();
            });
    });

    it('should list enrollment with dimension ethnic_group', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=ethnic_group')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('ethnic_group_name');
                done();
            });
    });

    it('should list enrollment with dimension period', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=period')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('period_name');
                done();
            });
    });

    it('should list enrollment with dimension integral_time', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment?dims=integral_time')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('integral_time_name');
                done();
            });
    });

    it('should list enrollments offer projection', (done) => {
        chai.request(server)
            .get('/api/v1/enrollment/offer_projection')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('daytime');
                res.body.result.should.have.property('nightly');
                res.body.result.should.have.property('offerYear');
                res.body.result.should.have.property('years');
                res.body.result.years.should.be.a('array');
                done();
            });
    });

});
