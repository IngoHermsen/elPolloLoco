'use strict'

class Chicken extends MovableObject {
        width = 70;
        height = 70;
        position_x = 400 + Math.random() * 500;
        position_y = 380;
        IMAGES_WALKING = [
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ]
        minimum_speed = 0.4;
        maximum_speed = 0.8;
        speed = Math.random() * (this.maximum_speed - this.minimum_speed) + this.minimum_speed;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.walkAnimation();
    }
    

    walkAnimation() {  
        this.moveLeft();     
        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 100);

    }

}