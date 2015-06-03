define(function() {
	function CollisionManager(entities) {
		var instance = this;

		this.tick = function CollisionManagerTick() {
			var entity1;
			var entity2;

			entities = entities.filter(function(entity) {
				return !entity.destroyed;
			});

			for(entity1 = 0; entity1 < entities.length; entity1 += 1) {
				for(entity2 = entity1 + 1; entity2 < entities.length; entity2 += 1) {
					while(instance.getDistanceBetweenCircles(entities[entity1], entities[entity2]) >= 0
					&& !instance.resolve(entities[entity1], entities[entity2])) {}
				}
			}
		};

		/**
		 * @param {Player|PIXI.Container} entity1
		 * @param {Player|PIXI.Container} entity2
		 * @returns {boolean}
		 */
		this.resolve = function(entity1, entity2) {
			window.console && window.console.log('collision resolve');
			var entity1wins = entity1.volume.radius > entity2.volume.radius;
			var winner = entity1wins ? entity1 : entity2;
			var loser = entity1wins ? entity2 : entity1;

			if(loser.destroyed) {
				return true;
			}

			//var distance = this.getDistanceBetweenCircles(entity1, entity2);

			winner.volume.radius += .4;
			loser.volume.radius -= 1;

			if(loser.volume.radius <= 0) {
				loser.destroy();
				return true;
			}

			return false;
		};

		/**
		 * @see http://stackoverflow.com/a/1736815
		 * @param {Enemy|Player|{volume: Volume, x: Number, y: Number}} entity1
		 * @param {Enemy|Player|{volume: Volume, x: Number, y: Number}} entity2
		 * @returns {Number} (Negative value = they collide by n length, Positive value = they are apart by n length)
		 */
		this.getDistanceBetweenCircles = function(entity1, entity2) {
			var x1 = entity1.x;
			var y1 = entity1.y;
			var x2 = entity2.x;
			var y2 = entity2.y;
			var collisionDistance = entity1.volume.radius + entity2.volume.radius;
			var actualDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			return collisionDistance - actualDistance;
		};
	}

	return CollisionManager;
});