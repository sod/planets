define(function() {
	function Acceleration(max, steps) {
		this.left = 0;
		this.up = 0;
		this.right = 0;
		this.down = 0;

		this.max = max;
		this.steps = steps;
	}

	Acceleration.prototype.increase = function(direction) {
		this[direction] = Math.min(this[direction] + this.steps, this.max);
	};

	Acceleration.prototype.decrease = function() {
		this.left = Math.max(this.left - this.steps, 0);
		this.up = Math.max(this.up - this.steps, 0);
		this.right = Math.max(this.right - this.steps, 0);
		this.down = Math.max(this.down - this.steps, 0);
	};

	Acceleration.prototype.getX = function() {
		return (this.left * -1) + this.right;
	};

	Acceleration.prototype.getY = function() {
		return (this.up * -1) + this.down;
	};

	return Acceleration;
});