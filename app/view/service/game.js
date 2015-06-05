requirejs.config({
	paths: {
		PIXI: '/pixi.js/bin/pixi',
		TWEEN: '/tweenjs/src/Tween',
		quadtree: '/quadtree-js/quadtree',
		pixi: '/service/pixi',
		service: '/service'
	}
});

define([
	'PIXI',
	'TWEEN',
	'service/debug',
	'pixi/entity/player',
	'pixi/entity/particle',
	'pixi/behaviour/controllable/byKeyboard',
	'pixi/behaviour/camera/follow',
	'pixi/behaviour/camera/zoom',
	'pixi/manager/collision',
	'pixi/ticker'
], function(PIXI, TWEEN, debug, Player, Particle, InputByKeyboard, CameraFollow, CameraZoom, CollisionManager, ticker) {

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

	/**
	 * @param {number} scatter
	 * @returns {number}
	 */
	function getRandomPosition(scatter) {
		return (Math.random() * scatter) + 100;
	}

	function start() {
		var renderer = new PIXI.autoDetectRenderer(0, 0, {
			backgroundColor: 0xEEEEEE,
			antialias: true
		});

		var canvas = new PIXI.Container();
		var stage = new PIXI.Container();
		var players = new PIXI.Container();
		var particles = new PIXI.Container();

		canvas.addChild(stage);
		stage.addChild(players);
		stage.addChild(particles);

		// add player
		var player = new Player(getRandomPosition(500), getRandomPosition(500), 100);
		player.setColor(0x0074D9);
		player.setName('Player');
		players.addChild(player);

		// add enemies for testing
		Array.apply(null, Array(100)).forEach(function(number, index) {
			var enemy = new Player(81 * index, getRandomPosition(500), 40);
			enemy.setColor(0xFF4136);
			enemy.setName('Enemy ' + (index + 1));
			players.addChild(enemy);
		});

		// add particles for testing
		Array.apply(null, Array(1000)).forEach(function(number, index) {
			var particle = new Particle(21 * index, getRandomPosition(5000), 10);
			particles.addChild(particle);
		});

		resize(renderer, getDomContainer(), canvas);
		window.addEventListener('resize', resize.bind(null, renderer, getDomContainer(), canvas));

		window.x = getDomContainer();
		window.renderer = renderer;
		window.canvas = canvas;
		window.stage = stage;

		debug.setThreshold(0.5).start();
		//debug.setThreshold(0.5).once();

		// add behaviour
		ticker.add(new InputByKeyboard(player));
		ticker.add(new CameraFollow(stage, player));
		ticker.add(new CameraZoom(stage, player.acceleration));

		function PixiRender() {
			renderer.render(canvas);
		}

		ticker.add(PixiRender);
		ticker.addPerSecond(30, new CollisionManager(stage, [players.children, particles.children]));

		// just render once:
		//ticker.stop();
		//ticker.update();

		document.getElementById('game').appendChild(renderer.view);
	}


	PIXI.loader.add('particle', '/image/particle.png');
	PIXI.loader.load(start);
});