define([
	'PIXI',
	'pixi/ticker'
], function(PIXI, ticker) {

	function draw() {
		this.clear();
		this.beginFill(this.color);
		this.drawCircle(0, 0, this.radius);
	};

	/**
	 * @extends PIXI.Graphics
	 * @constructor
	 */
	function Circle() {
		PIXI.Graphics.call(this);

		this.color = 0x000000;
		this.radius = 0;

		/**
		 * set color and schedule render on next tick
		 * @param {Number|Hex} color
		 */
		this.setColor = function(color) {
			this.color = color;
			ticker.addOnce(draw, this);
		};

		/**
		 * set radius and schedule render on next tick
		 * @param {Number} radius
		 */
		this.setRadius = function(radius) {
			this.radius = radius;
			ticker.addOnce(draw, this);
		};
	}

	Circle.prototype = PIXI.Graphics.prototype;

	return Circle;
});