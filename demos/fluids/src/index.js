'use strict';

import Fluids from './fluids.js'

var DEFAULT_ITER = 20;
var renderObj = null;
var ctx = null;
var paintMode = false;
// Rendering is throttled to this frame rate
var FPS = 10;
var renderRequest = null;
var lastRenderTime = null;

// Set up initial hook to start scripts after page loads
document.addEventListener("DOMContentLoaded", handleLoad);

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {
    gameCanvas.height = gameCanvas.width;
    ctx = gameCanvas.getContext('2d');
    resetGame();
    render();
    gameCanvas.addEventListener('mousedown', handleMouse, false);
    gameCanvas.addEventListener('mousemove', handleMouse, false);
    gameCanvas.addEventListener('mouseup', handleMouse, false);
    incButton.addEventListener('click', incIter);
    stopButton.addEventListener('click', stopIter);
    playButton.addEventListener('click', playIter);
    clearButton.addEventListener('click', doClear);
    renderModeSelector.addEventListener("change", updateRenderMode);
    velocityModeSelector.addEventListener("change", updateVelocityMode);
    // Play by default
    playIter();
}

var inDrag = false;
function handleMouse(e) {
    if (e.type === 'mousedown') {
        inDrag = true;
    } else if (e.type === 'mouseup') {
        inDrag = false;
    }
    if (inDrag) {
        var x = e.offsetX;
        var y = e.offsetY;
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        render();
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
    gameCanvas.width = getValue(resInput, gameCanvas.width);
    gameCanvas.height = gameCanvas.width;
    resetGame();
}

function step() {
    if (!renderObj) {
        return;
    }
    const currentTime = performance.now();
    if (lastRenderTime == null) {
        lastRenderTime = currentTime;
    }
    // in milli seconds
    const dt = currentTime - lastRenderTime;
    // no more than 1, in seconds
    const delta = Math.min(dt / 1000, 1.0);

    // Wait until enough time has elapsed to render no faster than FPS
    if (delta > 1 / FPS) {
        renderObj.step(delta);
        elapsedTimeInput.value = renderObj._simulationTimeElapsed;
        render();
        lastRenderTime = currentTime;
    }
}

function renderLoop() {
    step();
    render();
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

function incIter() {
    step();
    render();
}

function doClear() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function updateRenderMode() {
    renderObj.setRenderMode(renderModeSelector.value);
    render();
}

function updateVelocityMode() {
    renderObj.setVelocityMode(velocityModeSelector.value);
    render();
}

function resetGame() {
    paintMode = !!paintCheck.checked;

    var width = gameCanvas.width;
    var height = gameCanvas.height;
    renderObj = new Fluids(height, width);
    doClear();
    render();
}

function render() {
    var width = gameCanvas.width;
    var height = gameCanvas.height;

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;

    if (renderObj) {
        if (renderObj.render) {
            renderObj.render(data);
            ctx.putImageData(imageData, 0, 0);
        } else {
            renderObj.draw(ctx);
        }
    }
}