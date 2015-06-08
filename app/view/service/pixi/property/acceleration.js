define(function() {
	Acceleration.coords = [
		'x',
		'y'
	];

	function Acceleration(max, steps) {
		this.x = 0;
		this.y = 0;

		this.steps = steps;
		this.max = max;
	}

	/**
	 * increase acceleration
	 * @param {'left'|'up'|'right'|'down'} direction
	 * @param {Number} multiplier
	 */
	//Acceleration.prototype.increase = function(direction, multiplier) {
	//	this[direction] = Math.min((this[direction] + this.steps * multiplier), this.max);
	//};

	Acceleration.prototype.enforceBoundaries = function() {
		var instance = this;
		Acceleration.coords.forEach(function(coord) {
			if(Math.abs(instance[coord]) > instance.max) {
				instance[coord] = instance[coord] < 0 ? -instance.max : instance.max;
			}
		});
	};

	/**
	 * @param {Number} deltaY
	 * @param {Number} deltaX
	 * @param {Number} multiplier
	 */
	Acceleration.prototype.increaseByDelta = function(deltaY, deltaX, multiplier) {
		var normalize = Math.abs(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);
		this.x += deltaX / normalize * (multiplier || 1);
		this.y += deltaY / normalize * (multiplier || 1);
		this.enforceBoundaries();
	};

	/**
	 * decrease acceleration
	 * @param {Number} multiplier
	 */
	Acceleration.prototype.decrease = function(multiplier) {
		var steps = this.steps * multiplier;
		var instance = this;
		Acceleration.coords.forEach(function(coord) {
			if(Math.abs(this[coord]) < steps) {
				instance[coord] = 0;
			} else {
				instance[coord] = instance[coord] - ((instance[coord] < 0 ? -1 : +1) * steps);
			}
		});
	};

	/**
	 * @returns {number} - highest movement direction
	 */
	Acceleration.prototype.getVelocity = function() {
		return Math.max(Math.abs(this.x), Math.abs(this.y));
	};

	return Acceleration;
});