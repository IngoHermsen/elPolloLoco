'use strict'

class MovableObject {
    x = 80;
    y = 80;
    img;
    width = 100;
    height = 150;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
    }

    moveLeft() {
        
    }

}