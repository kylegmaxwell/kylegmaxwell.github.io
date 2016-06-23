'use strict';

function Animation(callback, fps, offset) {
    this._frameRequest = null;
    // Rendering is throttled to this frame rate
    this._fps = fps != null ? fps : 30;
    this._callback = callback;
    this._offset = 0;
    if (! isNaN(offset)) {
        this._offset = offset;
    }
    this._lastFrameTime = performance.now() + this._offset;
}

Animation.prototype.renderLoop = function () {
    var currentTime = performance.now();
    var dt = currentTime - this._lastFrameTime;
    if (dt > 1000/this._fps ) {
        this._callback(dt);
        this._lastFrameTime = currentTime;
    }
    this._frameRequest = requestAnimationFrame(this.renderLoop.bind(this));
};

Animation.prototype.start = function () {
    if (this._frameRequest == null) {
        this._lastFrameTime = performance.now();
        this._frameRequest = requestAnimationFrame(this.renderLoop.bind(this));
    }
};

Animation.prototype.stop = function () {
    if (this._frameRequest != null) {
        cancelAnimationFrame(this._frameRequest);
    }
    this._frameRequest = null;
};
