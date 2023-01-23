'use strict'

class Character extends MovableObject {
    width = 132;
    height = 275;
    position_x = 120;
    position_y = 180;
    speed = 2.8;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animation();

    }

    animation() {
        this.walkAnimation();
    }

    walkAnimation() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.position_x += this.speed;
                this.directionLeft = false;
            }

            if (this.world.keyboard.LEFT) {
                this.position_x -= this.speed;
                this.directionLeft = true;
            }
            
            this.world.camera_x = -this.position_x;

        }, 1000 / 60)

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

        }, 100)
    };

}
