define(function() {
	/**
	 * @param {PIXI.Container|Container} stage
	 * @param {PIXI.Container|Container|Circle} entity
	 * @constructor
	 */
	function CameraFollow(stage, entity) {

		var catchup = 5;
		var speed = .01;

		stage.pivot.x = entity.x;
		stage.pivot.y = entity.y;

		/**
		 * call on each animation cycle
		 */
		this.tick = function CameraFollowTick() {
			var diffX = stage.pivot.x - entity.x;
			var diffY = stage.pivot.y - entity.y;
			var diffAbsX = Math.abs(diffX);
			var diffAbsY = Math.abs(diffY);
			var moveX;
			var moveY;

			if(diffAbsX > catchup || diffAbsY > catchup) {
				moveX = speed * (diffX > 0 ? -1 : 1) * Math.pow((diffAbsX + catchup) * .4, 2);
				stage.pivot.x += moveX;

				moveY = speed * (diffY > 0 ? -1 : 1) * Math.pow((diffAbsY + catchup) * .4, 2);
				stage.pivot.y += moveY;
			}
		};
	}

	return CameraFollow;
});