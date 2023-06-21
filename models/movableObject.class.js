'use strict'

class MovableObject extends DrawableObject {
    intervals = [];
    isEnemy = false;
    groundPosition_y = 0;
    img;
    currentAnimationImage = 0;
    speed = 0.25;
    otherDirection = false;
    distance_Y = 0;
    acceleration = 1;
    health = 150;
    collisionOffset_x = 0;
    collisionOffset_y = 0;

    isNotOnGround() {
        return this.position_y < this.groundPosition_y;
    };


    applyGravity() {
        this.position_y -= this.distance_Y;
        this.distance_Y -= this.acceleration;
    };


    moveRight() {
        let moveRightInterval = setInterval(() => {
            this.position_x += this.speed;
        }, 1000 / 60);
        this.intervals.push(moveRightInterval)
    };

    moveLeft() {
        let moveLeftInterval = setInterval(() => {
            this.position_x -= this.speed;
        }, 1000 / 60);
        this.intervals.push(moveLeftInterval)
    };


    isColliding(object) {
        return (this.position_x + this.width - this.collisionOffset_x) >= (object.position_x + object.collisionOffset_x) &&
            this.position_x + this.collisionOffset_x <= (object.position_x + object.width - object.collisionOffset_x) &&
            (this.position_y + this.height) >= object.position_y &&
            this.position_y + this.collisionOffset_y <= (object.position_y + object.height)
    };


    clearAllIntervals() {
        this.intervals.forEach((interval) => {
            clearInterval(interval)
            console.log('movableObject Intervals', this.intervals)
            const index = this.intervals.indexOf(interval);
            if (index > -1) {
                this.intervals.splice(index, 1);
            }
        }
        )

    }
}