define(function() {
	function Volume(start, min, max) {
		this.radius = start;

		this.min = min;
		this.max = max;
	}

	Volume.prototype.increase = function() {
		this.radius = Math.min(this.radius + 1, this.max);
	};

	Volume.prototype.decrease = function() {
		this.radius = Math.max(this.radius - 1, this.min);
	};

	return Volume;
});