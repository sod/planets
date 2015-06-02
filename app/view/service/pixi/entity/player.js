define([
	'pixijs',
	'pixi/text',
	'pixi/circle',
	'pixi/property/volume'
], function(PIXI, text, Circle, Volume) {
	var player = {};

	player.create = function() {
		var playerEntity = new PIXI.Container();
		var volume = playerEntity.volume = new Volume(0, 1, 500);

		playerEntity.x = (Math.random() * 500) + 100;
		playerEntity.y = (Math.random() * 500) + 100;

		var name = text.getCentered();
		var circle = new Circle();

		playerEntity.setColor = circle.setColor;
		playerEntity.setRadius = volume.setRadius;
		playerEntity.setName = name.setText;
		playerEntity.destroy = function() {
			playerEntity.destroyed = true;
			name.setText(' ')
		};

		circle.graphics.addChild(name);
		playerEntity.addChild(circle.graphics);

		playerEntity.on('tick', function() {
			circle.setRadius(volume.radius);
			circle.draw();
		});

		return playerEntity;
	};

	return player;
});