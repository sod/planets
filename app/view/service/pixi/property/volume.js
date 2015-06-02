define(function() {
	function Volume(radius, min, max) {
		var instance = this;

		this.radius = radius;

		this.setRadius = function(radius) {
			instance.radius = radius;
		};

		this.increase = function() {
			instance.radius = Math.min(instance.radius + 1, max);
		};

		this.decrease = function() {
			instance.radius = Math.max(instance.radius - 1, min);
		};
	}

	return Volume;
});