'use strict'

let sounds = {
    character: {
        collectCoinSound: new Audio('audio/sounds/collect_coin.mp3'),
        collectBottleSound: new Audio('audio/sounds/collect_bottle.mp3'),
        throwBottleSound: new Audio('audio/sounds/throw.mp3'),
        walkingSound: new Audio('audio/sounds/pepe_walk.mp3'),
        jumpOnChickenSound: new Audio('audio/sounds/jump_on_chicken.mp3'),
        ouchSound: new Audio ('audio/sounds/ouch.mp3')

    },

    enemy: {
        fallSound: new Audio('audio/sounds/fall.mp3'),
        hurtChickenSound: new Audio('audio/sounds/hurtChicken.mp3'),
        squeezeSound: new Audio('audio/sounds/deadChicken.mp3'),
        chickenScreamSound: new Audio('audio/sounds/chickenScream.mp3')
    },

    endScreen: {
        winSound: new Audio('audio/sounds/youWin.mp3'),
        lostSound: new Audio('audio/sounds/youLost.mp3')
    }
};

let music = {
    mainMusic: new Audio('audio/music/Carefree_Melody.mp3'),
}