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
	'pixi/behaviour/camera',
	'pixi/event',
	'pixi/collision'
], function(PIXI, playerEntity, controllable, Camera, event, collision) {

	/**
	 * @returns {HTMLElement}
	 */
	function getDomContainer() {
		return document.getElementById('game');
	}

	/**
	 * @param {HTMLElement} element
	 * @returns {{width: Number, height: Number}
	 */
	function getClientRects(element) {
		return element.getClientRects()[0];
	}

	/**
	 * @param {PIXI.WebGLRenderer|module.exports.autoDetectRenderer} renderer
	 * @param {HTMLElement} element
	 * @param {PIXI.Container} canvas
	 */
	function resize(renderer, element, canvas) {
		var rects = getClientRects(element);
		renderer.resize(rects.width, rects.height);
		canvas.pivot.x = -(rects.width / 2);
		canvas.pivot.y = -(rects.height / 2);
	}

	var renderer = new PIXI.autoDetectRenderer(0, 0, {
		backgroundColor: 0xEEEEEE,
		antialias: true
	});

	document.getElementById('game').appendChild(renderer.view);

	var canvas = new PIXI.Container();
	var stage = new PIXI.Container();
	canvas.addChild(stage);
	var entities = [];

	// add player
	var player = playerEntity.create();
	player.setColor(0x0074D9);
	player.setRadius(100);
	player.setName('Player');
	controllable(player);
	var camera = new Camera(stage, player);
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

	resize(renderer, getDomContainer(), canvas);
	window.addEventListener('resize', resize.bind(null, renderer, getDomContainer(), canvas));

	// kick off the animation loop (defined below)
	animate();

	function animate() {
		requestAnimationFrame(animate);

		//console.time('tick');
		event.emit(entities, 'tick');
		camera.tick();
		//console.timeEnd('tick');

		//console.time('collision');
		collision.testEach(entities);
		//console.timeEnd('collision');

		//console.time('render');
		renderer.render(canvas);
		//console.timeEnd('render');
	}

	window.x = getDomContainer();
	window.collision = collision;
	window.renderer = renderer;
	window.stage = stage;
	window.camera = camera;
	window.entities = entities;
});