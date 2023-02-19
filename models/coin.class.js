'use strict'

class Coin extends MovableObject {
    type;
    value;
    width = 60;
    height = 60;
    id;
    world;

    constructor(type, id, pos_x) {
        super();
        this.setValueAndImage(type);
        this.groundPosition_y = 150;
        this.position_y = this.groundPosition_y;
        this.position_x = pos_x;
        this.collisionOffset_x = 40;
        this.id = id;
    };

    setValueAndImage(type) {
        if (type = 1) {
            this.value = 1;
            this.createSingleImageObject('img/8_coin/coin_1.png');
            this.width = 100;
            this.height = 100;
        } else {
            this.value = 3;
            this.createSingleImageObject('img/8_coin/coin_2.png');
            this.width = 300;
            this.height = 300;
        }
    };
}