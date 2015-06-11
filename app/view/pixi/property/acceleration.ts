export = Acceleration;

class Acceleration {
    public x: number = 0;
    public y: number = 0;
    static coords: string[] = ['x', 'y'];

    constructor(public max: number, public steps: number) {
    }

    enforceBoundaries() {
        Acceleration.coords.forEach(coord => {
            if (Math.abs(this[coord]) > this.max) {
                this[coord] = this[coord] < 0 ? -this.max : this.max;
            }
        });
    }

    increaseByDelta(deltaY: number, deltaX: number, multiplier: number) {
        var normalize = Math.abs(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY);
        this.x += deltaX / normalize * (multiplier || 1);
        this.y += deltaY / normalize * (multiplier || 1);
        this.enforceBoundaries();
    }

    decrease(multiplier: number) {
        var steps = this.steps * multiplier;
        Acceleration.coords.forEach(coord => {
            if (Math.abs(this[coord]) < steps) {
                this[coord] = 0;
                return;
            }
            this[coord] = this[coord] - ((this[coord] < 0 ? -1 : +1) * steps);
        });
    }

    getVelocity(): number {
        return Math.max(Math.abs(this.x), Math.abs(this.y));
    }
}