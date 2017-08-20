const libs = `${process.cwd()}/libs`;
const log = require(`${libs}/log`)(module);
const execQuery = require(`${libs}/db/query_exec`);

 // Middleware that executes a query defined by a squel object in req.sql
function query(req, res, next) {
    let sql = req.sql.toParam();
    log.debug(req.sql.toString());
    execQuery(sql.text, sql.values).then((result) => {
        req.result = result;
        if (result.length === 0) {
            next({status: 404, message: 'No results found in database'});
        }
        next();
    }, (error) => {
        log.error(error.stack);
        next(new Error('Request could not be satisfied due to a database error.'));
    });
}

module.exports = query;
