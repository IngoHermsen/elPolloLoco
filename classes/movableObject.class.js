'use strict'

class MovableObject {
    position_x = 10;
    position_y = 10;
    img;
    width = 100;
    height = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.25;
    directionLeft = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        setInterval(() => {
            this.position_x += this.speed;
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            this.position_x -= this.speed;
        }, 1000 / 60);
    }

}