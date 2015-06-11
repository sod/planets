define([
	'service/input/mouse',
	'pixi/property/acceleration'
], function(mouse, Acceleration) {
	function InputByMouse(entity) {
		var instance = this;
		var acceleration = entity.acceleration = new Acceleration(4, 0.02);

		this.accelerate = function(click) {
			var position = entity.getGlobalPosition();
			acceleration.increaseByDelta(position.y - click.y, position.x - click.x, 1);
		},

		this.tick = function(deltaTime) {
			entity.acceleration.decrease(deltaTime * 0.1);
			mouse.getClicks().forEach(instance.accelerate);
			entity.x += acceleration.x * deltaTime;
			entity.y += acceleration.y * deltaTime;
		};
	}

	return InputByMouse;
});