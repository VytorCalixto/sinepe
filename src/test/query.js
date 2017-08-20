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

const query = require(`${libs}/middlewares/query`);

const squel = require('squel');

chai.use(chaiHttp);

describe('Query middleware', () => {
    let req, res;
    it('should return a function', (done) => {
        expect(query).to.be.a.Function;
        done();
    });

    it('should accept three arguments', function(done) {
      expect(query.length).to.equal(3);
      done();
    });

    it('should do a valid query', (done) => {
        let req = {
            sql: squel.select().field('1+2')
        };
        let res = {};
        query(req, {},  (error)=>{
            if (error) { throw new Error('Expected not to receive an error'); }
            req.should.have.property('result');
            req.result.should.not.be.undefined;
            req.result[0].should.have.property('L2');
            req.result[0].L2.should.be.equal(3);
            done();
        });
    });

    it('should return an error with an invalid query (prepared statement error)', (done) => {
        let req = {
            sql: squel.select()
        };
        let res = {};
        query(req, {},  (error)=>{
            if (error) { done();}
        });
    });

    it('should return an error with an invalid query (execution error)', (done) => {
        let req = {
            sql: squel.select().from('ibge_pnad').from('ibge_censo')
        };
        let res = {};
        query(req, {},  (error)=>{
            if (error) { done();}
        });
    });

    it('should return 404 with an empty query result', (done) => {
        let req = {
            sql: squel.select().field('*').from('regiao').where('id>6')
        };
        let res = {};
        query(req, {},  (error)=>{
            error.should.have.property('status');
            error.status.should.be.equal(404);
            error.should.have.property('message');
            error.message.should.be.equal('No results found in database');
            done();
        });
    });
});
