'use strict'

class LandscapeObject extends MovableObject {
    width = 1500;
    height = 480;
   

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.position_x = x;
        this.position_y = y;
    }
}