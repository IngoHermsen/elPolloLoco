'use strict'

/**
 * This class defines a bottle the player has thrown.
 */
class ThrownBottle extends MovableObject {
    splash = false;
    destroyed = false;
    dealingDamage = 20;

    intervalArray = [];

    flyInterval;
    splashInterval;


    constructor(pos_x, pos_y, direction) {
        super().width = 60;
        this.height = 60;
        this.position_x = pos_x;
        this.position_y = pos_y;
        this.distance_Y = 15;
        this.collisionOffset_x = 40;
        this.otherDirection = direction;
        this.speed = 4;

        this.createSingleImageObject(`img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png`);
        this.createSeveralImageObjects(animationImg.bottle.rotateAnimationImages);
        this.createSeveralImageObjects(animationImg.bottle.splashAnimationImages);
        this.animations();
    };



    animations() {
        /**
         * This animation interval sets flight direction and gravity of a thrown bottle.
         * Depends on characters walk direction.
         */
        this.otherDirection ? this.moveLeft() : this.moveRight();
        this.flyInterval = setInterval(() => {
            if (!this.splash) {
                this.applyGravity();
            } else {
                this.speed = 0;
            }
        }, 1000 / 30);
        this.intervals.push(this.flyInterval)
        console.log('thrown bottles interval', this.intervals)
        
        
        /**
         * This animation interval plays fly animation or splash animation
         * Depending on whether the bottle is destroyed.
         */

        this.splashInterval = setInterval(() => {
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