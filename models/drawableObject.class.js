'use strict'

class DrawableObject {
    position_x = 10;
    position_y = 10;
    width = 100;
    height = 100;
    imageCache = {};

    constructor() {

    };

    createSingleImageObject(imagePath) {
        this.img = new Image();
        this.img.src = imagePath;
    };

    createSeveralImageObjects(arrayWithAllImagePaths) {
        arrayWithAllImagePaths.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    playAnimation(imageArray) {
        let remainder = this.currentAnimationImage % imageArray.length
        let i = remainder;
        let path = imageArray[i];
        this.img = this.imageCache[path];
        this.currentAnimationImage = (remainder == 0) ? 1 : this.currentAnimationImage + 1;

    };
}