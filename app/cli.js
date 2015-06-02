var server = require('./service/server');
var loader = require('./service/loader');
var view = require('./service/view');
var serveStatic = require('serve-static');

view.express(server, __dirname + '/view/controller');
server.use(serveStatic('app/view'));
server.use(serveStatic('bower_components'));
loader.glob(__dirname + '/controller/*.js');
server.listen(5560);