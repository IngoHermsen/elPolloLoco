'use strict'

class Enemy extends MovableObject {
    spawn_position_x = 400;
    minimum_speed = 0.4;
    maximum_speed = 0.8;
    dealingDamage = 20;
    isHurt = false;
    isDead = false;

    walkInterval;

    animation(direction) {
        this.walkDirection(direction);

        this.walkInterval = setInterval(() => {
            if (this.health > 0) {
                let i = this.currentAnimationImage % this.walkAnimationImages.length;
                let path = this.walkAnimationImages[i];
                this.img = this.imageCache[path];
                this.currentAnimationImage++;
            } else {
                this.speed = 0;
                this.dealingDamage = 0;
                this.img.src = this.deadImage;
                this.playSqueezeSound();
                this.isDead = true
            }
        }, 150);
        this.intervals.push(this.walkInterval)
    };


    playSqueezeSound() {
        if (!this.isDead) {
            sounds.enemy.squeezeSound.play();
        }
    };


    walkDirection(direction) {
        if (direction == 'right') {
            this.otherDirection = true;
            this.moveRight();
        } else {
            this.moveLeft();
        }
    };
}