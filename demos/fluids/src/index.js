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
    setupTouch();
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
let inDrag = false;
let dragIndex = 0;
function handleMouse(e) {

    if (e.type === 'mousedown') {
        inDrag = true;
        mouseP[0] = Math.floor(e.offsetX / displayScale);
        mouseP[1] = Math.floor(e.offsetY / displayScale);
        prevP[0] = mouseP[0];
        prevP[1] = mouseP[1];
    } else if (e.type === 'mouseup') {
        inDrag = false;
        dragIndex++;
    } else if (e.type === 'mousemove') {
        prevP[0] = mouseP[0];
        prevP[1] = mouseP[1];
        mouseP[0] = Math.floor(e.offsetX / displayScale);
        mouseP[1] = Math.floor(e.offsetY / displayScale);
    }
    if (inDrag) {
        dragV[0] = mouseP[0] - prevP[0];
        dragV[1] = mouseP[1] - prevP[1];
        fluidsInstance.setPush(dragV, mouseP, dragIndex);
    } else {
        fluidsInstance.setPush(null, null);
    }
}

// Thank you MDN https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
function touchListToMap(prevTouchList, currTouchList, touchIndexMap) {
    var canvasBounds = gameCanvas.getBoundingClientRect();
    let prevTouchMap = {};
    let ids = [];
    if (prevTouchList != null) {
        for (let touch of prevTouchList) {
            prevTouchMap[touch.identifier] = touch;
            ids.push(touch.identifier);
        }
    }
    let touchInfos = [];
    for (let touch of currTouchList) {
        let prevTouch = prevTouchMap[touch.identifier];
        const px = (touch.clientX - canvasBounds.left) / displayScale;
        const py = (touch.clientY - canvasBounds.top) / displayScale;
        const hasPrev = prevTouch != null;
        const vx = hasPrev ? (touch.clientX - prevTouch.clientX) / displayScale : 0;
        const vy = hasPrev ? (touch.clientY - prevTouch.clientY) / displayScale : 0;
        const id = touchIndexMap[touch.identifier];
        if (id == null) {
            throw "Missing id";
        }
        touchInfos.push({
            "identifier": id,
            "position": [px, py],
            "velocity": [vx, vy]
        });
    }
    return touchInfos;
}

function setupTouch() {
    let prevTouches = null;
    let currTouches = null;
    // This is a persistent map to track the lifetime of each touch
    let touchIndexMap = {};
    // JavaScript reuses indexes, but this index keeps growing to give each touch
    // a unique identifier for mapping to color
    let touchIndex = 0;
    let handleTouch = (e, type) => {
        if (e.cancelable) {
            e.preventDefault();
        } else {
            return;
        }
        // Reverse map of touch identifiers for just the current event
        // Used to detect when a touch goes away
        let reverseMap = {};
        for (let t of e.touches) {
            const id = t.identifier;
            const mappedId = touchIndexMap[id];
            if (mappedId != null) {
                reverseMap[mappedId] = id;
            }
        }
        if (type === "touchstart") {
            // Add any new touches to the map
            // they are new by definition if they are not in the map
            for (let t of e.touches) {
                const id = t.identifier;
                const mappedId = touchIndexMap[id];
                if (mappedId == null) {
                    touchIndexMap[id] = touchIndex++;
                }
            }
        } else if (type === "touchend" || type === "touchcancel") {
            // Check touch index and clean up any missing touches
            // The touches have ended by definition if they are missing
            let keys = Object.keys(touchIndexMap);
            for (let key of keys) {
                if (reverseMap[touchIndexMap[key]] == null) {
                    touchIndexMap[key] = undefined;
                }

            }
        } else if (type === "touchmove") {
            // No additional custom behavior for touch move events at the moment
        }
        prevTouches = currTouches;
        currTouches = e.touches;
        if (currTouches != null) {
            fluidsInstance.setTouches(touchListToMap(prevTouches, currTouches, touchIndexMap));
        }
    };
    gameCanvas.addEventListener("touchstart", (e) => {
        const type = "touchstart";
        handleTouch(e, type);
    }, false);
    gameCanvas.addEventListener("touchend", (e) => {
        const type = "touchend";
        handleTouch(e, type);
    }, false);
    gameCanvas.addEventListener("touchcancel", (e) => {
        const type = "touchcancel";
        handleTouch(e, type);
    }, false);
    gameCanvas.addEventListener("touchmove", (e) => {
        const type = "touchmove";
        handleTouch(e, type);
    }, false);
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