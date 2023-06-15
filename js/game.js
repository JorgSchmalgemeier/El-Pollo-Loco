let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let fullScreen = false;
let gameStarted = false;
let soundMute = false;

let game_music = new Audio('audio/game_music.mp3');
let game_over_sound = new Audio('audio/game_over.mp3');
let game_win_sound = new Audio('audio/win_game.mp3');


/**
 * Start two important functions. Check the device mode if the user has a mobile device and make it possible to start the game with enter.
 * 
 */
function init() {
    checkDeviceMode();
    startGameWithEnter();
}


/**
 * This function starts the game and close the start-screen
 * 
 */
function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStarted = true;
    closeStartScreen();
}


/**
 * Close the start screen and play the game music
 * 
 */
function closeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').classList.add('d-none');
        document.getElementById('btn-start-game').classList.add('d-none');
        document.getElementById('container-canvas').classList.add('justify-content-start');
        if (!soundMute) {
            soundOn();
        }
        keyboard.buttonKeyPressEvents();
        keyboard.buttonKeyPressEventsUndo();
    }, 1000);
}


/**
 * Start the game if the user press enter 
 * 
 */
function startGameWithEnter() {
    setInterval(() => {
        if (keyboard.ENTER && !gameStarted) {
            startGame();
        }
    }, 1000 / 25);
}


/**
 * Check if the users device is in landscape mode or no and 
 * 
 */
function checkDeviceMode() {
    setInterval(() => {
        if (window.innerHeight > window.innerWidth) {
            //device is in landscape mode
            document.getElementById('main-container').classList.add('d-none');
            document.getElementById('rotate-device').classList.add('d-flex');
            document.body.classList.add('bg-position');
        } else {
            document.getElementById('main-container').classList.remove('d-none');
            document.getElementById('rotate-device').classList.remove('d-flex');
            document.body.classList.remove('bg-position');
        }
    }, 1000 / 25);

}


/**
 * If the game music is over, this function plays it again from the beginning
 * 
 */
function checkGameMusic() {
    setInterval(() => {
        game_music.addEventListener("ended", function () {
            game_music.currentTime = 0;
        });
    }, 500);
}


/**
 * Set the sound of 
 * 
 */
function soundOff() {
    document.getElementById('btn-sound-on').classList.add('d-none');
    document.getElementById('btn-sound-off').classList.add('d-flex');
    game_music.pause();
    soundMute = true;
}


/**
 * Set the sound on
 * 
 */
function soundOn() {
    document.getElementById('btn-sound-on').classList.remove('d-none');
    document.getElementById('btn-sound-off').classList.remove('d-flex');
    game_music.play();
    soundMute = false;
}


/**
 * Show the win game screen and go back to the start screen 
 * 
 */
function winGame() {
    game_music.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('win-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
    if (!soundMute) {
        game_win_sound.play();
    }
}


/**
 * Show the game over screen and go back to the start screen
 * 
 */
function gameOver() {
    game_music.pause();
    clearAllIntervals();
    document.getElementById('overlay-grey').classList.add('d-flex');
    document.getElementById('game-over-screen').classList.add('d-flex');
    document.getElementById('container-canvas').classList.remove('justify-content-start');
    backToStartScreen();
    init();
    gameStarted = false;
    if (!soundMute) {
        game_over_sound.play();
    }
}


/**
 * Go back to the start screen
 * 
 */
function backToStartScreen() {
    setTimeout(() => {
        document.getElementById('overlay-grey').classList.remove('d-flex');
        document.getElementById('game-over-screen').classList.remove('d-flex');
        document.getElementById('win-screen').classList.remove('d-flex');
        document.getElementById('start-screen').classList.remove('d-none');
        document.getElementById('btn-start-game').classList.remove('d-none');
    }, 3000);
}


/**
 * Show the game in fullscreen
 * 
 */
function enterFullscreen() {
    let element = document.getElementById('container-canvas');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    document.getElementById('btn-full-screen').classList.add('d-none');
    document.getElementById('btn-close-full-screen').classList.add('d-flex');
    fullScreen = true;
}


/**
 * Close the full screen mode
 * 
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

    document.getElementById('btn-full-screen').classList.remove('d-none');
    document.getElementById('btn-close-full-screen').classList.remove('d-flex');
    fullScreen = false;
}


/**
 * Stop all running intervals of the game
 * 
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Add eventlisteners for the keys they are used for the game and set the corresponding variable to true
 * 
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 13) {
        keyboard.ENTER = true;
    }
});


/**
 * Set the corresponding varibales of the used key to false
 * 
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 13) {
        keyboard.ENTER = false;
    }
});