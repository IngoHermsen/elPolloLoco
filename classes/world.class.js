'use strict'

class World {
    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Clouds(),
    ];

    backgroundObjects = [
        new LandscapeObject('img/5_background/layers/air.png', -1499, 0),
        new LandscapeObject('img/5_background/layers/3_third_layer/full.png', -1499, 0),
        new LandscapeObject('img/5_background/layers/2_second_layer/full.png', -1499, 0),
        new LandscapeObject('img/5_background/layers/1_first_layer/full.png', -1499, 0),
        new LandscapeObject('img/5_background/layers/air.png', 0, 0),
        new LandscapeObject('img/5_background/layers/3_third_layer/full.png', 0, 0),
        new LandscapeObject('img/5_background/layers/2_second_layer/full.png', 0, 0),
        new LandscapeObject('img/5_background/layers/1_first_layer/full.png', 0, 0),
        new LandscapeObject('img/5_background/layers/air.png', 1499, 0),
        new LandscapeObject('img/5_background/layers/3_third_layer/full.png', 1499, 0),
        new LandscapeObject('img/5_background/layers/2_second_layer/full.png', 1499, 0),
        new LandscapeObject('img/5_background/layers/1_first_layer/full.png', 1499, 0),
    ];

    canvas;
    ctx;
    keyboard;
    camera_x = 0; 
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addSeveralMovableObjects(this.backgroundObjects);
        this.addSeveralMovableObjects(this.enemies);
        this.addSeveralMovableObjects(this.clouds);

        this.addSingleMovableObject(this.character);

        this.ctx.translate(-this.camera_x, 0);


        let self = this
        requestAnimationFrame(() => {
            self.draw()
        });
    }

    addSeveralMovableObjects(objectArray) {
        objectArray.forEach(object => {
            this.addSingleMovableObject(object);
        })
    }

    addSingleMovableObject(object) {
        if (object.directionLeft) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.position_x = object.position_x * -1;
        }

        this.ctx.drawImage(
            object.img,
            object.position_x,
            object.position_y,
            object.width,
            object.height
        );

        if (object.directionLeft) {
            object.position_x = object.position_x * -1;
            this.ctx.restore();
        }
    }
}