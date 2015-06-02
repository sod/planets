var nunjucks = require('nunjucks');
var path = require('path');

var view = {};

/**
 * @param {express()} server
 * @param {string} directory
 */
view.express = function(server, directory) {
	nunjucks.configure('views', {
		autoescape: true,
		watch: true
	});

	var loader = new nunjucks.FileSystemLoader(directory);
	var view = new nunjucks.Environment(loader);
	view.express(server);
};

module.exports = view;