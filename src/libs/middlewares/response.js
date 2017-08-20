const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const xml = require('js2xmlparser');
const csv = require('csv-express');

 // Custom generic middleware used respond requests.
 // The function reads the req.query.format param and respond in json, xml or csv
function response(value) {
    return (req, res, next) => {
        if (req.query.format === 'csv') {
            res.attachment(`${value}.csv`);
            res.csv(req.result, true);
        } else if (req.query.format === 'xml') {
            res.send(xml.parse('result', { [value]: req.result }));
        } else {
            res.json({ result: req.result });
        }
    };
}

module.exports = response;
