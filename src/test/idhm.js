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
describe('request idhm', () => {
    it('should list the year range', (done) => {
        chai.request(server)
            .get('/api/v1/idhm/year_range')
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

    it('should list idhm with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/idhm?filter=min_year:2000,state:41')
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

    it('should list idhm with valid dims', (done) => {
        chai.request(server)
            .get('/api/v1/idhm?dims=city')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                res.body.result[0].should.have.property('city_id');
                res.body.result[0].should.have.property('state_id');
                res.body.result[0].should.have.property('city_name');
                res.body.result[0].should.have.property('state_name');
                done();
            });
    });

    it('should list idhm with valid filtes and dims', (done) => {
        chai.request(server)
            .get('/api/v1/idhm?filter=state:41&dims=idhm_level')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('total');
                res.body.result[0].should.have.property('year');
                res.body.result[0].should.have.property('state_id');
                res.body.result[0].should.have.property('idhm_level_id');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('idhm_level_name');
                done();
            })
    });

});
