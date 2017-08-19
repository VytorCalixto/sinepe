var debug = require('debug')('node-express-base')

var libs = process.cwd() + '/libs/'
var config = require(libs + 'config')
var log = require(libs + 'log')(module)
var app = require(libs + 'app')

app.set('port', config.get('port') || 3000)

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port)
  log.info('Express server listening on port ' + config.get('port'))
})
