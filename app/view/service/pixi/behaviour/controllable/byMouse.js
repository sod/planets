define([
	'service/input/mouse',
	'pixi/property/acceleration'
], function(keyboard, Acceleration) {
	return function(entity) {
		var acceleration = entity.acceleration = new Acceleration(4, 0.02);
		//
		//entity.on('tick', function() {
		//	acceleration.decrease();
		//	Acceleration.directions.forEach(function(key) {
		//		if(keyboard.state[key]) {
		//			acceleration.increase(key, 2);
		//		}
		//	});
		//
		//	entity.x += acceleration.getX();
		//	entity.y += acceleration.getY();
		//});
	}
});