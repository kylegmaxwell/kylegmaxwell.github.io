'use strict';

function Game(context, height, width) {
    this.context = context;
    this.height = height;
    this.width = width;
    this.world = this.createWorld();
    this.createGround();

    // game objects with collisions and rendering
    // non consecutive array, with index matching ball.index
    this.balls = [];

    // Collision history of the last 5 frames
    this.collisions = [];

    this.createBox(0, this.height*0.5, 10, this.height);
    this.createBox(this.width, this.height*0.5, 10, this.height);
};

Game.prototype.createWorld = function () {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(0,0);
    worldAABB.maxVertex.Set(this.width, this.height);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    return new b2World(worldAABB, gravity, doSleep);
};

Game.prototype.createGround = function () {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(this.width, 50);
    groundSd.restitution = 0.2;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(0, this.height+40);
    this.world.CreateBody(groundBd);
};

Game.prototype.createCircle = function (x, y) {
    var b = new Ball(this.world, x, y);
    this.balls[b.index] = b;
};

Game.prototype.createBox = function (x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    this.world.CreateBody(boxBd)
};

Game.prototype.step = function (dt, iter) {
    this.world.Step(dt, iter);
    this.stashColliders();
};

Game.prototype.stashColliders = function () {
    // Map from ball index to list of collided bodies
    var allCollisions = {};
    for (var i=0;i<this.balls.length;i++) {
        var b = this.balls[i];
        if (!b) continue;
        var ballCollisions = [];
        for ( var ce = b.body.GetContactList(); ce; ce = ce.next) {

            var cb = ce.contact.GetShape1().GetBody().GetUserData();
            if (cb && cb.index !== b.index) {
                ballCollisions.push(cb);
            }
            cb = ce.contact.GetShape2().GetBody().GetUserData();
            if (cb && cb.index !== b.index) {
                ballCollisions.push(cb);
            }
        }
        if (ballCollisions.length > 0) {
            allCollisions[b.index] = ballCollisions;
        }
    }
    this.collisions.push(allCollisions);
    // Maximum number of frames for which to stash collision information
    var maxHistory = 5;
    if (this.collisions.length > 5) {
        this.collisions.splice(0, 1); // remove the first element of the array
    }
};

Game.prototype.findNeighbors = function(closest, dirty, neighbors, group) {
    // for each cached frame
    for (var i=this.collisions.length-1; i>=0; i--) {
        // get the collisions for the selected ball
        var ballCollisions = this.collisions[i][closest.index];
        // for each collision with the selected ball
        for (var j=0; ballCollisions && j<ballCollisions.length; j++) {
            var b = ballCollisions[j];
            if (!dirty[b.index]) {
                dirty[b.index] = true;
                if (b && b.group === group) {
                    neighbors.push(b);
                }
            }
        }
    }
};

Game.prototype.click = function (x, y) {
    var closest = null;
    var closestDist = 99999;
    var m = new b2Vec2(x, y)
    var p = new b2Vec2(0, 0);
    // Used to track which balls had their neighbors processed already
    var dirty = [];
    for (var i=0; i<this.balls.length; i++) {
        var b = this.balls[i];
        if (!b) continue;
        p.SetZero();
        p.Add(b.pos);
        p.Subtract(m);
        var dist = p.Length();
        if (dist < closestDist) {
            closest = b;
            closestDist = dist;
        }
        b.selected = false;
        dirty.push(false);
    }
    if (closest) {
        var group = closest.group;
        var neighbors = [closest];
        dirty[closest.index] = true;
        var selection = [];
        while(neighbors.length > 0) {
            b = neighbors.pop(); // assume b was only added if it was clean and of right group
            selection.push(b);
            this.findNeighbors(b, dirty, neighbors, group);
        }
        if (selection.length > 2) {
            this.destroyBalls(selection);
        }
    }
};

Game.prototype.destroyBalls = function (selection) {
    for (var i=0; i<selection.length; i++) {
        var b = selection[i];
        if (!b) continue;
        b.selected = true; // TODO dont select, it will just be destroyed
        b.destroy();
        this.balls[b.index] = null;
    }
}

Game.prototype.draw = function () {
    for (var i=0; i<this.balls.length; i++) {
        var b = this.balls[i];
        if (b) {
            b.draw(this.context);
        }
    }
};
