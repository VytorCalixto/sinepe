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

const id2str = require(`${libs}/middlewares/id2str`);

chai.use(chaiHttp);

describe('id2str middleware', () => {
    let req, res;
    it('should return a function', (done) => {
        expect(id2str.transform).to.be.a.Function;
        done();
    });

    it('should transform a gender id', (done) => {
        expect(id2str.gender(1)).to.deep.equal('Masculino');
        done();
    });

    it('should transform a period id', (done) => {
        expect(id2str.period(1)).to.deep.equal('Matutino');
        done();
    });

    it('should transform a school year id', (done) => {
        expect(id2str.schoolYear(11)).to.deep.equal('Creche - Menor de 1 ano');
        done();
    });

    it('should transform a result', (done) => {
        let req = {
            result: [{gender_id: 2, period_id: 3, school_year_id: 11}]
        };
        id2str.transform(false)(req, {},  (error)=>{
            if (error) { throw new Error('Expected not to receive an error'); }
            req.should.have.property('result');
            req.result.should.not.be.undefined;
            req.result.should.be.deep.equal([{gender_id: 2, period_id: 3, school_year_id: 11, gender_name: 'Feminino', period_name: 'Noturno', school_year_name: 'Creche - Menor de 1 ano'}]);
            done();
        });
    });

    it('should transform a result and delete the ids', (done) => {
        let req = {
            result: [{gender_id: 2, period_id: 3, school_year_id: 11}]
        };
        id2str.transform(true)(req, {},  (error)=>{
            if (error) { throw new Error('Expected not to receive an error'); }
            req.should.have.property('result');
            req.result.should.not.be.undefined;
            req.result.should.be.deep.equal([{gender_name: 'Feminino', period_name: 'Noturno', school_year_name: 'Creche - Menor de 1 ano'}]);
            done();
        });
    });
});
