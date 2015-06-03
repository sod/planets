define([
	'service/input/keyboard',
	'pixi/property/acceleration'
], function(keyboard, Acceleration) {
	function InputByKeyboard(entity) {
		var acceleration = entity.acceleration = new Acceleration(4, 0.02);

		this.tick = function InputByKeyboardTick() {
			acceleration.decrease();
			Acceleration.directions.forEach(function(key) {
				if(keyboard.state[key]) {
					acceleration.increase(key, 2);
				}
			});

			entity.x += acceleration.getX();
			entity.y += acceleration.getY();
		};
	}

	return InputByKeyboard;
});