define(function() {
	Acceleration.directions = [
		'left',
		'up',
		'right',
		'down'
	];

	function Acceleration(max, steps) {
		var instance = this;

		this.left = 0;
		this.up = 0;
		this.right = 0;
		this.down = 0;

		/**
		 * increase acceleration
		 * @param {'left'|'up'|'right'|'down'} direction
		 * @param {Number} [multiplier=1]
		 */
		this.increase = function(direction, multiplier) {
			instance[direction] = Math.min((instance[direction] + steps * (multiplier || 1)), max);
		};

		/**
		 * decrease acceleration
		 */
		this.decrease = function() {
			instance.left = Math.max(instance.left - steps, 0);
			instance.up = Math.max(instance.up - steps, 0);
			instance.right = Math.max(instance.right - steps, 0);
			instance.down = Math.max(instance.down - steps, 0);
		};

		this.getX = function() {
			return (instance.left * -1) + instance.right;
		};

		this.getY = function() {
			return (instance.up * -1) + instance.down;
		};
	}

	return Acceleration;
});