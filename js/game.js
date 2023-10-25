'use strict'

let canvas;
let world;
let startScreen;
let mainMusic;
let userToggledMusic = false;



function init() {
    checkDeviceOrientation();
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    setContainerHeight();
    mainMusic = music.mainMusic;
    mainMusic.volume = 0.4;
    mainMusic.muted = true;
};

/**
 * This function shows a "turn your device" request if users device is in portrait orientation.
 */
function checkDeviceOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)");
    let rotateScreenEl = document.getElementById('rotate-screen')

    rotateScreenEl.style.display = screen.availHeight > screen.availWidth ? 'flex' : 'none';

    portrait.addEventListener("change", e => {
        rotateScreenEl.style.display = e.matches ? 'flex' : 'none';
    })
}

/**
 * This function sets a new started game after clicking on "play"
 */

function startGame() {
    setButtons()
    setMusic();
    world.initGame();
}

/**
 * This function toggles buttons view.
 * Depending on whether the button has to be invisible like the play button e.g.
 * or to be visible like the control buttons for control on mobile devices.
 */

function setButtons() {
    let topButtons = document.getElementById('topButtons');
    let bottomButtons = document.getElementById('bottomButtons');
    let playButton = document.getElementById('playBtn');
    let helpButton = document.getElementById('helpBtn');
    let musicButton = document.getElementById('musicBtn');

    playButton.style.display = 'none';
    helpButton.style.display = 'none';
    musicButton.style.opacity = '0.5';
    topButtons.style.top = '40px';
    bottomButtons.style.display = 'flex'
}

function setContainerHeight() {
    let canvasContainer = document.getElementById('canvasContainer')
    let canvasHeight = canvas.offsetHeight;
    canvasContainer.style.height = `${canvasHeight}px`;
}

/**
 * This function turns music on if user has recently made a choice.
 * If play has not made a choice by clicking the music button the music will stay turned off.
 */

function setMusic() {
    if(userToggledMusic) {
        toggleMusic();
    }
}

/**
 * This function turns background music on and changes the button depending of the actual state of the music.
 */

function toggleMusic() {
    userToggledMusic = true;
    let musicBtn = document.getElementById('musicBtn');
    let musicBtnImg = document.querySelector('#musicBtn > img');
    musicBtnImg.src = mainMusic.muted ? 'img/buttons/music_on.png' : 'img/buttons/music_off.png';
    mainMusic.play();
    mainMusic.muted = !mainMusic.muted;
    musicBtn.style.display = 'none';
    musicBtn.style.display = 'inline'

}

/**
 * This function resets the game by resetting endBoss end character "back to life"
 * an initation a new game.
 */

function reset() {
    init();

    let buttonElement = document.getElementById('bottomButtons');
    let playButton = document.getElementById('playBtn');
    let restartButton = document.getElementById('restart');

    buttonElement.style.display = 'none';
    playButton.style.display = 'none';
    restartButton.style.display = 'none';

}

function restart() {

    reset();
    startGame();
}

/**
 * The overlay functions toggle the information text after help button is clicked by player.
 */

function showOverlay() {
    document.getElementById('textOverlay').style.display = 'flex';

}


function closeOverlay() {
    document.getElementById('textOverlay').style.display = 'none';
}



