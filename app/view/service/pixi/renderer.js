define([
	'PIXI',
	'service/event/resize'
], function(PIXI, resize) {
	var domContainer = document.body;
	var renderer = new PIXI.autoDetectRenderer(0, 0, {
		backgroundColor: 0xEEEEEE,
		antialias: true
	});

	renderer.container = new PIXI.Container();

	renderer.tick = function PixiRendererTick() {
		renderer.render(renderer.container);
	};

	renderer.getContainerRect = function() {
		return domContainer.getClientRects()[0];
	};

	renderer.setDomContainer = function(element) {
		domContainer = element;
		element.appendChild(renderer.view);
	};

	renderer.setViewport = function() {
		var rect = renderer.getContainerRect();
		renderer.resize(rect.width, rect.height);
		renderer.container.pivot.x = -(rect.width / 2);
		renderer.container.pivot.y = -(rect.height / 2);
	};

	resize.on(renderer.setViewport);

	return renderer;
})