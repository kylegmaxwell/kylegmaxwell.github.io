'use strict';

var game;

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {
    var minesSpan = document.getElementById("minesDisplay");
    var timeSpan = document.getElementById("timeDisplay");
    var statusSpan = document.getElementById("statusDisplay");

    runTests();

    game = new Game(gameCanvas, minesSpan, timeSpan, statusSpan);

    // Handle mouse events
    gameCanvas.addEventListener('mousedown', function handleClick(e) {
        game.mouseDown(e.offsetX, e.offsetY);
    }, true);
    gameCanvas.addEventListener('mouseup', function handleClick(e) {
        game.mouseUp(e.offsetX, e.offsetY);
    }, true);

    var ignore = function ignoreEvent(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    // Handle touch events
    gameCanvas.oncontextmenu = ignore;
    var canvasRect = gameCanvas.getBoundingClientRect();
    var canvasTop = canvasRect.top;
    var canvasLeft = canvasRect.left;

    var ongoingTouches = {};
    gameCanvas.addEventListener("touchstart", function (e) {
        ignore(e);
        var touch = e.touches[0];
        ongoingTouches[touch.identifier] = touch;
        var x = touch.clientX - canvasLeft + 0.0 * touch.radiusX;
        var y = touch.clientY - canvasTop + 0.0 * touch.radiusY;

        game.mouseDown(x, y);
    }, false);
    gameCanvas.addEventListener("touchend", function (e) {
        ignore(e);
        for (var key in e.changedTouches) {
            var touch = e.changedTouches[key];
            if (ongoingTouches[touch.identifier]) {
                var x = touch.clientX - canvasLeft + 0.0 * touch.radiusX;
                var y = touch.clientY - canvasTop + 0.0 * touch.radiusY;
                game.mouseUp(x, y);
            }
        }
    }, false);

    resizeCanvas();

    difficultSelector.addEventListener('input', function (evt) {
        var difficuly = parseInt(this.value);
        game.reset(difficuly);
        resizeCanvas();
    });
}

/**
 * Reset the game when the user wants to start over.
 */
function resetGame() {
    var difficuly = parseInt(difficultSelector.value);
    game.reset(difficuly);
    resizeCanvas();
}

/**
 * Helper function to resize canvas and render
 */
function resizeCanvas() {
    gameCanvas.width = game.getWidth();
    gameCanvas.height = game.getHeight();
    game.render();
}

/**
 * Run the client tests
 * Output prints to console
 */
function runTests() {
    var tests = new Tests();
    tests.run();
}

/**
 * Save to local storage.
 */
function saveGame() {
    var gameState = JSON.stringify(game);
    localStorage.setItem('time-sweeper-game-state', gameState);
}

/**
 * Get the game data from the server via xhr.
 */
function loadGame() {
    var gameState = localStorage.getItem('time-sweeper-game-state');
    if (gameState) {
        var gameObj = JSON.parse(gameState);
        game.reload(gameObj);
        resizeCanvas();
    }
}
