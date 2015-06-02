define(function() {
	/**
	 * @param {PIXI.Container|Container} stage
	 * @param {PIXI.Container|Container} entity
	 * @constructor
	 */
	function Camera(stage, entity) {

		var catchup = 5;

		var pivot = {
			steps: .01
		};

		var scale = {
			min: .8,
			max: 1,
			steps:.003
		};

		stage.pivot.x = entity.x;
		stage.pivot.y = entity.y;

		this.tick = function() {
			var pivotX = entity.x;
			var pivotY = entity.y;
			var diffX = stage.pivot.x - pivotX;
			var diffY = stage.pivot.y - pivotY;
			var diffAbsX = Math.abs(diffX);
			var diffAbsY = Math.abs(diffY);
			var moveX;
			var moveY;

			if(diffAbsX > catchup || diffAbsY > catchup) {
				moveX = (diffX > 0 ? -pivot.steps : pivot.steps) * Math.pow((diffAbsX + catchup) * .4, 2);
				stage.pivot.x += moveX;

				moveY = (diffY > 0 ? -pivot.steps : pivot.steps) * Math.pow((diffAbsY + catchup) * .4, 2);
				stage.pivot.y += moveY;

				//if(stage.scale.x > scale.min) {
				//	stage.scale.x = stage.scale.y = stage.scale.x - scale.steps;
				//}
				return;
			}

			//if(stage.scale.x < scale.max) {
			//	stage.scale.x = stage.scale.y = stage.scale.x + scale.steps;
			//}
		};
	}

	return Camera;
});