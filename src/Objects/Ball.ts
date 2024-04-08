import { Vector } from "./Vector";
export class Ball {
    id: number;
    position: Vector;
    radius: number;
    color: string;
    velocity: Vector;
    mass: number;
    context: CanvasRenderingContext2D;
    collisions: number[];
    constructor(
        id: number,
        position: Vector,
        radius: number,
        color: string,
        velocity: Vector,
        mass: number,
        colisions: number[],
        context: CanvasRenderingContext2D
    ) {
        this.id = id;
        this.position = position;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.mass = mass;
        this.collisions = colisions;
        this.context = context;
    }
    drawBall() {
        this.context.beginPath();
        this.context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
    collisionVector(b1: Ball, b2: Ball) {
        return b1.velocity.subtract(
            b1.position
                .subtract(b2.position)

                .multiply(
                    b1.velocity
                        .subtract(b2.velocity)
                        .dotProduct(b1.position.subtract(b2.position)) /
                        b1.position.subtract(b2.position).magnitude ** 2
                )

                .multiply((2 * b2.mass) / (b1.mass + b2.mass))
        );
    }
    update(balls: Ball[], updateId: number) {
        if (this.collisions.length > 10) {
            this.collisions = this.collisions.slice(this.collisions.length - 3);
        }

        const upperLimit = new Vector(
            this.context.canvas.width - this.radius,
            this.context.canvas.height - this.radius
        );
        const lowerLimit = new Vector(0 + this.radius, 0 + this.radius);

        if (
            this.position.x >= upperLimit.x ||
            this.position.x <= lowerLimit.x
        ) {
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        }

        if (
            this.position.y >= upperLimit.y ||
            this.position.y <= lowerLimit.y
        ) {
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        }

        for (let ball of balls) {
            if (
                this.id === ball.id ||
                this.collisions.includes(ball.id + updateId)
            ) {
                continue;
            }

            const distance = this.position
                .add(this.velocity)
                .subtract(ball.position.add(ball.velocity)).magnitude;

            if (distance <= this.radius + ball.radius) {
                const v1 = this.collisionVector(this, ball);
                const v2 = this.collisionVector(ball, this);

                this.velocity = v1;
                ball.velocity = v2;

                this.collisions.push(ball.id + updateId);
                ball.collisions.push(this.id + updateId);
            }
        }

        const newX = Math.max(
            Math.min(this.position.x + this.velocity.x, upperLimit.x),
            lowerLimit.x
        );

        const newY = Math.max(
            Math.min(this.position.y + this.velocity.y, upperLimit.y),
            lowerLimit.y
        );

        this.position = new Vector(newX, newY);
        this.velocity = this.velocity.multiply(0.99);
        this.drawBall();
    }
}
