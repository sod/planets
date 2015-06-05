define(function() {
	Acceleration.directions = [
		'left',
		'up',
		'right',
		'down'
	];

	function Acceleration(max, steps) {
		this.left = 0;
		this.up = 0;
		this.right = 0;
		this.down = 0;

		this.steps = steps;
		this.max = max;
	}

	/**
	 * increase acceleration
	 * @param {'left'|'up'|'right'|'down'} direction
	 * @param {Number} multiplier
	 */
	Acceleration.prototype.increase = function(direction, multiplier) {
		this[direction] = Math.min((this[direction] + this.steps * multiplier), this.max);
	};

	/**
	 * decrease acceleration
	 * @param {Number} multiplier
	 */
	Acceleration.prototype.decrease = function(multiplier) {
		this.left = Math.max(this.left - this.steps * multiplier, 0);
		this.up = Math.max(this.up - this.steps * multiplier, 0);
		this.right = Math.max(this.right - this.steps * multiplier, 0);
		this.down = Math.max(this.down - this.steps * multiplier, 0);
	};

	/**
	 * @returns {number} - highest movement direction
	 */
	Acceleration.prototype.getVelocity = function() {
		return Math.max(this.left, this.up, this.right, this.down);
	};

	/**
	 * @returns {number} - horizontal movement
	 */
	Acceleration.prototype.getX = function() {
		return (this.left * -1) + this.right;
	};

	/**
	 * @returns {number} - vertical movement
	 */
	Acceleration.prototype.getY = function() {
		return (this.up * -1) + this.down;
	};

	return Acceleration;
});