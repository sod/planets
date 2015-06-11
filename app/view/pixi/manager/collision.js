define([
	'Quadtree'
], function(Quadtree) {
	var concat = Array.prototype.concat;

	/**
	 * @param {PIXI.Container|{getBounds: Function}} stage
	 * @param {PIXI.Container[]} [entities]
	 * @param {PIXI.Container[]} [ghostEntities] - detect collision with entities, but not with ghostEntities itself
	 * @constructor
	 */
	function CollisionManager(stage, entities, ghostEntities) {
		var instance = this;
		var minRadiusBeforeTotalConsumption = 2;

		this.tick = function CollisionManagerTick() {
			var array = concat.apply([], (entities || []));
			var ghostArray = concat.apply([], (ghostEntities || []));

			var quadtree = new Quadtree(stage.getBounds());

			array.concat(ghostArray).forEach(function(entity) {
				var bounds = entity.getBounds();
				bounds.entity = entity;
				quadtree.insert(bounds);
			});

			array.forEach(function(entity1) {
				var index;
				var entity2;
				var bounds2 = quadtree.retrieve(entity1.getBounds());
				for(index = 0; index < bounds2.length; index += 1) {
					entity2 = bounds2[index].entity;
					if(entity1 !== entity2 && instance.getDistanceBetweenCircles(entity1, entity2) > 0) {
						instance.resolve(entity1, entity2);
					}
				}
			});
		};

		/**
		 * Returns `radius` that `destinationRadius` should gains if source and destination overlap by `radiusCrossover`
		 *
		 * @param {Number} sourceRadius
		 * @param {Number} destinationRadius
		 * @param {Number} radiusCrossover
		 * @returns {Number}
		 */
		this.getRadiusTransfer = function(sourceRadius, destinationRadius, radiusCrossover) {
			var areaWinner = Math.PI * Math.pow(destinationRadius, 2);
			var areaLoser = Math.PI * Math.pow(sourceRadius, 2);
			var areaCoefficient = areaLoser / areaWinner;
			return radiusCrossover * areaCoefficient;
		};

		/**
		 * @param {Player|{radius: Number, destroyed: bool}} entity1
		 * @param {Player|{radius: Number, destroyed: bool}} entity2
		 */
		this.resolve = function(entity1, entity2) {
			var entity1wins = entity1.radius > entity2.radius;
			var winner = entity1wins ? entity1 : entity2;
			var loser = entity1wins ? entity2 : entity1;
			var crossover;
			var transfer;

			if(loser.destroyed) {
				return;
			}

			crossover = loser.radius < minRadiusBeforeTotalConsumption ? loser.radius : Math.min(loser.radius, Math.abs(this.getDistanceBetweenCircles(entity1, entity2)));
			transfer = this.getRadiusTransfer(loser.radius, winner.radius, crossover);

			winner.setRadius(winner.radius + transfer);
			loser.setRadius(Math.max(loser.radius - (crossover + transfer), 0));

			if(loser.radius <= minRadiusBeforeTotalConsumption) {
				loser.destroy();
			}
		};

		/**
		 * @see http://stackoverflow.com/a/1736815
		 * @param {Enemy|Player|{radius: Number, x: Number, y: Number}} entity1
		 * @param {Enemy|Player|{radius: Number, x: Number, y: Number}} entity2
		 * @returns {Number} (Negative value = they collide by n length, Positive value = they are apart by n length)
		 */
		this.getDistanceBetweenCircles = function(entity1, entity2) {
			var collisionDistance = entity1.radius + entity2.radius;
			var actualDistance = Math.sqrt(Math.pow(entity2.x - entity1.x, 2) + Math.pow(entity2.y - entity1.y, 2));
			return collisionDistance - actualDistance;
		};
	}

	return CollisionManager;
});