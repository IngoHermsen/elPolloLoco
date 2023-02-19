'use strict'

class LandscapeObject extends MovableObject {
    width = 1500;
    height = 480;
    imagePath;

    constructor(imagePath, x) {
        super().createSingleImageObject(imagePath);
        this.position_x = x;
        this.position_y = 0;
        this.imagePath = imagePath;
    };
}