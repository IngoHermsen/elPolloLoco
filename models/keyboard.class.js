'use strict'

class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    THROW = false;
    keysPressed = 0;

    constructor() {
        document.addEventListener('keydown', (e) => {
            if ((e.code == "ArrowLeft" || e.code == "KeyA") && !this.LEFT) {
                this.LEFT = true;
                this.keysPressed += 1;
            }
            if ((e.code == "ArrowRight" || e.code == "KeyD") && !this.RIGHT) {
                this.RIGHT = true;
                this.keysPressed += 1;
            }
            if ((e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") && !this.UP) {
                this.UP = true;
                this.keysPressed += 1;

            }
            if ((e.code == "ArrowDown" || e.code == "KeyS") && !this.DOWN) {
                this.DOWN = true;
                this.keysPressed += 1;
            }

            if ((e.code == "KeyE") && !this.THROW) {
                this.THROW = true;
                this.keysPressed += 1;
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.code == "ArrowLeft" || e.code == "KeyA") {
                this.LEFT = false;
                this.keysPressed -= 1;
            }
            if (e.code == "ArrowRight" || e.code == "KeyD") {
                this.RIGHT = false;
                this.keysPressed -= 1;
            }
            if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space") {
                this.UP = false;
                this.keysPressed -= 1;
            }
            if (e.code == "ArrowDown" || e.code == "KeyS") {
                this.DOWN = false;
                this.keysPressed -= 1;
            }
            if (e.code == "KeyE") {
                this.THROW = false;
                this.keysPressed -= 1;
            }

        })

        document.getElementById('walkLeftBtn').addEventListener('touchstart', (e) => {
            if (!this.LEFT) {
                e.preventDefault();
                this.LEFT = true;
                this.keysPressed += 1;
            };
        })

        document.getElementById('walkLeftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
            this.keysPressed -= 1;
        })

        document.getElementById('walkRightBtn').addEventListener('touchstart', (e) => {
            if (!this.RIGHT) {
                e.preventDefault();
                this.RIGHT = true;
                this.keysPressed += 1;
            };
        })

        document.getElementById('walkRightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
            this.keysPressed -= 1;
        })

        document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
            if (!this.UP) {
                e.preventDefault();
                this.UP = true;
                this.keysPressed += 1;
            };
        })

        document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
            this.keysPressed -= 1;
        })

        document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
            if (!this.THROW) {
                e.preventDefault();
                this.THROW = true;
                this.keysPressed += 1;
            };
        })

        document.getElementById('throwBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW = false;
            this.keysPressed -= 1;
        })
    };
}