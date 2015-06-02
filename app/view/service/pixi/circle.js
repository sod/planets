define(['pixijs'], function(PIXI) {
	var noop = function() {}

	function Circle() {
		var instance = this;

		var graphics = this.graphics = new PIXI.Graphics();
		var color = 0x000000;
		var radius = 0;

		var draw = function() {
			graphics.clear();
			graphics.beginFill(color);
			graphics.drawCircle(0, 0, radius);
			instance.draw = noop;
		};

		this.draw = draw;

		this.setColor = function($color) {
			if(color !== $color) {
				color = $color;
				instance.draw = draw;
			}
		};

		this.setRadius = function($radius) {
			if(radius !== $radius) {
				radius = $radius;
				instance.draw = draw;
			}
		};
	}

	return Circle;
});