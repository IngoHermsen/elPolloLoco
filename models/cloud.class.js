'use strict'

class Clouds extends MovableObject {
    width = 1500;
    height = 420;

    constructor(x) {
        super().createSingleImageObject('img/5_background/layers/4_clouds/full.png');
        this.position_x = x;
        this.position_y = 0;
        this.animation();
    };

    animation() {
        this.moveLeft();
    };
}