define(function() {
	var debug = {};
	var names = [];
	var times = [];
	var calls = [];
	var active = false;
	var uniqueId = -1;
	var interval = 1000;
	var intervalId;
	var threshold = 0;

	/**
	 *
	 */
	var printStats = function() {
		names.forEach(function(name, index) {
			var call = (calls[index] || 0);
			var time = (times[index] || 0);
			var median = (time / call) || 0;
			var percent = (time / interval * 100);
			if(percent < threshold) {
				return;
			}
			if(call === 0) {
				console.log(name, '[' + call + 'x]');
			} else {
				console.log(name, '[' + call + 'x]', '[' + time.toFixed(2) + 'ms]', '[~' + median.toFixed(2) + 'ms]', '[' + percent.toFixed(2) + '%]');
			}
		});
		times.length = calls.length = 0;
	};

	/**
	 * activate debugging
	 */
	debug.start = function() {
		debug.stop();
		if(window.console) {
			active = true;
			console.log('Name', '[Calls]', '[Time in ms]', '[Median Time per call in ms]', '[Time usage in %]');
			intervalId = setInterval(printStats, interval);
		}
	};

	/**
	 * @param {Number} percent - threshold to show timings if execution time second was greater than `percent`
	 */
	debug.setThreshold = function(percent) {
		threshold = percent;
		return debug;
	};

	/**
	 * print one debugging stat
	 */
	debug.once = function() {
		debug.stop();
		if(window.console) {
			active = true;
			console.log('Name', '[Calls]', '[Time in ms]', '[Median Time per call in ms]', '[Time usage in %]');
			intervalId = setTimeout(printStats, interval);
		}
	};

	/**
	 * stop printing debug messages
	 */
	debug.stop = function() {
		clearInterval(intervalId);
	};

	/**
	 * adds function on property `measure` to `fn` - use this function to measure execution time
	 * @param {Function} fn
	 * @returns fn
	 */
	debug.measure = function(fn) {
		var id = -1;

		if(!active) {
			return fn;
		}

		window.console && console.assert(typeof fn === 'function', '`fn` must by typeof function');
		window.console && console.assert(!fn.measure, 'measure property already exists on `fn`');

		fn.measure = function() {
			if(id === -1) {
				id = uniqueId += 1;
				names[id] = fn.name || (fn.constructor && fn.constructor.name) || '<anonymous>';
			}
			var time = performance.now();
			var result = fn.apply(this, arguments);
			times[id] = (times[id] || 0) + (performance.now() - time);
			calls[id] = (calls[id] || 0) + 1;
			return result;
		};
		return fn.measure;
	};

	return debug;
});