'use strict'

class ThrownBottle extends MovableObject {
    splash = false;
    destroyed = false;
    dealingDamage = 20;


    constructor(pos_x, pos_y, direction) {
        super().width = 60;
        this.height = 60;
        this.position_x = pos_x;
        this.position_y = pos_y;
        this.distance_Y = 15;
        this.collisionOffset_x = 40;
        this.otherDirection = direction;
        this.speed = 0.7;

        this.createSingleImageObject(`img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png`);
        this.createSeveralImageObjects(animationImg.bottle.rotateAnimationImages);
        this.createSeveralImageObjects(animationImg.bottle.splashAnimationImages);
        this.animations();
    };


    animations() {
        setInterval(() => {
            if (!this.splash) {
                this.otherDirection ? this.moveLeft() : this.moveRight();
                this.speed = this.speed - 0.02;
                this.applyGravity();
            } else {
                this.speed = 0;
            }
        }, 1000 / 30);

        setInterval(() => {
            let splashAnimation = animationImg.bottle.splashAnimationImages
            if (!this.splash) {
                this.playAnimation(animationImg.bottle.rotateAnimationImages);
            } else if (this.currentAnimationImage == splashAnimation.length) {
                this.destroyed = true;
            } else {
                this.playAnimation(splashAnimation);
            }
            ;
        }, 75);
    };
}