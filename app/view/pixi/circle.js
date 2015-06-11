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
		this.awaitingRedraw = false;
	}

	Circle.prototype = Object.create(PIXI.Graphics.prototype);
	Circle.prototype.constructor = Circle;

	Circle.prototype.redraw = function() {
		this.clear();
		this.beginFill(this.color);
		this.drawCircle(0, 0, this.radius);
		this.endFill();
		this.awaitingRedraw = false;
	};

	/**
	 * schedule a redraw - prevent multiple draws in a single tick as of concurrent colisions
	 */
	Circle.prototype.scheduleRedraw = function() {
		if(!this.awaitingRedraw) {
			this.awaitingRedraw = true;
			// bind(this) instead of addOnce(fn, this): generate unique function via bind or addOnce would reject other circles
			ticker.addOnce(this.redraw.bind(this));
		}
	};

	/**
	 * set color and schedule render on next tick
	 * @param {Number|Hex} color
	 */
	Circle.prototype.setColor = function(color) {
		this.color = color;
		this.scheduleRedraw();
	};

	/**
	 * set radius and schedule render on next tick
	 * @param {Number} radius
	 */
	Circle.prototype.setRadius = function(radius) {
		this.radius = radius;
		this.scheduleRedraw();
	};

	return Circle;
});