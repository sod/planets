define(['pixijs', 'pixi/text'], function(PIXI, text) {
	var enemy = {};

	enemy.create = function() {
		var enemyEntity = new PIXI.Container();
		enemyEntity.x = (Math.random() * 400) + 200;
		enemyEntity.y = (Math.random() * 400) + 300;

		var circle = new PIXI.Graphics();
		circle.beginFill(0xFF4136);
		circle.drawCircle(0, 0, 70);

		var name = text.getCentered('Enemy');

		enemyEntity.addChild(circle);
		circle.addChild(name);

		enemyEntity.on('tick', function() {
			//enemyEntity.position.x += .25;
		});

		return enemyEntity;
	};

	return enemy;
});
