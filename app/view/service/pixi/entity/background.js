define([
	'PIXI',
	'pixi/renderer',
	'service/event/resize'
], function(PIXI, renderer, resize) {
	/**
	 * @param {Texture} texture
	 * @constructor
	 */
	function Background(texture) {
		PIXI.extras.TilingSprite.call(this, texture, texture.baseTexture.width, texture.baseTexture.height);

		resize.on(function() {
			this.updateViewport(renderer.getContainerRect());
		}, this);
	}

	Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
	Background.prototype.constructor = Background;

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