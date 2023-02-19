'use strict'

class Bottle extends MovableObject {
    width = 60;
    height = 60;
    id;
    world;
    randomImg = Math.ceil(Math.random() * 2);

    constructor(id, pos_x) {
        super().createSingleImageObject(`img/6_salsa_bottle/${this.randomImg}_salsa_bottle_on_ground.png`);
        this.width = 60;
        this.height = 60;
        this.groundPosition_y = 385;
        this.position_y = this.groundPosition_y;
        this.position_x = pos_x;
        this.collisionOffset_x = 40;
        this.id = id;
    };
}