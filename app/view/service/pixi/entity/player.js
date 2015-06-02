define([
	'pixijs',
	'pixi/text',
	'service/keyboard',
	'pixi/property/acceleration',
	'pixi/property/volume',
	'pixi/collision'
], function(PIXI, text, keyboard, Acceleration, Volume, collision) {
	var player = {};

	player.create = function() {
		var directions = [
			'left',
			'up',
			'right',
			'down'
		];

		function setRadius(radius) {
			circle.clear();
			circle.beginFill(0x0074D9);
			circle.drawCircle(0, 0, radius);
		}

		var playerEntity = new PIXI.Container();
		var acceleration = playerEntity.acceleration = new Acceleration(4, 0.02);
		var volume = playerEntity.volume = new Volume(100, 1, 500);

		playerEntity.x = 200;
		playerEntity.y = 200;

		var circle = new PIXI.Graphics();
		setRadius(volume.radius);

		var name = text.getCentered('Player');
		window.n = name;

		circle.addChild(name);
		playerEntity.addChild(circle);

		playerEntity.on('tick', function() {
			acceleration.decrease();
			//volume.increase();

			setRadius(volume.radius);

			directions.forEach(function(key) {
				if(keyboard.state[key]) {
					acceleration.increase(key);
					acceleration.increase(key);
				}
			});

			playerEntity.x += acceleration.getX();
			playerEntity.y += acceleration.getY();
			name.text = playerEntity.x.toFixed(2) + ' x ' + playerEntity.y.toFixed(2);
		});

		window.p = playerEntity;

		return playerEntity;
	};

	return player;
});