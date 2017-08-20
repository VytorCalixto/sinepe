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
describe('request teachers', () => {
    it('should list the year range', (done) => {
        chai.request(server)
            .get('/api/v1/teacher/year_range')
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
            .get('/api/v1/teacher/location')
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
            .get('/api/v1/teacher/rural_location')
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
            .get('/api/v1/teacher/education_level_mod')
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
            .get('/api/v1/teacher/education_level_short')
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

    it('should list the education type', (done) => {
        chai.request(server)
            .get('/api/v1/teacher/education_type')
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
            .get('/api/v1/teacher/adm_dependency')
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
            .get('/api/v1/teacher/adm_dependency_detailed')
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
            .get('/api/v1/teacher/gender')
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
            .get('/api/v1/teacher/ethnic_group')
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


    it('should list teachers count', (done) => {
        chai.request(server)
            .get('/api/v1/teacher')
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

    it('should list teacher count with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?filter=min_year:2014,state:41')
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

    it('should list teacher count with invalid filters', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?filter=foo:2010,bar:41')
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

    it('should list teacher count with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=region,state,adm_dependency,location,gender,ethnic_group')
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

    it('should list teacher count with invalid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=foo,bar')
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

    it('should list teacher count with valid dimensions and filters', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=region,state,school,gender&filter=min_year:2015,max_year:2015,city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('school_name');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                done();
            });
    });

    it('should list teacher count with dimension location', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('location_name');
                done();
            });
    });

    it('should list teacher count with dimension rural_location', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=rural_location')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('rural_location_name');
                done();
            });
    });

    it('should list teacher count with dimension education_level_mod', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=education_level_mod')
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
            .get('/api/v1/teacher?dims=education_level_short')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_level_short_name');
                done();
            });
    });

    it('should list teacher count with dimension education type', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=education_type')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('education_type_name');
                done();
            });
    });

    it('should list teacher count with dimension adm_dependency', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=adm_dependency')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_name');
                done();
            });
    });

    it('should list teacher count with dimension adm_dependency_detailed', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=adm_dependency_detailed')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_detailed_name');
                done();
            });
    });

    it('should list teacher count with dimension gender', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=gender')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('gender_name');
                done();
            });
    });

    it('should list teacher count with dimension ethnic_group', (done) => {
        chai.request(server)
            .get('/api/v1/teacher?dims=ethnic_group')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('ethnic_group_name');
                done();
            });
    });
});
