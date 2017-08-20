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
describe('request classrooms', () => {

    it('should list the locations', (done) => {
        chai.request(server)
            .get('/api/v1/classroom/location')
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
			.get('/api/v1/classroom/adm_dependency')
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

	it('should list the detailed administrative dependencies', (done) => {
		chai.request(server)
			.get('/api/v1/classroom/adm_dependency_detailed')
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

    it('should list classrooms', (done) => {
        chai.request(server)
            .get('/api/v1/classroom')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=city:4106902')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=state:41')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=region:4')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=adm_dependency:3')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=adm_dependency_detailed:5')
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

    it('should list classrooms with valid filters', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?filter=location:1')
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

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=city')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('city_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=state')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('state_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=region')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('region_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=adm_dependency')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=adm_dependency_detailed')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result[0].should.have.property('adm_dependency_detailed_name');
                res.body.result[0].should.have.property('total');
                done();
            });
    });

    it('should list classrooms with valid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=location')
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

    it('should list classrooms with invalid dimensions', (done) => {
        chai.request(server)
            .get('/api/v1/classroom?dims=foo,bar')
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
});
