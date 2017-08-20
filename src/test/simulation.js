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

const mongoose = require('../libs/db/mongoose');
const Simulation = require('../libs/models/simulation');
const User = require('../libs/models/user');

chai.use(chaiHttp);

describe('Requires a simulation', () => {
    let newSimulation;

    beforeEach(() => {
        Simulation.remove({}, (err) => {
            console.log('Test collection purged');
        });
    });

    it('should create a new simulation', (done) => {
        chai.request(server)
            .post('/api/v1/simulation')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .send({ name: 'test_entry' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('id');
                res.body.id.should.be.a('string');
                Simulation.findById(res.body.id, (err, simulation) => {
                    simulation.should.have.property('name');
                    simulation.name.should.be.a('string');
                    simulation.name.should.equal('test_entry');
                    done();
                });
            });
    });
    it('should not create a nameless simulation', (done) => {
        chai.request(server)
            .post('/api/v1/simulation')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-apicache-bypass', 'true')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.not.have.property('id');
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                Simulation.findById(res.body.id, (err, simulation) => {
                    expect(simulation).to.not.exist;
                    done();
                });
            });
    });
    it('should find an existing simulation', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .get(`/api/v1/simulation/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name');
                    res.body._id.should.be.a('string');
                    done();
                });
        });
    });
    it('should not find an unexisting simulation', (done) => {
        newSimulation = new Simulation();
        let id = newSimulation._id;
        chai.request(server)
            .get(`/api/v1/simulation/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                done();
            });
    });
    it('should update an existing simulation\'s location', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({ location: 5 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id');
                    res.body.id.should.be.a('string');
                    Simulation.findById(res.body.id, (err, simulation) => {
                        simulation.should.have.property('name');
                        simulation.name.should.be.a('string');
                        simulation.name.should.equal('test');
                        simulation.should.have.property('location');
                        simulation.location.should.be.a('number');
                        simulation.location.should.equal(5);
                        done();
                    });
                });
        });
    });
    it('should update multiple fields on a single request', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    name: 'new_name',
                    location: 5,
                    time: 3,
                    failure_rate: [0.1, 0.2, 0.3],
                    goals_care: [0.3, 0.2, 0.1],
                    goals_inclusion: [0.8, 0.9, 1]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id');
                    res.body.id.should.be.a('string');
                    Simulation.findById(res.body.id, (err, simulation) => {
                        simulation.should.have.property('name');
                        simulation.name.should.be.a('string');
                        simulation.name.should.equal('new_name');
                        simulation.should.have.property('location');
                        simulation.location.should.be.a('number');
                        simulation.location.should.equal(5);
                        simulation.should.have.property('time');
                        simulation.time.should.be.a('number');
                        simulation.time.should.equal(3);
                        simulation.should.have.property('failure_rate');
                        simulation.failure_rate.should.be.a('array');
                        simulation.failure_rate.length.should.equal(3);
                        simulation.should.have.property('goals_care');
                        simulation.goals_care.should.be.a('array');
                        simulation.goals_care.length.should.equal(3);
                        simulation.should.have.property('goals_inclusion');
                        simulation.goals_inclusion.should.be.a('array');
                        simulation.goals_inclusion.length.should.equal(3);
                        done();
                    });
                });
        });
    });
    it('should not update an unexisting simulation', (done) => {
        newSimulation = new Simulation();
        let id = newSimulation._id;
        chai.request(server)
            .post(`/api/v1/simulation/${id}`)
            .send({ location: 5 })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                done();
            });
    });
    it('should update an existing simulation\'s time', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({ time: 5 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id');
                    res.body.id.should.be.a('string');
                    Simulation.findById(res.body.id, (err, simulation) => {
                        simulation.should.have.property('name');
                        simulation.name.should.be.a('string');
                        simulation.should.have.property('time');
                        simulation.time.should.be.a('number');
                        simulation.time.should.equal(5);
                        done();
                    });
                });
        });
    });
    it('should not change results for empty post requests', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });
    it('should not update in case of invalid field', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    name: 'other_name',
                    totally_not_valid_value_for_an_entry: 'not hacking this api',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    Simulation.findById(id, (err, simulation) => {
                        simulation.name.should.equal('test');
                        done();
                    });
                });
        });
    });
    it('should include consistent enrollment tables', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: 5,
                    enrollments: "[[100, 150, 200, 250, 300]]",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('id');
                    res.body.id.should.be.a('string');
                    Simulation.findById(res.body.id, (err, simulation) => {
                        simulation.should.have.property('name');
                        simulation.name.should.be.a('string');
                        simulation.should.have.property('time');
                        simulation.time.should.be.a('number');
                        simulation.time.should.equal(5);
                        done();
                    });
                });
        });
    });
    it('should not accept an invalid time', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: "I'm an inocent time entry, don't mind me",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    });
                    done();
                });
    });
    it('should not accept enrollments table different than provided time', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: 5,
                    enrollments: "[[1,2,3]]",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });
    it('should not include arrays of non arrays as enrollments', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: 5,
                    enrollments: "[\"Tomato\"]",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });
    it('should not accept non array enrollments', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: 5,
                    enrollments: "Am I still wanted here?",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });
    it('should not accept an enrollment with anything other than a number', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .post(`/api/v1/simulation/${id}`)
                .send({
                    time: 5,
                    enrollments: "[[1,2,\"malicious payload\",4,5]]",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });
    it('should delete an entry', (done) => {
        newSimulation = new Simulation();
        newSimulation.name = 'test';
        newSimulation.save((err, sim) => {
            let id = sim._id;
            chai.request(server)
                .delete(`/api/v1/simulation/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    done();
                });
        });
    });
    it('should not delete an unexisting entry', (done) => {
        let sim = new Simulation();
        let id = sim._id;
        chai.request(server)
            .delete(`/api/v1/simulation/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                done();
            });
    });

    it('should returns an array in simulation/time', (done) => {
        let max_time = 10;
        chai.request(server)
            .get(`/api/v1/simulation/time?max_time=${max_time}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('result');
                res.body.result.should.be.array;
                done();
            });
    });

    it('should return an error when no max_time is specified in simulation/time', (done) => {
        chai.request(server)
            .get(`/api/v1/simulation/time`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('error');
                res.body.error.should.equal('Invalid value for mandatory parameter max_time');
                done();
            });
    });
});
