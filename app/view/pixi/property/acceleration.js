define(["require", "exports"], function (require, exports) {
    var Acceleration = (function () {
        function Acceleration(max, steps) {
            this.max = max;
            this.steps = steps;
            this.x = 0;
            this.y = 0;
        }
        Acceleration.prototype.enforceBoundaries = function () {
            var _this = this;
            Acceleration.coords.forEach(function (coord) {
                if (Math.abs(_this[coord]) > _this.max) {
                    _this[coord] = _this[coord] < 0 ? -_this.max : _this.max;
                }
            });
        };
        Acceleration.prototype.increaseByDelta = function (deltaY, deltaX, multiplier) {
            var normalize = Math.abs(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);
            this.x += deltaX / normalize * (multiplier || 1);
            this.y += deltaY / normalize * (multiplier || 1);
            this.enforceBoundaries();
        };
        Acceleration.prototype.decrease = function (multiplier) {
            var _this = this;
            var steps = this.steps * multiplier;
            Acceleration.coords.forEach(function (coord) {
                if (Math.abs(_this[coord]) < steps) {
                    _this[coord] = 0;
                    return;
                }
                _this[coord] = _this[coord] - ((_this[coord] < 0 ? -1 : +1) * steps);
            });
        };
        Acceleration.prototype.getVelocity = function () {
            return Math.max(Math.abs(this.x), Math.abs(this.y));
        };
        Acceleration.coords = ['x', 'y'];
        return Acceleration;
    })();
    return Acceleration;
});
//# sourceMappingURL=acceleration.js.map