'use strict';

import Fluids from './fluids.js'

var DEFAULT_ITER = 20;
var fluidsInstance = null;
var ctx = null;
var paintMode = false;
// Rendering is throttled to this frame rate
var FPS = 15;
var renderRequest = null;
var lastRenderTime = null;

// Ratio of canvas size / simulation grid size 
var displayScale = 4.0;

// Set up initial hook to start scripts after page loads
document.addEventListener("DOMContentLoaded", handleLoad);

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {
    updateRes();
    render();
    gameCanvas.addEventListener('mousedown', handleMouse, false);
    gameCanvas.addEventListener('mousemove', handleMouse, false);
    gameCanvas.addEventListener('mouseup', handleMouse, false);
    incButton.addEventListener('click', incIter);
    stopButton.addEventListener('click', stopIter);
    playButton.addEventListener('click', playIter);
    clearButton.addEventListener('click', doClear);

    {
        let mode = localStorage.getItem('fluids.rendermode');
        if (mode != null) {
            renderModeSelector.value = mode;
            updateRenderMode();
        }
        renderModeSelector.addEventListener("change", updateRenderMode);
    }
    {
        let mode = localStorage.getItem('fluids.velocitymode');
        if (mode != null) {
            velocityModeSelector.value = mode;
            updateVelocityMode();
        }
        velocityModeSelector.addEventListener("change", updateVelocityMode);
    }

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

function updateSimulation() {
    if (!fluidsInstance) {
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

    // Wait until enough time has elapsed to solve and render no more than FPS
    if (delta > 1 / FPS) {
        fluidsInstance.step(delta);
        elapsedTimeInput.value = fluidsInstance._simulationTimeElapsed;
        render();
        lastRenderTime = currentTime;
    }
}

function renderLoop() {
    updateSimulation()
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
    updateSimulation();
}

function doClear() {
    localStorage.clear();
    resetGame();
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    render();
}

function updateRenderMode() {
    fluidsInstance.setRenderMode(renderModeSelector.value);
    localStorage.setItem('fluids.rendermode', renderModeSelector.value);
    render();
}

function updateVelocityMode() {
    fluidsInstance.setVelocityMode(velocityModeSelector.value);
    localStorage.setItem('fluids.velocitymode', velocityModeSelector.value);
    render();
}

function resetGame() {
    lastRenderTime = null;
    paintMode = !!paintCheck.checked;
    const width = gameCanvas.width / displayScale;
    const height = gameCanvas.height / displayScale;
    fluidsInstance = new Fluids(height, width);
    ctx = gameCanvas.getContext('2d');
    incIter();
    render();
}

function render() {
    var width = gameCanvas.width;
    var height = gameCanvas.height;

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;

    if (fluidsInstance) {
        fluidsInstance.render(data, displayScale);
        ctx.putImageData(imageData, 0, 0);
    }
}