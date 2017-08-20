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

const testTimeout = 60000;

describe('test spatial', () => {
    it('should return the expected response format for sociodemographic data for the whole country', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/sociodemographic')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('population');
                res.body.result.should.have.property('gdp');
                res.body.result.should.have.property('idh');
                res.body.result.should.have.property('analfab');
                res.body.result.should.have.property('gini');
                // test response attributes for population
                res.body.result.population.should.have.property('name');
                res.body.result.population.should.have.property('population');
                res.body.result.population.should.have.property('census_year');
                // test response attributes for gdp
                res.body.result.gdp.should.have.property('name');
                res.body.result.gdp.should.have.property('gdp_per_capita');
                res.body.result.gdp.should.have.property('census_year');
                // test response attributes for idh
                res.body.result.idh.should.have.property('name');
                res.body.result.idh.should.have.property('idhm');
                res.body.result.idh.should.have.property('census_year');
                // test response attributes for analfab
                res.body.result.analfab.should.have.property('name');
                res.body.result.analfab.should.have.property('analfabetism');
                res.body.result.analfab.should.have.property('census_year');
                // test response attributes for gini
                res.body.result.gini.should.have.property('name');
                res.body.result.gini.should.have.property('gini');
                res.body.result.gini.should.have.property('census_year');
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for sociodemographic data for a region', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/sociodemographic?filter=region:1')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('population');
                res.body.result.should.have.property('gdp');
                res.body.result.should.have.property('idh');
                res.body.result.should.have.property('analfab');
                res.body.result.should.have.property('gini');
                // test response attributes for population
                res.body.result.population.should.have.property('name');
                res.body.result.population.should.have.property('population');
                res.body.result.population.should.have.property('census_year');
                // test response attributes for gdp
                res.body.result.gdp.should.have.property('name');
                res.body.result.gdp.should.have.property('gdp_per_capita');
                res.body.result.gdp.should.have.property('census_year');
                // test response attributes for idh
                res.body.result.idh.should.have.property('name');
                res.body.result.idh.should.have.property('idhm');
                res.body.result.idh.should.have.property('census_year');
                // test response attributes for analfab
                res.body.result.analfab.should.have.property('name');
                res.body.result.analfab.should.have.property('analfabetism');
                res.body.result.analfab.should.have.property('census_year');
                // test response attributes for gini
                res.body.result.gini.should.have.property('name');
                res.body.result.gini.should.have.property('gini');
                res.body.result.gini.should.have.property('census_year');
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for sociodemographic data for a state', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/sociodemographic?filter=state:42')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('population');
                res.body.result.should.have.property('gdp');
                res.body.result.should.have.property('idh');
                res.body.result.should.have.property('analfab');
                res.body.result.should.have.property('gini');
                // test response attributes for population
                res.body.result.population.should.have.property('name');
                res.body.result.population.should.have.property('population');
                res.body.result.population.should.have.property('census_year');
                // test response attributes for gdp
                res.body.result.gdp.should.have.property('name');
                res.body.result.gdp.should.have.property('gdp_per_capita');
                res.body.result.gdp.should.have.property('census_year');
                // test response attributes for idh
                res.body.result.idh.should.have.property('name');
                res.body.result.idh.should.have.property('idhm');
                res.body.result.idh.should.have.property('census_year');
                // test response attributes for analfab
                res.body.result.analfab.should.have.property('name');
                res.body.result.analfab.should.have.property('analfabetism');
                res.body.result.analfab.should.have.property('census_year');
                // test response attributes for gini
                res.body.result.gini.should.have.property('name');
                res.body.result.gini.should.have.property('gini');
                res.body.result.gini.should.have.property('census_year');
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for sociodemographic data for a city', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/sociodemographic?filter=city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('population');
                res.body.result.should.have.property('gdp');
                res.body.result.should.have.property('idh');
                res.body.result.should.have.property('analfab');
                res.body.result.should.have.property('gini');
                // test response attributes for population
                res.body.result.population.should.have.property('name');
                res.body.result.population.should.have.property('population');
                res.body.result.population.should.have.property('census_year');
                // test response attributes for gdp
                res.body.result.gdp.should.have.property('name');
                res.body.result.gdp.should.have.property('gdp_per_capita');
                res.body.result.gdp.should.have.property('census_year');
                // test response attributes for idh
                res.body.result.idh.should.have.property('name');
                res.body.result.idh.should.have.property('idhm');
                res.body.result.idh.should.have.property('census_year');
                // test response attributes for analfab
                res.body.result.analfab.should.have.property('name');
                res.body.result.analfab.should.have.property('analfabetism');
                res.body.result.analfab.should.have.property('census_year');
                // test response attributes for gini
                res.body.result.gini.should.have.property('name');
                res.body.result.gini.should.have.property('gini');
                res.body.result.gini.should.have.property('census_year');
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for educational data for the whole country', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('school');
                res.body.result.school.should.be.a('array');
                res.body.result.should.have.property('school_per_location');
                res.body.result.school_per_location.should.be.a('array');
                res.body.result.should.have.property('enrollment');
                res.body.result.enrollment.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_adm_dep');
                res.body.result.enrollment_per_adm_dep.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_school_level');
                res.body.result.enrollment_per_school_level.should.be.a('array');
                // test response attributes for school
                res.body.result.school.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for school_per_location
                res.body.result.school_per_location.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment
                res.body.result.enrollment.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment_per_adm_dep
                res.body.result.enrollment_per_adm_dep.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('adm_dependency_name');
                });
                // test response attributes for enrollment_per_school_level
                res.body.result.enrollment_per_school_level.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('school_level_name');
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for educational data for a country region', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational?filter=region:1')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('school');
                res.body.result.school.should.be.a('array');
                res.body.result.should.have.property('school_per_location');
                res.body.result.school_per_location.should.be.a('array');
                res.body.result.should.have.property('enrollment');
                res.body.result.enrollment.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_adm_dep');
                res.body.result.enrollment_per_adm_dep.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_school_level');
                res.body.result.enrollment_per_school_level.should.be.a('array');
                // test response attributes for school
                res.body.result.school.should.a('array');
                res.body.result.school.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for school_per_location
                res.body.result.school_per_location.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment
                res.body.result.enrollment.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment_per_adm_dep
                res.body.result.enrollment_per_adm_dep.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('adm_dependency_name');
                });
                // test response attributes for enrollment_per_school_level
                res.body.result.enrollment_per_school_level.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('school_level_name');
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for educational data for a country state', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational?filter=state:42')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('school');
                res.body.result.school.should.be.a('array');
                res.body.result.should.have.property('school_per_location');
                res.body.result.school_per_location.should.be.a('array');
                res.body.result.should.have.property('enrollment');
                res.body.result.enrollment.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_adm_dep');
                res.body.result.enrollment_per_adm_dep.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_school_level');
                res.body.result.enrollment_per_school_level.should.be.a('array');
                // test response attributes for school
                res.body.result.school.should.a('array');
                res.body.result.school.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for school_per_location
                res.body.result.school_per_location.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment
                res.body.result.enrollment.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment_per_adm_dep
                res.body.result.enrollment_per_adm_dep.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('adm_dependency_name');
                });
                // test response attributes for enrollment_per_school_level
                res.body.result.enrollment_per_school_level.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('school_level_name');
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the expected response format for educational data for a country city', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational?filter=city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                // test result type
                res.body.result.should.be.a('object');
                res.body.result.should.have.property('school');
                res.body.result.school.should.be.a('array');
                res.body.result.should.have.property('school_per_location');
                res.body.result.school_per_location.should.be.a('array');
                res.body.result.should.have.property('enrollment');
                res.body.result.enrollment.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_adm_dep');
                res.body.result.enrollment_per_adm_dep.should.be.a('array');
                res.body.result.should.have.property('enrollment_per_school_level');
                res.body.result.enrollment_per_school_level.should.be.a('array');
                // test response attributes for school
                res.body.result.school.should.a('array');
                res.body.result.school.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for school_per_location
                res.body.result.school_per_location.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('location_name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment
                res.body.result.enrollment.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                });
                // test response attributes for enrollment_per_adm_dep
                res.body.result.enrollment_per_adm_dep.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('adm_dependency_name');
                });
                // test response attributes for enrollment_per_school_level
                res.body.result.enrollment_per_school_level.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('name');
                    row.should.have.property('total');
                    row.should.have.property('census_year');
                    row.should.have.property('school_level_name');
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the correct format of enrollments per school level', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational/school_level')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                // test response attributes for school
                res.body.result.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('degree');
                    row.should.have.property('census_year');
                    row.should.have.property('table');
                    row.table.should.be.a('array');
                    row.table.forEach((tableRow) => {
                        tableRow.should.be.a('object');
                        tableRow.should.have.property('title');
                        tableRow.should.have.property('value');
                        tableRow.title.should.be.a('String');
                        tableRow.value.should.be.a('Number');
                    });
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the correct format of enrollments per school level for a region', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational/school_level?filter=region:1')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                // test response attributes for school
                res.body.result.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('degree');
                    row.should.have.property('census_year');
                    row.should.have.property('table');
                    row.table.should.be.a('array');
                    row.table.forEach((tableRow) => {
                        tableRow.should.be.a('object');
                        tableRow.should.have.property('title');
                        tableRow.should.have.property('value');
                        tableRow.title.should.be.a('String');
                        tableRow.value.should.be.a('Number');
                    });
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the correct format of enrollments per school level for a state', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational/school_level?filter=state:42')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                // test response attributes for school
                res.body.result.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('degree');
                    row.should.have.property('census_year');
                    row.should.have.property('table');
                    row.table.should.be.a('array');
                    row.table.forEach((tableRow) => {
                        tableRow.should.be.a('object');
                        tableRow.should.have.property('title');
                        tableRow.should.have.property('value');
                        tableRow.title.should.be.a('String');
                        tableRow.value.should.be.a('Number');
                    });
                });
                done();
            });
    }).timeout(testTimeout);

    it('should return the correct format of enrollments per school level for a city', (done) => {
        chai.request(server)
            .get('/api/v1/spatial/educational/school_level?filter=city:4106902')
            .end((err, res) => {
                res.should.have.status(200);
                // test response format
                res.should.be.json;
                // test for result attribute in the response
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                // test response attributes for school
                res.body.result.forEach((row) => {
                    row.should.be.a('object');
                    row.should.have.property('degree');
                    row.should.have.property('census_year');
                    row.should.have.property('table');
                    row.table.should.be.a('array');
                    row.table.forEach((tableRow) => {
                        tableRow.should.be.a('object');
                        tableRow.should.have.property('title');
                        tableRow.should.have.property('value');
                        tableRow.title.should.be.a('String');
                        tableRow.value.should.be.a('Number');
                    });
                });
                done();
            });
    }).timeout(testTimeout);
});
