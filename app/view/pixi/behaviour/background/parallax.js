define(['pixi/ticker'], function(ticker) {
	var Parallax = {};

	/**
	 * Extend background with Parallax Effect
	 *
	 * @param {Background} background
	 * @param {Container} container - entity to take the movement from
	 * @param {Number} modifier - the greater the number the slower the movement
	 */
	Parallax.extend = function(background, container, modifier) {
		ticker.add(function ParallaxTick() {
			this.tilePosition.x = container.pivot.x / -modifier;
			this.tilePosition.y = container.pivot.y / -modifier;
		}, background);
		return background;
	};

	return Parallax;
});