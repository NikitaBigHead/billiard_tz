import React, { useRef, useEffect, useState } from "react";
import styles from "./GameField.module.css";
import { Ball } from "../../Objects/Ball";
import { Vector } from "../../Objects/Vector";

export default function GameField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ballDivs, setBallDivs] = useState<React.ReactElement[]>([]);
    const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
    const [pickedBall, setPickedBall] = useState<Ball>();

    const drawCanvas = (context: CanvasRenderingContext2D, balls: Ball[]) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (let ball of balls) {
            ball.update(balls, new Date().valueOf());
        }

        setBallDivs(
            balls.map(
                (ball): React.ReactElement => (
                    <div
                        key={ball.id}
                        onMouseEnter={(e) => onMouseEnterBall(e, ball)}
                        onMouseDown={(e) => onMouseClickBall(e, ball)}
                        style={{
                            width: ball.radius * 2,
                            height: ball.radius * 2,
                            top: ball.position.y - ball.radius,
                            left: ball.position.x - ball.radius,
                        }}
                        className={styles.ball}
                    ></div>
                )
            )
        );
    };

    const onMouseEnterBall = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        ball: Ball
    ) => {
        if (canvasRef.current === null || canvasRef.current === undefined)
            return;

        let offsetBallX = (window.innerWidth - canvasRef.current.width) / 2;
        let offsetBallY = (window.innerHeight - canvasRef.current.height) / 2;
        let screenPositionBall = new Vector(
            offsetBallX + ball.position.x,
            offsetBallY + ball.position.y
        );

        let screenEnterBall = new Vector(e.clientX, e.clientY);

        let direction = screenPositionBall
            .subtract(screenEnterBall)
            .normalize();
        ball.velocity = direction.multiply(5);
    };

    const onMouseClickBall = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        ball: Ball
    ) => {
        setPickedBall(ball);
        setOpenMenu(true);
    };

    const onPickColor = (color: string) => {
        if (pickedBall !== null && pickedBall !== undefined) {
            pickedBall.color = color;
        }
    };
    const onChangeRadius = (radius: string) => {
        if (pickedBall !== null && pickedBall !== undefined) {
            pickedBall.radius = Number(radius) > 0 ? Number(radius) : 1;
        }
    };
    const onChangeMass = (mass: string) => {
        if (pickedBall !== null && pickedBall !== undefined) {
            pickedBall.mass = Number(mass) > 0 ? Number(mass) : 1;
        }
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context) {
            let balls: Ball[] = [
                new Ball(
                    1,
                    new Vector(500, 500),
                    50,
                    "#FF47CA",
                    new Vector(0, 0),
                    20,
                    [],
                    context
                ),
                new Ball(
                    2,
                    new Vector(100, 70),
                    30,
                    "#BC987E",
                    new Vector(0, 0),
                    10,
                    [],
                    context
                ),
                new Ball(
                    3,
                    new Vector(200, 80),
                    10,
                    "#B5B8B1",
                    new Vector(0, 0),
                    5,
                    [],
                    context
                ),
                new Ball(
                    4,
                    new Vector(125, 500),
                    40,
                    "#FF8800",
                    new Vector(0, 0),
                    15,
                    [],
                    context
                ),
                new Ball(
                    5,
                    new Vector(300, 300),
                    70,
                    "#1560BD",
                    new Vector(0, 0),
                    50,
                    [],
                    context
                ),
                new Ball(
                    30,
                    new Vector(200, 200),
                    70,
                    "#6DAE81",
                    new Vector(0, 0),
                    100,
                    [],
                    context
                ),
            ];

            setInterval(() => drawCanvas(context, balls), 20);
        }
    }, []);
    return (
        <>
            {isOpenMenu && (
                <div className={styles.modal}>
                    <label htmlFor="ball_radius">Изменение размера круга</label>
                    <input
                        id="ball_radius"
                        onChange={(e) => onChangeRadius(e.target.value)}
                        value={pickedBall?.radius}
                    />

                    <label htmlFor="ball_mass">Изменение массы круга</label>
                    <input
                        id="ball_mass"
                        onChange={(e) => onChangeMass(e.target.value)}
                        value={pickedBall?.mass}
                    />

                    <label htmlFor="color_picker">Выбер цвета круга</label>
                    <input
                        id="color_picker"
                        type="color"
                        onChange={(e) => onPickColor(e.target.value)}
                        value={pickedBall?.color}
                    />

                    <button
                        className={styles.close_button}
                        onClick={() => setOpenMenu(false)}
                    >
                        X
                    </button>
                </div>
            )}

            <div className={styles.canvas_field}>
                {ballDivs}
                <canvas
                    className={styles.game_field}
                    ref={canvasRef}
                    width={800}
                    height={600}
                />
            </div>
        </>
    );
}
