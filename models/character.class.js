'use strict'

class Character extends MovableObject {
    isActive = false;
    width = 132;
    height = 275;
    position_x = 120;
    groundPosition_y = 175;
    position_y = this.groundPosition_y;
    speed = 3.5;
    collisionOffset_x = 30;
    collisionOffset_y = 120;
    isHurt = false;
    collectedCoins = 0;
    collectedBottles = 0;
    keyboard = new Keyboard();
    world;
    health = 100;
    isDead = false;
    healthBar = new StatusBar(statusBarImg.character.health);
    dealingDamage = 20;

    /**
     * Sets the Character with all animation image objects and animation intervals.
     * @constructor
     */
    constructor() {
        super().createSingleImageObject('img/2_character_pepe/1_idle/idle/I-1.png');
        this.createSeveralImageObjects(animationImg.character.idleAnimationImages);
        this.createSeveralImageObjects(animationImg.character.walkAnimationImages);
        this.createSeveralImageObjects(animationImg.character.jumpAnimationImages);
        this.createSeveralImageObjects(animationImg.character.hurtAnimationImages);
        this.createSeveralImageObjects(animationImg.character.deadAnimationImages);
        this.animations();
    };


    animations() {
        sounds.character.walkingSound.volume = 0.4;
        sounds.character.walkingSound.pause();

        /**
         * This slower interval checks if character is dead and handles animations by
         * monitoring which control buttons are pressed.
         * Depending on the player is active to prevent keypressed events in the main menu.
         * 
         */
        let charInterval1 = setInterval(() => {
            if (this.isActive) {

                if (this.health <= 0 && this.currentAnimationImage == animationImg.character.deadAnimationImages.length - 1) {
                    this.isDead = true;
                }

                if (this.isDead) {
                    let screen_pos_x = this.position_x - this.world.cameraOffset;
                    this.world.endScreen = new EndScreen(false, screen_pos_x);
                    music.mainMusic.volume = 0.2;
                    sounds.endScreen.lostSound.play();
                    this.world.finishedGame = true;
                }

                if (this.health <= 0 && !this.isDead) {
                    this.playAnimation(animationImg.character.deadAnimationImages)
                }

                if (this.keyboard.keysPressed == 0 && !this.isNotOnGround() && !this.hurt && this.health > 0) {
                    this.playAnimation(animationImg.character.idleAnimationImages);
                }

                if ((this.keyboard.LEFT || this.keyboard.RIGHT) && !this.isNotOnGround() && this.health > 0) {
                    this.playAnimation(animationImg.character.walkAnimationImages);
                }

                if (this.isNotOnGround() && this.health > 0) {
                    this.playAnimation(animationImg.character.jumpAnimationImages);
                }

                if (this.isHurt) {
                    this.playAnimation(animationImg.character.hurtAnimationImages);
                }

            }
        }
            , 100)

        /**
         * This faster interval checks collision states and moves characters image on x and y axis.
         * Depends on which control buttons are pressed.
         * 
         */

        let charInterval2 = setInterval(() => {

            if (this.isActive) {

                this.checkCollisions();

                this.checkBottleCondition();
                this.discoverEndBoss();

                if (this.world.adjustCamera)
                    this.adjustCamera();

                if (this.keyboard.RIGHT && this.position_x < this.world.end && this.health > 0)
                    this.setWalkDirectionLeft(false);

                if (this.keyboard.LEFT && this.position_x > 0 && this.health > 0)
                    this.setWalkDirectionLeft(true);

                if (this.keyboard.UP && !this.isNotOnGround() && this.health > 0 & !this.isHurt)
                    this.distance_Y = 20;

                if (this.keyboard.THROW && !this.isNotOnGround() && this.health > 0 && this.collectedBottles > 0)
                    this.throwBottle();

                if (this.isNotOnGround() || this.distance_Y > 0) {
                    this.applyGravity();
                } else {
                    this.distance_Y = 0;
                }

                this.healthBar.position_x = (this.position_x - this.world.cameraOffset) + 10
                this.setIndicatorPositions();
                this.world.endBoss.healthBar.position_x = this.healthBar.position_x + 500;

            }
        }, 1000 / 60);

        this.intervals.push(charInterval1, charInterval2)
    };

    checkCollisions() {
        this.checkEnemyCollision();
        this.checkCollectableCollision();
    }

    /**
     * This function gets activated by a pressed direction button.
     * Gets the direction character must be adjusted to and activates the adjust-camera interval function by boolean. 
     * @param {boolean} direction contains if current direction is left or not (true or false).
     */

    setWalkDirectionLeft(directionBoolean) {
        this.otherDirection = directionBoolean;
        this.changePositionX()
        this.world.adjustCamera = true;
    }

    /**
     * This function sets the position of the Character and moves backgrounds.
     */
    changePositionX() {
        let speed = this.otherDirection ? -this.speed : this.speed;
        this.position_x += speed;
        this.world.camera_x = -this.position_x + this.world.cameraOffset;
        this.world.moveBackground(this.speed * -speed);
        if (!this.isNotOnGround()) sounds.character.walkingSound.play();
    };

    /**
     * This function adjusts the camera view as long as the minimum and maximum state values are not reached.
     */

    adjustCamera() {
        let min = 200;
        let max = 320;

        if (this.cameraMustMoveLeft(max)) {
            this.world.cameraOffset += 10;

        } else if (this.cameraMustMoveRight(min)) {
            this.world.cameraOffset = this.world.cameraOffset - 10;
        } else {
            this.world.adjustCamera = false;
        };

        this.world.camera_x = -this.position_x + this.world.cameraOffset;
    };


    cameraMustMoveLeft(max) {
        return (this.otherDirection && this.position_x > 400 && this.world.cameraOffset < max);
    };

    cameraMustMoveRight(min) {
        return (!this.otherDirection && this.world.cameraOffset > min);
    }

    /**
     * This function makes several collision checks with all enemys.
     * It gives damage to enemy if jumped on the from above.
     */
    checkEnemyCollision() {
        this.world.collidableObjects.forEach((object) => {
            if (this.isColliding(object) && (object instanceof Enemy) &&
                object.health > 0 &&
                this.isHurt == false && this.health > 0) {
                if (this.isFallingFromAbove(object) && !(object instanceof EndBoss)) {
                    sounds.character.jumpOnChickenSound.play();
                    object.health = object.health - this.dealingDamage;
                    this.distance_Y = 15;
                } else {
                    this.health = this.health - object.dealingDamage
                    this.checkCondition();
                }
            }
        })
    };

    /**
     * This function checks all collectable items for collision.
     * If character collides the collect function is activated.
     */

    checkCollectableCollision() {
        this.world.bottleObjects.forEach((object) => {
            if (this.isColliding(object)) {
                this.collect(object);
            }
        })

        this.world.coinObjects.forEach((object) => {
            if (this.isColliding(object)) {
                this.collect(object);
            }
        })
    };

    /**
     * This function handles values and sounds for collected items.
     */

    collect(object) {
        if (object instanceof Bottle) {
            sounds.character.collectBottleSound.play();
            this.world.removeCollectable(this.world.bottleObjects, object.id);
            this.collectedBottles++;
        }

        if (object instanceof Coin) {
            sounds.character.collectCoinSound.play();
            this.world.removeCollectable(this.world.coinObjects, object.id);
            this.collectedCoins += object.value;
            object.value = 0;
        }
    };


    throwBottle() {
        let pos_x_offset = this.otherDirection ? 0 : (this.width - 60);
        let bottlePos_x = this.position_x + pos_x_offset;
        let bottlePos_y = this.position_y + this.height - 120;
        if (this.world.thrownBottle.length == 0) {
            this.world.thrownBottle.push(new ThrownBottle(bottlePos_x, bottlePos_y, this.otherDirection));
            sounds.character.throwBottleSound.play();
            this.collectedBottles--;
        }
    };


    checkBottleCondition() {
        this.world.thrownBottle.forEach((bottle) => {
            if (bottle.destroyed) {
                this.world.thrownBottle = [];
            } else {
                this.checkIfBottleReachedGround(bottle);
            }
        });
    };


    checkIfBottleReachedGround(bottle) {
        if (bottle.position_y >= 380 && !bottle.splash) {
            this.splash(bottle);
        } else {
            this.world.collidableObjects.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.splash) {
                    enemy.health -= bottle.dealingDamage;
                    bottle.dealingDamage = 0;
                    this.isEndbossHit(enemy);
                    this.splash(bottle);
                }
            })
        }
    };


    isEndbossHit(enemy) {
        if (enemy instanceof EndBoss) {
            this.world.endBoss.checkCondition();
        }
    };


    splash(bottle) {
        bottle.position_y = 380;
        bottle.currentAnimationImage = 0;
        bottle.splash = true;
    };


    isFallingFromAbove(object) {
        return ((this.position_y + this.height) >= object.position_y && this.distance_Y < 0)
    };


    checkCondition() {
        this.currentAnimationImage = 0;
        this.updateHealthBar();
        if (this.health <= 0) {
            this.health = 0;
        } else {
            sounds.character.ouchSound.play();
            this.isHurt = true;
            setTimeout(() => { this.isHurt = false }, 1500);
        }
    };


    updateHealthBar() {
        this.healthBar.img.src = this.getHealthBarImage();

    };


    getHealthBarImage() {
        switch (true) {
            case (this.health > 80):
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png';
            case (this.health > 60):
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png';
            case (this.health > 40):
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png';
            case (this.health > 20):
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png';
            case (this.health > 0):
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png'
            default:
                return 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'
        }
    };


    setIndicatorPositions() {
        this.world.indicators.forEach((indicator) => {
            indicator.position_x = (this.position_x - this.world.cameraOffset) + 10
                - indicator.x_Offset;
        })
    };

    /**
     * This function activates the end boss if the character is near enough. 
     */

    discoverEndBoss() {
        let endBossPosition = this.world.endBoss.position_x;
        let distanceToEndBoss = endBossPosition - this.position_x;
        if (!this.world.endBoss.isActive && distanceToEndBoss < 600) {
            sounds.enemy.chickenScreamSound.play();
            this.world.endBoss.isActive = true;
            this.world.endBoss.updateHealthBar();
            this.world.endBoss.startMoving();
        }
    };
}