'use strict'

class StartScreen extends DrawableObject {
    newGameFontSize = 40;
    font_position_x = 330;
    font_position_y = 450;

    constructor() {
        super().createSingleImageObject('img/9_intro_outro_screens/start/startscreen_2.png');
        this.position_x = 0;
        this.position_y = 0;
        this.height = 480;
        this.width = 720;
    };
}