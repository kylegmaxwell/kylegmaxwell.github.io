'use strict';

function Game(context, height, width) {
    this.context = context;
    this.height = height;
    this.width = width;
    this.world = this.createWorld();
    this.createGround();
    this.balls = [];
    this.createBox(0, this.height*0.5, 10, this.height);
    this.createBox(this.width, this.height*0.5, 10, this.height);

}

Game.prototype.createWorld = function () {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(0,0);
    worldAABB.maxVertex.Set(this.width, this.height);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    return new b2World(worldAABB, gravity, doSleep);
}

Game.prototype.createGround = function () {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(this.width, 50);
    groundSd.restitution = 0.2;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(0, this.height+40);
    this.world.CreateBody(groundBd);
}

Game.prototype.createCircle = function (x, y) {
    this.balls.push(new Ball(this.world, x, y));
}

Game.prototype.createBox = function (x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    this.world.CreateBody(boxBd)
}

Game.prototype.step = function (dt, iter) {
    this.world.Step(dt, iter);
}

Game.prototype.click = function (x, y) {
    console.log('click');
    var closest = null;
    var closestDist = 99999;
    var m = new b2Vec2(x, y)
    var p = new b2Vec2(0, 0);
    for (var i=0; i<this.balls.length; i++) {
        var b = this.balls[i];
        p.SetZero();
        p.Add(b.pos);
        p.Subtract(m);
        var dist = p.Length();
        if (dist < closestDist) {
            closest = b;
            closestDist = dist;
        }
        b.selected = false;
    }
    if (closest) {

        closest.selected = true;
        var arr = [];
        for ( var ce = closest.body.GetContactList(); ce; ce = ce.next) {

            var s = ce.contact.GetShape1();
            b = s.GetBody().GetUserData();
            if (b) {
                arr.push(b.index);
                b.selected = true;
            }
        }
        // TODO something useful
        console.log(arr.join(','));
    }
}

Game.prototype.draw = function () {
    for (var i=0; i<this.balls.length; i++) {
        var b = this.balls[i];
        b.draw(this.context);
    }
}
