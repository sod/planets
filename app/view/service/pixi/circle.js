define([
	'PIXI',
	'pixi/ticker'
], function(PIXI, ticker) {

	/**
	 * @param {Number} radius
	 *
	 * @extends Graphics
	 * @constructor
	 */
	function Circle(radius) {
		PIXI.Graphics.call(this);

		this.color = 0x000000;
		this.setRadius(radius);
	}

	Circle.prototype = Object.create(PIXI.Graphics.prototype);
	Circle.prototype.constructor = Circle;

	Circle.prototype.redraw = function() {
		this.clear();
		this.beginFill(this.color);
		this.drawCircle(0, 0, this.radius);
		this.endFill();
	};

	/**
	 * set color and schedule render on next tick
	 * @param {Number|Hex} color
	 */
	Circle.prototype.setColor = function(color) {
		this.color = color;
		ticker.addOnce(this.redraw, this);
	};

	/**
	 * set radius and schedule render on next tick
	 * @param {Number} radius
	 */
	Circle.prototype.setRadius = function(radius) {
		this.radius = radius;
		ticker.addOnce(this.redraw, this);
	};

	return Circle;
});