'use strict'

class Chicken extends Enemy {
    walkAnimationImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    deadImage = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    constructor(spawn_position_x, direction) {
        super().createSingleImageObject('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.createSeveralImageObjects(this.walkAnimationImages);
        this.health = 60;
        this.width = 70;
        this.height = 70;
        this.position_x = spawn_position_x + Math.random() * 500;
        this.position_y = 380;
        this.speed = Math.random() * (this.maximum_speed - this.minimum_speed) + this.minimum_speed;
        this.animation(direction);
    };
}

