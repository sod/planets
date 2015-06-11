define([
	'PIXI',
	'pixi/text',
	'pixi/circle'
], function(PIXI, text, Circle) {

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 *
	 * @constructor
	 * @extends Circle
	 */
	function Player(x, y, radius) {
		Circle.call(this, radius);
		var name = text.getCentered();
		this.addChild(name);
		this.x = x;
		this.y = y;
		this.setName = name.setText;
	}

	Player.prototype = Object.create(Circle.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.destroy = function() {
		this.destroyed = true;
		this.parent.removeChild(this);
	};

	return Player;
});