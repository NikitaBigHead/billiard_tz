export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returning a new Vector creates immutability
     * and allows chaining. These properties are
     * extremely useful with the complex formulas
     * we'll be using.
     **/
    add(vector: Vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    dotProduct(vector: Vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    normalize() {
        const magnitude = this.magnitude;
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    get direction() {
        return Math.atan2(this.x, this.y);
    }
}
