'use strict'

class Clouds extends MovableObject {
    width = 1500;
    height = 420;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.position_x = -100 + Math.random() * 80;
        this.position_y = 0;
        this.animation();
    };



    animation() {
        this.moveLeft();
    }
}