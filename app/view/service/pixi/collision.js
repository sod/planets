define(function() {
	var collision = {};

	collision.resolve = function(entity1, entity2) {
		var entity1wins = entity1.volume.radius > entity2.volume.radius;
		var winner = entity1wins ? entity1 : entity2;
		var loser = entity1wins ? entity2 : entity1;

		if(loser.destroyed) {
			return true;
		}

		winner.volume.radius += .2;
		loser.volume.radius -= .5;

		if(loser.volume.radius <= 0) {
			loser.destroy();
			return true;
		}

		return false;
	};

	collision.testEach = function(entities) {
		var entity1;
		var entity2;

		entities = entities.filter(function(entity) {
			return !entity.destroyed;
		});

		for(entity1 = 0; entity1 < entities.length; entity1 += 1) {
			for(entity2 = entity1 + 1; entity2 < entities.length; entity2 += 1) {
				while(collision.testCircle(entities[entity1], entities[entity2])
					&& !collision.resolve(entities[entity1], entities[entity2])) {}
			}
		}
	};

	/**
	 * @see http://stackoverflow.com/a/1736815
	 * @param {Enemy|Player|{volume: Volume, x: Number, y: Number}} entity1
	 * @param {Enemy|Player|{volume: Volume, x: Number, y: Number}} entity2
	 */
	collision.testCircle = function(entity1, entity2) {
		var x1 = entity1.x;
		var y1 = entity1.y;
		var x2 = entity2.x;
		var y2 = entity2.y;
		var collisionDistance = entity1.volume.radius + entity2.volume.radius;
		var actualDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		return actualDistance <= collisionDistance;
	};

	return collision;
});