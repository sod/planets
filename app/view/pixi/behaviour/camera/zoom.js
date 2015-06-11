///<reference path="../../../../typedef/require.d.ts" />
///<reference path="../../../../typedef/pixi.d.ts" />
define(["require", "exports", 'PIXI', 'TWEEN'], function (require, exports, PIXI, TWEEN) {
    var CameraZoom = (function () {
        function CameraZoom(stage, acceleration) {
            this.stage = stage;
            this.acceleration = acceleration;
            this.scaleOut = 0.6;
            this.scaleIn = 1;
            this.scale = 0;
            this.tw = (new TWEEN.Tween(stage.scale)).easing(TWEEN.Easing.Cubic.InOut);
            this.zoomOut = this.acceleration.max * 0.4;
            this.zoomIn = this.acceleration.max * 0.2;
        }
        CameraZoom.prototype.tweenTo = function (scale) {
            this.scale = scale;
            this.tw.to({
                x: scale,
                y: scale
            }, 1800).start();
        };
        CameraZoom.prototype.tick = function () {
            var time = PIXI.ticker.shared.lastTime;
            var velocity = this.acceleration.getVelocity();
            if (velocity < this.zoomIn && this.scale !== this.scaleIn) {
                this.tweenTo(this.scaleIn);
            }
            else if (velocity > this.zoomOut && this.scale !== this.scaleOut) {
                this.tweenTo(this.scaleOut);
            }
            if (this.stage.scale.x !== this.scale) {
                this.tw.update(time);
            }
        };
        return CameraZoom;
    })();
    return CameraZoom;
});
//# sourceMappingURL=zoom.js.map