var server = require('../service/server');

server.get('/', function(req, res) {
	res.render('index/index.html');
});