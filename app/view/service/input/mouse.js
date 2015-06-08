define(function() {
	var mouse = {};

	function MouseState(x, y) {
		this.x = x;
		this.y = y;
	}

	var clicks = [];

	mouse.getClicks = function() {
		var copy = clicks.concat();
		clicks.length = 0;
		return copy;
	};

	var mousedown = function(event) {
		clicks.push(new MouseState(event.layerX, event.layerY));
	};

	document.body.addEventListener('mousedown', mousedown);

	return mouse;
});