/// <reference types="./src/m4m" />
import vector3 = m4m.math.vector3;
export interface InputMap {
    /**
     * 点击移动
     * @param x x与上一帧的差距
     * @param y y与上一帧的差距
     */
    TouchMove(x: number, y: number): void;
    /**
     * 拖拽视角移动
     * @param x x与上一帧的差距
     * @param y y与上一帧的差距
     */
    TouchViewMove(x: number, y: number): void;
    /**
     * 点击缩放
     */
    TouchScale(delta: number): void;
    /**
     * 点击按下
     */
    TouchDown(): void;
    /**
     * 点击事件
     */
    TouchClick(): void;
    /**
     * 点击松开
     */
    TouchUp(): void;
    /**
     * WASD-QE移动
     * @param delta 移动的量
     */
    PlayerMove(delta: vector3): void;
}
