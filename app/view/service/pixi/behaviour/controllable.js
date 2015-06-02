define([
	'service/keyboard',
	'pixi/property/acceleration'
], function(keyboard, Acceleration) {
	var directions = [
		'left',
		'up',
		'right',
		'down'
	];

	return function(entity) {
		var acceleration = new Acceleration(4, 0.02);

		entity.on('tick', function() {
			acceleration.decrease();
			directions.forEach(function(key) {
				if(keyboard.state[key]) {
					acceleration.increase(key);
					acceleration.increase(key);
				}
			});

			entity.x += acceleration.getX();
			entity.y += acceleration.getY();
			//name.text = [
			//	'x: ' + entity.x.toFixed(2),
			//	'y: ' + entity.y.toFixed(2),
			//	'z: ' + entity.volume.radius.toFixed(2),
			//].join('\n');
		})
	}
});