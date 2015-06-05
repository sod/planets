define([
	'service/input/keyboard',
	'pixi/property/acceleration'
], function(keyboard, Acceleration) {
	function InputByKeyboard(entity) {
		var acceleration = entity.acceleration = new Acceleration(4, 0.02);

		this.tick = function InputByKeyboardTick(deltaTime) {
			deltaTime = Math.round(deltaTime);
			acceleration.decrease(deltaTime);
			Acceleration.directions.forEach(function(key) {
				if(keyboard.state[key]) {
					acceleration.increase(key, 2 * deltaTime);
				}
			});

			entity.x += acceleration.getX() * deltaTime;
			entity.y += acceleration.getY() * deltaTime;
		};
	}

	return InputByKeyboard;
});