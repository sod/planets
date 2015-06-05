define([
	'PIXI',
	'pixi/text',
	'pixi/circle',
], function(PIXI, text, Circle) {
	var player = {};

	player.create = function() {
		var circle = new Circle();
		var name = text.getCentered();

		circle.x = (Math.random() * 500) + 100;
		circle.y = (Math.random() * 500) + 100;

		circle.setName = name.setText;
		circle.destroy = function() {
			circle.destroyed = true;
			circle.parent.removeChild(circle);
		};

		circle.addChild(name);

		return circle;
	};

	return player;
});