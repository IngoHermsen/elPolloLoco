'use strict'

class ChickenSmall extends Enemy {
    spawn_position_x = 400;
    walkAnimationImages = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    deadImage = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    constructor(spawn_position_x, direction) {
        super().createSingleImageObject('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.createSeveralImageObjects(this.walkAnimationImages);
        this.health = 40;
        this.width = 70;
        this.height = 70;
        this.position_x = spawn_position_x + Math.random() * 500;
        this.position_y = 380;
        this.dealingDamage = 12;
        this.animation(direction);
    };
}