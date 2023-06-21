'use strict'

class World {
    startScreen = new StartScreen();
    startedGame = false;
    finishedGame = false;
    endScreen = 'unset';
    character = new Character();
    endBoss = new EndBoss();

    collidableObjects = [
        this.endBoss,
    ];

    bottleObjects = [];
    coinObjects = [];
    thrownBottle = [];
    indicators = [
        new Indicator('img/6_salsa_bottle/indicator/1_bottle.png', 50, 50, 0, 50),
        new Indicator('img/8_coin/indicator/coin_1.png', 100, 100, 30, 70)
    ];
    coinIndicator = [

    ];

    nextEnemyID = 1;
    nextBottleID = 1;
    nextCoinID = 1;

    backgroundObjects = [];

    clouds = [];
    statusBars = [
        this.character.healthBar,
        this.endBoss.healthBar
    ];

    canvas;
    ctx;
    end = 2370;
    adjustCamera = false;
    cameraOffset;
    camera_x;
    showHitBoxes = false;

    intervals = [];
    deadEnemiesInterval;
    newBottlesInterval;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.cameraOffset = this.character.position_x;
        this.setWorld();
        this.draw();
    };


    initGame() {
        this.startedGame = true;
        this.character.isActive = true;
        this.createRandomEnemies(3, 300);
        this.createRandomEnemies(3, 1500);
        this.createRandomEnemies(3, 2000);
        this.createLandscapeObjects();
        this.createClouds();
        this.createBottle(7);
        this.createCoin(15);
        this.spawnNewBottles();
        this.removeDeadEnemies();
    };


    createBottle(amount) {
        for (let i = 0; i < amount; i++) {
            let pos_x = Math.floor(Math.random() * this.endBoss.position_x);
            this.bottleObjects.push(new Bottle(this.nextBottleID, pos_x))
            this.nextBottleID++;
        }
    };


    createCoin(amount) {
        for (let i = 0; i < amount; i++) {
            let pos_x = Math.floor(Math.random() * this.endBoss.position_x);
            this.coinObjects.push(new Coin(1, this.nextCoinID, pos_x));
            this.nextCoinID++;
        }
    };


    createRandomEnemies(amount, spawn_position_x) {
        for (let i = 0; i < amount; i++) {
            let randomEnemyAmount = Math.ceil(Math.random() * 2);
            if (randomEnemyAmount == 1) {
                this.collidableObjects.push(new Chicken(spawn_position_x));
            } else {
                this.collidableObjects.push(new ChickenSmall(spawn_position_x));
            }
            this.nextEnemyID++;
        }
    };


    createLandscapeObjects() {
        let imagePaths = [
            'img/5_background/layers/air.png',
            'img/5_background/layers/3_third_layer/full.png',
            'img/5_background/layers/2_second_layer/full.png',
            'img/5_background/layers/1_first_layer/full.png',
        ];

        imagePaths.forEach(path => {
            this.backgroundObjects.push(new LandscapeObject(path, -1499));
            this.backgroundObjects.push(new LandscapeObject(path, 0));
            this.backgroundObjects.push(new LandscapeObject(path, 1499));
        });
    };


    createClouds() {

        this.clouds.push(new Clouds(-1499));
        this.clouds.push(new Clouds(-0));
        this.clouds.push(new Clouds(1499));
        this.clouds.push(new Clouds(2998));

        setTimeout(() => {
            let lastCloud = this.clouds[this.clouds.length - 1];
            let lastCloudPosition = lastCloud.position_x;
            this.clouds.push(new Clouds(lastCloudPosition + lastCloud.width))
            this.clouds.splice(0, 1);
        }, 90000);
    };


    setWorld() {
        this.character.world = this;
    };


    draw() {
        if (!this.startedGame) {
            this.drawStartScreen();
        } else {
            this.drawWorld();
        }
    };


    drawStartScreen() {
        this.drawSingleObject(this.startScreen);

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => {
            this.draw()
        });
    };


    drawWorld() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.font = "35px boogaloo";
        this.ctx.fillStyle = "white";

        this.drawObjects();

        this.ctx.fillText(` ${this.character.collectedBottles}`, this.character.position_x - this.cameraOffset + 50, 90);
        this.ctx.fillText(` ${this.character.collectedCoins}`, this.character.position_x - this.cameraOffset + 50, 130);

        this.checkGameState();

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => {
            this.draw()
        });
    };


    drawObjects() {
        this.drawSeveralObjects(this.backgroundObjects);
        this.drawSeveralObjects(this.bottleObjects);
        this.drawSeveralObjects(this.coinObjects);
        this.drawSeveralObjects(this.thrownBottle);
        this.drawSeveralObjects(this.clouds);
        this.drawSeveralObjects(this.collidableObjects);
        this.drawSingleObject(this.character);
        this.drawSeveralObjects(this.statusBars);
        this.drawSeveralObjects(this.indicators);
    };


    checkGameState() {
        if (this.character.isDead || this.endBoss.isDead) {
            this.stopAllAnimations();
            let screen_pos_x = this.character.position_x - this.cameraOffset;
            if (this.endScreen == 'unset') {
                this.endScreen = new EndScreen(this.endBoss.isDead ? true : false, screen_pos_x);
            }
            this.drawSingleObject(this.endScreen);
            this.showRestartOption();
        }
    };


    showRestartOption() {
        let buttonElement = document.getElementById('restart');
        buttonElement.style.display = 'inline';
    };


    stopAllAnimations() {
        this.character.clearAllIntervals();
        this.collidableObjects.forEach((object) => {
            object.clearAllIntervals();
        })
        this.endBoss.clearAllIntervals();

    };

    clearIntervals() {
        this.intervals.forEach((interval) => {
            clearInterval(interval);
            const index = this.intervals.indexOf(interval);
            if (index > -1) {
                this.intervals.splice(index, 1);
            }
        })
    }

    drawSeveralObjects(objectArray) {
        objectArray.forEach(object => {
            this.drawSingleObject(object);
        })
    };


    drawSingleObject(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }

        this.ctx.drawImage(
            object.img,
            object.position_x,
            object.position_y,
            object.width,
            object.height
        )

        this.drawHitBoxes(object);

        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    };


    drawHitBoxes(object) {
        if (this.showHitBoxes && (object instanceof Character || object instanceof Enemy)) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "1";
            this.ctx.strokeStyle = "red";
            this.ctx.rect(object.position_x, object.position_y, object.width, object.height);
            this.ctx.stroke();
        }
    };


    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.position_x = object.position_x * -1;
    };


    flipImageBack(object) {
        object.position_x = object.position_x * -1;
        this.ctx.restore();
    };


    moveBackground(speed) {
        this.backgroundObjects.forEach((object) => {
            if (object.imagePath == 'img/5_background/layers/3_third_layer/full.png') {
                object.position_x += (speed / 40);
            } else if (object.imagePath == 'img/5_background/layers/2_second_layer/full.png') {
                object.position_x += (speed / 30);
            }
        });
    };


    removeCollectable(array, objectId) {
        let index = array.findIndex((object) => object.id == objectId);
        array.splice(index, 1);
    };


    removeDeadEnemies() {
        this.removeDeadEnemiesInterval = setInterval(() => {
            for (let i = 0; i < this.collidableObjects.length; i++) {
                if (this.collidableObjects[i].health <= 0) {
                    this.collidableObjects.splice(i, 1);
                }
            }
        }, 15000);
        this.intervals.push(this.removeDeadEnemies)
    };


    spawnNewBottles() {
        this.newBottlesInterval = setInterval(() => {
            let neededBottles = (this.endBoss.health - (this.character.collectedBottles * 15)) / 15
            if (this.endBoss.isActive && neededBottles > 0 &&
                this.character.collectedBottles < 7 &&
                this.bottleObjects.length < 5
            ) {
                this.createBottle(5)
            }
        }, 5000)
        this.intervals.push(this.newBottlesInterval)

    };
};