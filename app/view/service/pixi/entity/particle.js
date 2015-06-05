define([
	'PIXI'
], function(PIXI) {

	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 *
	 * @constructor
	 * @extends Sprite
	 */
	function Particle(x, y, radius) {
		PIXI.Sprite.call(this, PIXI.loader.resources.particle.texture);

		this.anchor.x = this.anchor.y = .5;
		this.x = x;
		this.y = y;
		this.setRadius(radius);
	}

	Particle.prototype = Object.create(PIXI.Sprite.prototype);
	Particle.prototype.constructor = Particle;

	Particle.prototype.setRadius = function(radius) {
		this.radius = radius;
		this.width = this.height = radius * 2;
	};

	Particle.prototype.destroy = function() {
		this.destroyed = true;
		this.parent.removeChild(this);
	};

	return Particle;
});