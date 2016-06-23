'use strict';

var controller = null;

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {

    controller = new Controller(gameCanvas);
    gameCanvas.oncontextmenu = function (e) { handleMouse(e); };
    gameCanvas.addEventListener('mousedown', handleMouse, false);
    gameCanvas.addEventListener('mousemove', handleMouse, false);
    gameCanvas.addEventListener('mouseup', handleMouse, false);
}

var inDrag = false;
function handleMouse(e) {
    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;
    if (e.type === 'mousedown') {
        inDrag = true;
        if (e.button === 0) {
            controller.game.destroyByPosition(x, y);
        }
        if (e.button === 1) {
            controller.game.initMouseCollider();
        }
        if (e.button === 2) {
            controller.game.selectByPosition(x, y);
        }
    } else if (e.type === 'mouseup') {
        inDrag = false;
        if (e.button === 0) {
            controller.game.removeSelection(x, y);
        }
        if (e.button === 1) {
            controller.game.destroyMouseCollider();
        }
        if (e.button === 2) {
            controller.game.removeSelection(x, y);
        }
    }
    if (inDrag && e.button === 1) {
        controller.game.updateMouseCollider(x, y);
    }
    if (inDrag && e.button === 2) {
        controller.game.updateSelectionGoal(x, y);
    }
    controller.clearCanvas();
    controller.render();
}


function Controller(canvas) {

    // this.ball = null;
    this.canvas = canvas;

    this.setupCanvas();

    this.ctx = this.canvas.getContext('2d');

    this.animations = [
        new Animation(this.step.bind(this), 30),
        new Animation(this.create.bind(this), 2),
        new Animation(this.speedUp.bind(this), 0.05),
        new Animation(this.addColor.bind(this), 0.1, 3000)
    ];
    this.createAnimation = this.animations[1];

    this.reset();
    this.start();
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
    for (var i=0;i<this.animations.length;i++) {
        this.animations[i].stop();
    }
}

Controller.prototype.start = function () {
    for (var i=0;i<this.animations.length;i++) {
        this.animations[i].start();
    }
}

Controller.prototype.addColor = function () {
    this.game.numGroups += 1;
}

Controller.prototype.speedUp = function () {
    if (this.createAnimation.fps < 5) {
        this.createAnimation.fps += 1;
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
    var iteration = 5;
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


