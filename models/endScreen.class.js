'use strict'

class EndScreen extends DrawableObject {
    hasWon;
    newGameFontSize = 40;
    font_position_x = 330;
    font_position_y = 450;
    lostImages = [
        'img/9_intro_outro_screens/1_game_over/game over.png',
        'img/9_intro_outro_screens/1_game_over/oh no you lost!.png',
        'img/9_intro_outro_screens/1_game_over/you lost.png'
    ]

    winImages = [
        'img/9_intro_outro_screens/2_win/you_did_it.png',
        'img/9_intro_outro_screens/2_win/you_Win.png'
    ]

    constructor(hasWon, pos_x) {
        super();
        this.hasWon = hasWon;
        this.createSingleImageObject(this.getImage());
        this.position_x = pos_x;
        this.position_y = 0;
        this.height = 480;
        this.width = 720;
        this.showRestartOption();
    };

    getImage() {
        let randomIndex;
        if (this.hasWon) {
            randomIndex = Math.floor(Math.random() * this.winImages.length);
            return this.winImages[randomIndex];
        } else {
            randomIndex = Math.floor(Math.random() * this.lostImages.length);
            return this.lostImages[randomIndex];
        }
    };


    showRestartOption() {
        let buttonElement = document.getElementById('restart');
        buttonElement.style.display = 'inline';
    };
}