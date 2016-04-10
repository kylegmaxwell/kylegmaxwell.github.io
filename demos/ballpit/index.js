'use strict';

var controller = null;

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {

    controller = new Controller(gameCanvas);

    gameCanvas.addEventListener('mousedown', handleMouse, false);
    gameCanvas.addEventListener('mousemove', handleMouse, false);
    gameCanvas.addEventListener('mouseup', handleMouse, false);
}

var inDrag = false;
function handleMouse(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if (e.type === 'mousedown') {
        inDrag = true;
    } else if (e.type === 'mouseup') {
        inDrag = false;
        controller.setMouse(x, y);
    }
    if (inDrag) {
        // render();
    }
}


function Controller(canvas) {

    // this.ball = null;
    this.canvas = canvas;

    this.setupCanvas();

    this.ctx = this.canvas.getContext('2d');

    this.mouseX = 0;
    this.mouseY = 0;

    this.renderAnimation = new Animation(this.step.bind(this), 30);
    this.createAnimation = new Animation(this.create.bind(this), 10);

    this.reset();
    this.start();
}

Controller.prototype.setMouse = function (x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.game.click(this.mouseX, this.mouseY);
    this.render();
}

Controller.prototype.setupCanvas = function () {
    this.canvas.height = this.canvas.width;
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
};


Controller.prototype.clearCanvas = function () {
   this.ctx.clearRect(0, 0, this.width, this.height);
};

Controller.prototype.stop = function () {
    if (this.renderAnimation) {
        this.renderAnimation.stop();
    }
    if (this.createAnimation) {
        this.createAnimation.stop();
    }
}

Controller.prototype.start = function () {
    if (this.renderAnimation) {
        this.renderAnimation.start();
    }
    if (this.createAnimation) {
        this.createAnimation.start();
    }
}

Controller.prototype.create = function () {
    var x = Math.random() * this.width*0.5 + this.width * 0.25;
    this.game.createCircle(x, 50);
}

Controller.prototype.reset = function () {

    this.game = new Game(this.ctx, this.height, this.width);

    this.clearCanvas();
    this.render();
};

Controller.prototype.step = function (dt) {
    // convert from ms to seconds
    // maximum time step prevents huge values when switching tabs
    var timeStep = dt != null ? Math.min(dt*0.001,0.1) : 1.0/60;
    var iteration = 1;
    this.game.step(timeStep, iteration);
    this.clearCanvas();
    this.render();
};

Controller.prototype.render = function () {
    this.game.draw();
};

function playIter() {
    controller.start();
}

function stopIter() {
    controller.stop();
}

function incIter() {
    controller.step()
}

function resetIter() {
    controller.reset()
}


