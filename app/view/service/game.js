require.config({
	shim: {
		Quadtree: {
			exports: 'Quadtree'
		},
	},
	paths: {
		PIXI: '/vendor/pixi.js/bin/pixi',
		TWEEN: '/vendor/tweenjs/src/Tween',
		Quadtree: '/vendor/quadtree-js/quadtree'
	}
});

define([
	'PIXI',
	'TWEEN',
	'service/debug',
	'pixi/renderer',
	'pixi/entity/player',
	'pixi/entity/particle',
	'pixi/entity/background',
	'pixi/behaviour/background/parallax',
	'pixi/behaviour/controllable/byKeyboard',
	'pixi/behaviour/controllable/byMouse',
	'pixi/behaviour/camera/follow',
	'pixi/behaviour/camera/zoom',
	'pixi/manager/collision',
	'pixi/ticker'
], function(PIXI, TWEEN, debug, renderer, Player, Particle, Background, Parallax, InputByKeyboard, InputByMouse, CameraFollow, CameraZoom, CollisionManager, ticker) {

	/**
	 * @param {number} scatter
	 * @returns {number}
	 */
	function getRandomPosition(scatter) {
		return (Math.random() * scatter) + 100;
	}

	function start() {
		var stage = new PIXI.Container();
		var container = renderer.container;
		var background1 = Parallax.extend(new Background(PIXI.loader.resources.background1.texture), stage, 8);
		var background2 = Parallax.extend(new Background(PIXI.loader.resources.background2.texture), stage, 7);
		container.addChild(background1);
		container.addChild(background2);
		container.addChild(stage);

		var players = new PIXI.Container();
		var particles = new PIXI.Container();
		stage.addChild(players);
		stage.addChild(particles);

		// add player
		var player = new Player(getRandomPosition(500), getRandomPosition(500), 100);
		player.setColor(0x0074D9);
		player.setName('(ツ)', 0x0000FF);
		players.addChild(player);

		//debug.setThreshold(0.5).start();
		//debug.setThreshold(0.5).once();

		// add behaviour
		ticker.add(new InputByKeyboard(player));
		//ticker.add(new InputByMouse(player));
		ticker.add(new CameraFollow(stage, player));
		ticker.add(new CameraZoom(stage, player.acceleration));

		ticker.add(renderer);
		ticker.add(new CollisionManager(stage, [players.children], [particles.children]));

		// add fake enemies
		Array.apply(null, Array(100)).forEach(function(number, index) {
			var enemy = new Player(81 * index, getRandomPosition(500), 40);
			enemy.setColor(0xFF4136);
			enemy.setName('Enemy ' + (index + 1), 0xEEEEEE);
			players.addChild(enemy);
		});

		// add fake particles
		Array.apply(null, Array(500)).forEach(function(number, index) {
			var particle = new Particle(21 * index, getRandomPosition(5000), 10);
			particles.addChild(particle);
		});

		// for development expose some globals
		window.renderer = renderer;
		window.stage = stage;
		window.particles = particles;
		window.players = players;

		// start ticker
		ticker.start();
		renderer.setDomContainer(document.getElementById('game'));
	}

	PIXI.loader.add('background1', '/image/background1.png');
	PIXI.loader.add('background2', '/image/background2.png');
	PIXI.loader.load(start);
});