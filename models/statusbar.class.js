'use strict'

class StatusBar extends DrawableObject {
    icon = []
    statusImages = [];

    constructor(images) {
        super();
        this.statusImages = images;
        this.createSingleImageObject(this.statusImages[this.statusImages.length - 1]);
        this.createSeveralImageObjects(this.statusImages);
        this.width= 200;
        this.height = 60;
        this.position_x = 10;
        this.position_y = -10;
    };
}