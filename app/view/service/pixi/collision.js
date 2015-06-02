define(function() {
	var collision = {};

	collision.testEach = function(entities) {
		var index = 0;
		for(; index < entities.length; index++) {
			entities.forEach()
		}
	};

	/**
	 * @see http://stackoverflow.com/a/1736815
	 * @param {Enemy|Player} entity1
	 * @param {Enemy|Player} entity2
	 */
	collision.testCircle = function(entity1, entity2) {
		var radius1 = entity1.volume.radius;
		var x1 = entity1.x + radius1;
		var y1 = entity1.y + radius1;
		var radius2 = entity2.volume.radius;
		var x2 = entity2.x + radius2;
		var y2 = entity2.y + radius2;
		var collisionDistance = radius1 + radius2;
		var actualDistance = Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) );
		return actualDistance <= collisionDistance;
	};

	return collision;
});