requirejs.config({
	paths: {
		pixijs: "/pixi.js/bin/pixi",
		pixi: "/service/pixi",
		service: "/service"
	}
});

define([
	'pixijs',
	'pixi/entity/player',
	'pixi/entity/enemy',
	'pixi/event',
	'pixi/collision'
], function(PIXI, playerEntity, enemyEntity, event, collision) {

	/**
	 * @returns {HTMLElement}
	 */
	function getDomContainer() {
		return document.getElementById('game');
	}

	window.x = getDomContainer();

	/**
	 * @param {HTMLElement} element
	 * @returns {{width: Number, height: Number}
	 */
	function getClientRects(element) {
		return element.getClientRects()[0];
	}

	/**
	 * @param {PIXI.WebGLRenderer} renderer
	 * @param {HTMLElement} element
	 */
	function resize(renderer, element) {
		var rects = getClientRects(element);
		renderer.resize(rects.width, rects.height);
	}

	var renderer = new PIXI.autoDetectRenderer(0, 0, {
		backgroundColor: 0xEEEEEE,
		antialias: true
	});

	resize(renderer, getDomContainer());
	window.addEventListener('resize', resize.bind(null, renderer, getDomContainer()));

	document.getElementById('game').appendChild(renderer.view);

	var stage = new PIXI.Container();
	var entities = [];

	// add player
	var player = playerEntity.create();
	entities.push(player);
	stage.addChild(player);

	// add enemies for testing
	[1,2].forEach(function() {
		var enemy = enemyEntity.create();
		entities.push(enemy);
		stage.addChild(enemy);
	});

	// kick off the animation loop (defined below)
	animate();

	function animate() {
		requestAnimationFrame(animate);

		//console.time('tick');
		event.emit(entities, 'tick');
		//console.timeEnd('tick');

		//collision.testEach(entitiesContainer);

		//console.time('render');
		renderer.render(stage);
		//console.timeEnd('render');
	}

	return 1;
});