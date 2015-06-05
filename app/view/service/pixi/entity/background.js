define([
	'PIXI',
	'pixi/ticker',
	'pixi/renderer',
	'service/event/resize'
], function(PIXI, ticker, renderer, resize) {
	PIXI.loader.add('background', '/image/background.png');

	/**
	 * @constructor
	 */
	function Background(stage) {
		PIXI.extras.TilingSprite.call(this, PIXI.loader.resources.background.texture, 512, 512);

		ticker.add(function BackgroundTick() {
			this.applyParallaxEffect(stage);
		}, this);

		resize.on(function() {
			this.updateViewport(renderer.getContainerRect())
		}, this);
	}

	Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
	Background.prototype.constructor = Background;

	/**
	 * @param {Container|PIXI.Container} stage
	 */
	Background.prototype.applyParallaxEffect = function(stage) {
		this.tilePosition.x = stage.pivot.x / -10;
		this.tilePosition.y = stage.pivot.y / -10;
	};

	/**
	 * update viewport
	 */
	Background.prototype.updateViewport = function(rect) {
		this.width = rect.width;
		this.height = rect.height;
		this.position.x = -(rect.width / 2);
		this.position.y = -(rect.height / 2);
	};

	return Background;
});