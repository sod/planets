var glob = require('glob');
var loader = {};

/**
 * resolve globbing pattern and require files
 * @param {string} pattern
 */
loader.glob = function(pattern) {
	glob(pattern, function(error, files) {
		if(error) {
			throw error;
		}
		files.forEach(require);
	});
};

module.exports = loader;