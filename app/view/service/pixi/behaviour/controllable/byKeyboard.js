define([
	'service/input/keyboard',
	'pixi/property/acceleration'
], function(keyboard, Acceleration) {
	function InputByKeyboard(entity) {
		var acceleration = entity.acceleration = new Acceleration(4, 0.02);

		this.tick = function InputByKeyboardTick(deltaTime) {
			deltaTime = Math.round(deltaTime);
			acceleration.decrease(deltaTime);
			var deltaX = -keyboard.state.left + keyboard.state.right;
			var deltaY = -keyboard.state.up + keyboard.state.down;
			if(deltaX || deltaY) {
				acceleration.increaseByDelta(deltaY, deltaX, 2 * deltaTime * 0.02);
			}

			entity.x += acceleration.x * deltaTime;
			entity.y += acceleration.y * deltaTime;
		};
	}

	return InputByKeyboard;
});