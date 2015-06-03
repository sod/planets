requirejs.config({
	paths: {
		PIXI: '/pixi.js/bin/pixi',
		TWEEN: '/tweenjs/src/Tween',
		pixi: '/service/pixi',
		service: '/service'
	}
});

define([
	'PIXI',
	'TWEEN',
	'pixi/entity/player',
	'pixi/behaviour/controllable/byKeyboard',
	'pixi/behaviour/camera/follow',
	'pixi/behaviour/camera/zoom',
	'pixi/manager/collision'
], function(PIXI, TWEEN, playerEntity, InputByKeyboard, CameraFollow, CameraZoom, CollisionManager) {

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

	// add player
	var player = playerEntity.create();
	player.setColor(0x0074D9);
	player.setRadius(100);
	player.setName('Player');
	stage.addChild(player);

	// add enemies for testing
	Array.apply(null, Array(3)).forEach(function(number, index) {
		var enemy = playerEntity.create();
		enemy.setColor(0xFF4136);
		enemy.setRadius(35);
		enemy.setName('Enemy ' + (index + 1));
		stage.addChild(enemy);
	});

	resize(renderer, getDomContainer(), canvas);
	window.addEventListener('resize', resize.bind(null, renderer, getDomContainer(), canvas));

	var ticker = PIXI.ticker.shared;

	// add behaviour
	ticker.add((new InputByKeyboard(player)).tick);
	ticker.add((new CameraFollow(stage, player)).tick);
	ticker.add((new CameraZoom(stage, player.acceleration)).tick);
	ticker.add((new CollisionManager(stage.children)).tick);

	ticker.add(function(time) {
		stage.children.forEach(function(entity) {
			entity.tick(time);
		});
	});

	ticker.add(renderer.render.bind(renderer, canvas));

	window.x = getDomContainer();
	window.renderer = renderer;
	window.stage = stage;
});