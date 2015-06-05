define([
	'PIXI',
	'pixi/circle',
], function(PIXI, Circle) {
	var particle = {};

	particle.create = function() {
		var circle = new PIXI.Sprite(PIXI.loader.resources.particle.texture);
		circle.anchor.x = circle.anchor.y = .5;

		circle.setRadius = function(radius) {
			circle.radius = radius;
			circle.width = circle.height = radius * 2;
		};

		circle.setRadius(10);

		circle.x = (Math.random() * 5000) + 100;
		circle.y = (Math.random() * 5000) + 100;

		circle.destroy = function() {
			circle.destroyed = true;
			circle.parent.removeChild(circle);
		};

		return circle;
	};

	return particle;
});