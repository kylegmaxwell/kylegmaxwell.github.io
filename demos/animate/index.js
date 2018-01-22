'use strict';

var renderObj = null;
var physicsObj = null;
var ctx = null;
// Rendering is throttled to this frame rate
var FPS = 10;
var DEBUG = false;

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {
    // TODO handle page resize
    gameCanvas.width = gameCanvas.offsetWidth;
    gameCanvas.height = gameCanvas.offsetHeight;

    ctx = gameCanvas.getContext('2d');
    resetGame();
    render();
    window.addEventListener('mousedown', handleMouse, false);
    window.addEventListener('mousemove', handleMouse, false);
    window.addEventListener('mouseup', handleMouse, false);
    playIter();
}

var inDrag = false;
function handleMouse(e) {
    if (e.type === 'mousedown') {
        inDrag = true;
    } else if (e.type === 'mouseup') {
        inDrag = false;
    }
    var x = e.pageX;
    var y = e.pageY;
    physicsObj.setCenter(renderObj.fromPixel(x,y).add(Vector.create([0.025,0.05])));
    if (DEBUG) {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}

/**
 * Get the value of a text input box as a number
 * @param  {dom input} inputBox     The html input
 * @param  {Number} defaultValue Value to use if input is not a number
 * @return {Number}              The parsed value
 */
function getValue(inputBox, defaultValue) {
    var valueString = inputBox.value;
    var value = defaultValue;
    if (!isNaN(valueString)) {
        value = Number(valueString);
    }
    return value;
}

function updateRes() {
    // gameCanvas.width = getValue(resInput, gameCanvas.width);
    // gameCanvas.height = gameCanvas.width;
    resetGame();
}

var renderRequest = null;
var lastRenderTime = performance.now();
function renderLoop() {

    var currentTime = performance.now();
    var dt = currentTime - lastRenderTime;
    // Throttle it to specified FPS
    if (dt > 1000/FPS) {
        physicsObj.step(dt);
        render();
        lastRenderTime = currentTime;
    }
    renderRequest = requestAnimationFrame(renderLoop);
}

function playIter() {
    if (renderRequest == null) {
        renderRequest = requestAnimationFrame(renderLoop);
    }
}

function stopIter() {
    if (renderRequest != null) {
        cancelAnimationFrame(renderRequest);
    }
    renderRequest = null;
}

function stepIter() {
    physicsObj.step(0);
    render();
}

function doClear() {
    renderObj.clear(ctx);
}

function resetGame() {
    var width = gameCanvas.width;
    var height = gameCanvas.height;
    physicsObj = new Engine();
    renderObj = new Lines(height, width);
    doClear();
    render();
}

function render() {
    let particles = physicsObj.getAllParticles();
    renderObj.draw(ctx, particles);
}