define(['TWEEN'], function(TWEEN) {
	/**
	 * @param {PIXI.Container|Container} stage
	 * @param {Acceleration} acceleration
	 * @constructor
	 */
	function CameraZoom(stage, acceleration) {

		var zoomOut = acceleration.max * .4;
		var zoomIn = acceleration.max * .2;
		var scaleOut = .6;
		var scaleIn = 1;
		var scale = 0;
		var tw = (new TWEEN.Tween(stage.scale)).easing(TWEEN.Easing.Cubic.InOut);

		/**
		 * call on each animation cycle
		 */
		this.tick = function CameraZoomTick(time) {
			var speed = Math.max(acceleration.up, acceleration.left, acceleration.down, acceleration.right);
			if(speed < zoomIn && scale !== scaleIn) {
				scale = scaleIn;
				tw.to({x: scale, y: scale}, 1800).start();
			} else if(speed > zoomOut && scale !== scaleOut) {
				scale = scaleOut;
				tw.to({x: scale, y: scale}, 1800).start();
			}

			if(stage.scale.x !== scale) {
				tw.update(time);
			}
		};
	}

	return CameraZoom;
});