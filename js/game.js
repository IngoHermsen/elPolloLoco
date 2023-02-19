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

function checkDeviceOrientation() {
    let portrait = window.matchMedia("(orientation: portrait)");
    let deviceOrientationElement = document.getElementById('deviceOrientation')

    deviceOrientationElement.style.display = screen.availHeight > screen.availWidth ? 'flex' : 'none';

    portrait.addEventListener("change", function (e) {
        deviceOrientationElement.style.display = e.matches ? 'flex' : 'none'
    })
}

function startGame() {
    setButtons()
    setMusic();
    world.initGame();
}

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

function setMusic() {
    if(!userToggledMusic) {
        toggleMusic();
    }
}

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

function reset() {
    world.character.isDead = false;
    world.endBoss.isDead = false;
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

function showOverlay() {
    document.getElementById('textOverlay').style.display = 'flex';

}

function closeOverlay() {
    document.getElementById('textOverlay').style.display = 'none';
}



