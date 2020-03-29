'use strict';

import Fluids from './fluids.js'
import * as constants from './constants.js'

var fluidsInstance = null;
var ctx = null;
var renderRequest = null;
var lastRenderTime = null;

// Rendering is throttled to this frame rate
const FPS = constants.targetFramesPerSecond();

// Ratio of canvas size / simulation grid size 
const displayScale = constants.displayScaleFromSimulationResolution();

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

let dragV = glMatrix.vec2.create();
let prevP = glMatrix.vec2.create();
let mouseP = glMatrix.vec2.create();
var inDrag = false;
function handleMouse(e) {

    if (e.type === 'mousedown') {
        inDrag = true;
        mouseP[0] = Math.floor(e.offsetX / displayScale);
        mouseP[1] = Math.floor(e.offsetY / displayScale);
        prevP[0] = mouseP[0];
        prevP[1] = mouseP[1];
    } else if (e.type === 'mouseup') {
        inDrag = false;
    } else if (e.type === 'mousemove') {
        prevP[0] = mouseP[0];
        prevP[1] = mouseP[1];
        mouseP[0] = Math.floor(e.offsetX / displayScale);
        mouseP[1] = Math.floor(e.offsetY / displayScale);
    }
    if (inDrag) {
        dragV[0] = mouseP[0] - prevP[0];
        dragV[1] = mouseP[1] - prevP[1];
        fluidsInstance.setPush(dragV, mouseP);
    } else {
        fluidsInstance.setPush(null, null);
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

function setParametersFromGui() {
    fluidsInstance.setUseVorticityConfinement(vorticityConfinementCheckbox.checked);
    fluidsInstance.setAddExtraFluidSources(extraFluidSourcesCheckbox.checked);
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
    const dtMs = currentTime - lastRenderTime;
    // in seconds
    const dtS = dtMs / 1000;
    // in seconds
    const minDtS = 1 / FPS;
    const maxDtS = minDtS * constants.maxDeltaTimeRatio();

    // The fluid solver is implicit, so it can handle large time steps, but
    // vorticity confinement is explicit, so it can be unstable for large time steps.
    // Here we limit ourselves to at most twice the normal step to prevent instability.
    const delta = Math.min(maxDtS, dtS);

    // Wait until enough time has elapsed to solve and render no more than FPS
    if (delta > minDtS) {
        deltaTimeInput.value = delta;
        setParametersFromGui();
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