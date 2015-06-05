define(['pixi/ticker'], function(ticker) {
	var listeners = [];
	var resize = {};
	var initialized = false;

	var emitEach = function() {
		initialized = true;
		listeners.forEach(emit);
	};

	var emit = function(listener) {
		listener[0].call(listener[1]);
	};

	resize.on = function(fn, context) {
		listeners.push([fn, context]);
		if(initialized) {
			setTimeout(emit.bind(null, [fn, context]));
		}
	};

	window.addEventListener('resize', emitEach);

	ticker.addOnce(function() {
		if(!initialized) {
			emitEach();
		}
	});

	return resize;
});