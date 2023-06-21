'use strict'

class EndBoss extends Enemy {
    width = 250;
    height = 300;
    position_x = 2650;
    position_y = 160;
    dealingDamage = 20;
    healthBar = new StatusBar(statusBarImg.endBoss.health);

    isMoving = false
    isActive = false;
    isHurt = false;
    isDead = false;

    constructor() {
        super().createSingleImageObject(animationImg.endBoss.walkAnimationImages[0]);
        this.createSeveralImageObjects(animationImg.endBoss.walkAnimationImages);
        this.createSeveralImageObjects(animationImg.endBoss.idleAnimationImages);
        this.createSeveralImageObjects(animationImg.endBoss.hurtAnimationImages);
        this.createSeveralImageObjects(animationImg.endBoss.deadAnimationImages);
        this.health = 200;
        this.speed = 1.3;
        this.animation();
        this.healthBar.position_y = -100;
    };


    animation() {
        let bossInterval2 = setInterval(() => {

            if (this.health == 0 && this.position_y >= 400) {
                this.isDead = true;
            }

            if (this.health == 0) {
                this.position_y += 20;
                this.playAnimation(animationImg.endBoss.deadAnimationImages)
            }

            if (!this.isMoving && !this.isHurt) {
                this.playAnimation(animationImg.endBoss.idleAnimationImages)
            }

            if (this.isMoving && this.health > 0 && !this.isHurt) {
                this.playAnimation(animationImg.endBoss.walkAnimationImages)
            }

            if (this.isHurt) {
                this.playAnimation(animationImg.endBoss.hurtAnimationImages)
            }

        }, 125);

        this.intervals.push(bossInterval2)
    };


    updateHealthBar() {
        let bossInterval3 = setInterval(() => {
            this.healthBar.img.src = this.getHealthBarImage();

            if (this.isActive && this.healthBar.position_y < -10) {
                this.healthBar.position_y += 2
            }

        }, 1000 / 30);

        this.intervals.push(bossInterval3);
    };


    startMoving() {
        setTimeout(() => {
            this.isMoving = true
            this.moveLeft()
        }, 3000)
    };


    checkCondition() {
        this.currentAnimationImage = 0;
        if (this.health <= 0) {
            sounds.enemy.fallSound.play();
            this.health = 0;
        } else {
            sounds.enemy.hurtChickenSound.play();
            this.isHurt = true;
            setTimeout(() => { this.isHurt = false }, 1500)
        }
    };


    getHealthBarImage() {
        switch (true) {
            case (this.health > 160):
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/100.png';
            case (this.health > 120):
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/80.png';
            case (this.health > 80):
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/60.png';
            case (this.health > 40):
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/40.png';
            case (this.health > 0):
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/20.png';
            default:
                return 'img/7_statusbars/1_statusbar/2_statusbar_endboss/orange/0.png';
        }

    };
}   