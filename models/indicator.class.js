'use strict'

class Indicator extends DrawableObject {
    x_Offset;

    constructor(imagePath, height, width, x_Offset, position_y) {
        super().createSingleImageObject(imagePath);
        this.height = height;
        this.width = width;
        this.x_Offset = x_Offset
        this.position_y = position_y
    };
}