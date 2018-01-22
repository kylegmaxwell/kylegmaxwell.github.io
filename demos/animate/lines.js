'use strict';
/**
 * Draw particle lines
 * @param {Number} height The number of vertical pixels
 * @param {Number} width The number of horizontal pixels
 */
function Lines(height, width) {
    this.center = [0,0];
    this.height = height;
    this.width = width;
    this.h4 = (this.height-1)/4.0;
    this.w4 = (this.width-1)/4.0;
    this.h2 = this.height/2.0;
    this.w2 = this.width/2.0;
}

/**
 * Hacky hash function to get a quasi random color.
 * @param  {Number} i Seed
 * @return {Array.<Number>}   Color r, g, b 0-255
 */
Lines.prototype.color = function(i) {
    return [(i%100)*0.5+200, ((i+234567)%55)+200, (i%57)+195];
};

Lines.prototype.clear = function (ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.clearRect(0, 0, this.width, this.height);
}

/**
 * Draw the curves between the current and previous set.
 * {CanvasRenderingContext2D} ctx The canvas drawing context
 */
Lines.prototype.draw = function (ctx, particles) {

    this.clear(ctx);

    ctx.lineWidth=3;

    for (let index=0;index<particles[0].length;index++) {
        let pos = particles[0][index];
        let ppos = particles[1][index]||pos;
        let pppos = particles[2][index]||ppos;
        let ppppos = particles[3][index]||pppos;
        let color = this.color(index);

        this.drawOne(ctx, pos, ppos, pppos, ppppos, color);
    }
};

Lines.prototype.inBounds = function (x, y) {
    return x > -2 && x < 2 && y < 2 && y > -2;
}

/**
 * Convert a x,y pair in mandelbrot space to a vector in screen space.
 *
 * Mandelbrot space is [-2,-2]x[2,2]
 * Scren space is height x width
 * @param  {Number} x position
 * @param  {Number} y position
 * @return {Vector}   Screen position
 */
Lines.prototype.toPixel = function (x, y) {
    return Vector.create([
        Math.floor(x*(this.w4)+(this.w2)),
        Math.floor(y*(this.h4)+(this.h2))
        ]);
}

Lines.prototype.fromPixel = function (x, y) {
    return Vector.create([
        (x - this.w2 ) / this.w4,
        (y -this.h2) / this.h4
    ]);
}

Lines.prototype.drawOne = function (ctx, pos, ppos, pppos, ppppos, color) {
    var cx, cy, px, py, ppx, ppy, pppx, pppy, mx, my;
    var r,c,i,j,v0,v1,v2,v3;

    //initialize positions
    cx = pos[0];
    cy = pos[1];
    px = ppos[0];
    py = ppos[1];
    mx = 0.5 * cx + 0.5 * px;
    my = 0.5 * cy + 0.5 * py;
    ppx = pppos[0];
    ppy = pppos[1];
    pppx = ppppos[0];
    pppy = ppppos[1];

    // if (this.inBounds(ppx, ppy)) {
    v0 = this.toPixel(pppx, pppy);
    v1 = this.toPixel( ppx,  ppy);
    v2 = this.toPixel(  px,   py);
    v3 = this.toPixel(  cx,   cy);

    var len = v1.distanceFrom(v2)
    var maxLen = 1000;
    var alpha = (maxLen-len)*(1/maxLen);
    alpha *= 1.0-((mx*mx+my*my)*0.25);
    alpha = Math.min(Math.max(alpha,0.2),0.75);
    // alpha = 1;
    var colorStr = "rgba("+color[0]+","+color[1]+","+color[2]+","+alpha+")";
    ctx.strokeStyle = colorStr;

    var d12 = v1.distanceFrom(v2);
    var d02 = v0.distanceFrom(v2);
    var d13 = v1.distanceFrom(v3);

    ctx.beginPath();

    var tan02 = v2.subtract(v0).multiply(0.5*d12/d02);
    var tan31 = v1.subtract(v3).multiply(0.5*d12/d13);
    var cv1 = v1.add(tan02);
    var cv2 = v2.add(tan31);
    ctx.moveTo(v1.e(1),v1.e(2));
    ctx.bezierCurveTo(
                    cv1.e(1),cv1.e(2),
                    cv2.e(1),cv2.e(2),
                    v2.e(1),v2.e(2));
    ctx.stroke();
    //     return true;
    // } else {
    //     return false;
    // }

}

function drawPoint(ctx, vec) {
    ctx.fillRect(vec.elements[0], vec.elements[1], 10, 10);
}

/**
 * Compute an arc from three points
 *
 * Not currently used, bezier looks better.
 *
 * @param  {Number} x0  Coordinate
 * @param  {Number} y0  Coordinate
 * @param  {Number} x1  Coordinate
 * @param  {Number} y1  Coordinate
 * @param  {Number} x2  Coordinate
 * @param  {Number} y2  Coordinate
 * {CanvasRenderingContext2D} ctx The canvas drawing context
  * @return {Array}     Arc definition (center, radius, theta1, theta2)
 */
Lines.prototype.calculateArc = function (x0, y0, x1, y1, x2, y2, ctx) {
    var v1 = Vector.create([x0, y0,0]);
    var v2 = Vector.create([x1, y1,0]);
    var v3 = Vector.create([x2, y2,0]);
    var m1 = v1.multiply(0.5).add(v2.multiply(0.5));
    var m2 = v2.multiply(0.5).add(v3.multiply(0.5));
    var v12 = v2.subtract(v1);
    var d1 = Vector.create([-v12.elements[1], v12.elements[0],0]).toUnitVector();
    var v23 = v3.subtract(v2);
    var d2 = Vector.create([-v23.elements[1], v23.elements[0],0]).toUnitVector();
    var line1 = Line.create(m1, d1);
    var line2 = Line.create(m2, d2);
    if (line1 && line2) {
        var center = line1.intersectionWith(line2);
        if (center) {
            var radius = center.distanceFrom(v1);
            var cv1 = v1.subtract(center);
            var theta1 = Math.atan2(cv1.elements[1], cv1.elements[0]);
            var cv2 = v3.subtract(center);
            var theta2 = Math.atan2(cv2.elements[1], cv2.elements[0]);
            return [center, radius, theta1, theta2];
        }
    }
    return null;
}


