'use strict';

var BALL_INDEX = 0;
var colors = [
    [0.9,0.9,0.9],//white
    [0.1,0.9,0.1],//green
    [0.5,0.1,0.9],//purple
    [0.9,0.1,0.1],//red
    [0.9,0.5,0.1],//orange
    [0.9,0.9,0.1],//yellow
    [0.1,0.1,0.9]//blue
];

/**
 * Create a ball object from given data.
 */
function Ball(world, x, y, group, density) {
    this.world = world;
    this.body = this.createCircle(x, y, density);

    this.body.m_userData = this; // used for reverse collision lookup
    this.shape = this.body.GetShapeList();
    this.pos = this.shape.m_position;
    this.r = this.shape.m_radius;

    // when the user clicks the ball is colored differently
    this.selected = false;
    this.goal = null;
    // Static color counter
    this.index = BALL_INDEX++;
    this.group = group;
    this.setupColor();
}

// This function must be called to remove the corresponding body from the simulation world
Ball.prototype.destroy = function () {
    this.world.DestroyBody(this.body);
}

// Create a circle body
Ball.prototype.createCircle = function (x, y, density) {
    var circleSd = new b2CircleDef();
    circleSd.density = density != null ? density :  1.0;
    circleSd.radius = 10;
    circleSd.restitution = 0.5;
    circleSd.friction = 0.5;
    this.def = circleSd;
    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(x,y);
    return this.world.CreateBody(circleBd);
}

/**
 * Draw the ball.
 *
 * Assumes that ctx.beginPath() and ctx.fill() are called externally.
 * See http://www.html5rocks.com/en/tutorials/canvas/performance/#toc-batch
 *
 * @param  {ctx} The 2d context on which to draw
 * @param  {Number} x The horizontal draw position
 * @param  {Number} y The vertical draw position
 */
Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    if (this.selected) {
        ctx.fillStyle = this.selectedColorStr;
    } else {
        ctx.fillStyle = this.colorStr;
    }

    // Call moveTo to update the cursor so a polygon is not created across circles
    ctx.moveTo(this.pos.x,this.pos.y);

    // Specify the arc to draw (it will actually be visible when fill is called)
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
    ctx.fill();

    // Debug draw index
    // ctx.font="12px Georgia";
    // ctx.fillStyle = "gray";
    // ctx.fillText(this.index,this.pos.x-0.5*this.r, this.pos.y+0.5*this.r);

};

/**
 * Convert color component from 0-1 to 0-255
 * @param  {Number}} c The color float
 * @return {Number}   The color int
 */
Ball.prototype.asColorInt = function (c) {
    return Math.floor(c * 255);
}
/**
 * Generate a color using a random hash
 * @param  {Number} i Seed
 * @return {String}   r, g, b, a color
 */
Ball.prototype.setupColor = function() {
    var colorFloat = colors[this.group];//this.index%colors.length
    var color = [
        this.asColorInt(colorFloat[0]),
        this.asColorInt(colorFloat[1]),
        this.asColorInt(colorFloat[2])
    ];
    var alpha = 1.0;
    this.colorStr = "rgba("+color[0]+","+color[1]+","+color[2]+","+alpha+")";
    var offset = 200;
    this.selectedColorStr = "rgba("+(color[0]+offset)+","+(color[1]+offset)+","+(color[2]+offset)+","+alpha+")";
};