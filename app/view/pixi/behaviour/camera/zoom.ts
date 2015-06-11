///<reference path="../../../../typedef/require.d.ts" />
///<reference path="../../../../typedef/pixi.d.ts" />

import PIXI = require('PIXI');
import TWEEN = require('TWEEN');
import Acceleration = require('pixi/property/acceleration');

export = CameraZoom;

class CameraZoom {
    private scaleOut: number = 0.6;
    private scaleIn: number = 1;
    private scale: number = 0;
    private zoomOut: number;
    private zoomIn: number;
    private tw: TWEEN.Tween;

    constructor(public stage: PIXI.Container, public acceleration: Acceleration) {
        this.tw = (new TWEEN.Tween(stage.scale)).easing(TWEEN.Easing.Cubic.InOut);
        this.zoomOut = this.acceleration.max * 0.4;
        this.zoomIn = this.acceleration.max * 0.2;
    }

    tweenTo(scale: number) {
        this.scale = scale;
        this.tw.to({
            x: scale,
            y: scale
        }, 1800).start();
    }

    tick() {
        var time = PIXI.ticker.shared.lastTime;
        var velocity = this.acceleration.getVelocity();
        if (velocity < this.zoomIn && this.scale !== this.scaleIn) {
            this.tweenTo(this.scaleIn);
        } else if (velocity > this.zoomOut && this.scale !== this.scaleOut) {
            this.tweenTo(this.scaleOut);
        }

        if (this.stage.scale.x !== this.scale) {
            this.tw.update(time);
        }
    }
}