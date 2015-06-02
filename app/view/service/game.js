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
	'pixi/behaviour/controllable',
	'pixi/event',
	'pixi/collision'
], function(PIXI, playerEntity, controllable, event, collision) {

	/**
	 * @returns {HTMLElement}
	 */
	function getDomContainer() {
		return document.getElementById('game');
	}

	window.x = getDomContainer();
	window.collision = collision;

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

	window.entities = entities;

	// add player
	var player = playerEntity.create();
	player.setColor(0x0074D9);
	player.setRadius(100);
	player.setName('Player');
	controllable(player);
	entities.push(player);
	stage.addChild(player);

	// add enemies for testing
	Array.apply(null, Array(3)).forEach(function(number, index) {
		var enemy = playerEntity.create();
		enemy.setColor(0xFF4136);
		enemy.setRadius(35);
		enemy.setName('Enemy ' + (index + 1));
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

		//console.time('collision');
		collision.testEach(entities);
		//console.timeEnd('collision');

		//console.time('render');
		renderer.render(stage);
		//console.timeEnd('render');
	}

	return 1;
});