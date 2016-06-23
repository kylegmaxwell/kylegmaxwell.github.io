'use strict';

var MAX_NUM_GROUPS = colors.length;

function Game(context, height, width) {
    this.context = context;
    this.height = height;
    this.width = width;
    this.world = this.createWorld();
    this.createGround();

    // Special ball that represents the mouse / cursor used to block or push other balls
    this.cursor = null;

    // The ball the user has selected to drag around;
    this.selection = null;
    this.goal = null;

    // debugger
    // game objects with collisions and rendering
    // non consecutive array, with index matching ball.index
    this.balls = [];

    // Collision history of the last 5 frames
    this.collisions = [];

    // Number of color groups for balls
    this.numGroups = 1;

    this.createBox(0, this.height*0.5, 10, this.height);
    this.createBox(this.width, this.height*0.5, 10, this.height);
};

Game.prototype.initMouseCollider = function () {
    this.cursor = new Ball(this.world, 30, 30, 0, 0.0);
}

Game.prototype.updateMouseCollider = function (x, y) {
    if (!this.cursor) return;
    this.cursor.body.SetCenterPosition({x:x,y:y}, this.cursor.body.GetRotation());
    this.cursor.body.SetLinearVelocity({x:0,y:0});
    this.cursor.body.SetAngularVelocity(0);
}

Game.prototype.destroyMouseCollider = function () {
    if (!this.cursor) return;
    this.cursor.destroy();
    this.cursor = null;
}

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
    var group = 1+Math.floor(Math.random()*Math.min(this.numGroups, MAX_NUM_GROUPS-1));
    var b = new Ball(this.world, x, y, group);
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

Game.prototype.updateSelectionGoal = function (x, y) {
    if (!this.goal) {
        this.goal = new b2Vec2(x, y);
    } else {
        this.goal.x = x;
        this.goal.y = y;
    }
};

Game.prototype.removeSelection = function (x, y) {
    if (!this.selection) return;
    this.selection.selected = false;
    this.selection.def.density = 1.0;
    this.selection = null;
    this.goal = null;
};

Game.prototype.step = function (dt, iter) {
    this.world.Step(dt, iter);
    this.stashColliders();
    // Move the selected ball to the goal, when specified
    if (this.selection && this.goal) {
        this.selection.body.SetCenterPosition({x:this.goal.x,y:this.goal.y}, this.selection.body.GetRotation());
        this.selection.body.SetLinearVelocity({x:0,y:0});
        this.selection.body.SetAngularVelocity(0);
    }
};

Game.prototype.stashColliders = function () {
    // Map from ball index to list of collided bodies
    var allCollisions = {};
    for (var i=0;i<this.balls.length;i++) {
        var b = this.balls[i];
        if (!b) continue;
        var ballCollisions = [];
        var inGroupCount = 0;
        for ( var ce = b.body.GetContactList(); ce; ce = ce.next) {
            var cb = ce.contact.GetShape1().GetBody().GetUserData();
            if (cb && cb.index !== b.index) {
                ballCollisions.push(cb);
                if (b.group === cb.group) {
                    inGroupCount++;
                }
            }
            cb = ce.contact.GetShape2().GetBody().GetUserData();
            if (cb && cb.index !== b.index) {
                ballCollisions.push(cb);
                if (b.group === cb.group) {
                    inGroupCount++;
                }
            }
        }
        allCollisions[b.index] = ballCollisions;
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

Game.prototype.selectByPosition = function (x, y) {
    this.selection = this.findClosest(x, y);
};

Game.prototype.destroyByPosition = function (x, y) {
    this.selection = this.findClosest(x, y);
    this.destroyBall(this.selection);
};

Game.prototype.findClosest = function (x, y) {
    var closest = null;
    var closestDist = 99999;
    var m = new b2Vec2(x, y)
    var p = new b2Vec2(0, 0);
    // Used to track which balls had their neighbors processed already
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
    }
    closest.selected = true;
    closest.def.density = 0.0;
    return closest;
};

Game.prototype.findAllNeighbors = function(ball) {
    var dirty = [];
    var group = ball.group;
    var neighbors = [ball];
    dirty[ball.index] = true;
    var selection = [];
    while(neighbors.length > 0) {
        var b = neighbors.pop(); // assume b was only added if it was clean and of right group
        selection.push(b);
        this.findNeighbors(b, dirty, neighbors, group);
    }
    return selection;
}

Game.prototype.destroyBall = function(ball, sel) {
    if (ball) {
        var selection = sel == null ? this.findAllNeighbors(ball) : sel;
        if (selection.length > 2) {
            this.destroyBalls(selection);
        }
    }
}

Game.prototype.destroyBalls = function (selection) {
    for (var i=0; i<selection.length; i++) {
        var b = selection[i];
        if (!b) continue;
        // b.selected = true; // TODO dont select, it will just be destroyed
        if (this.selection === b) {
            this.selection = null;
        }
        b.destroy();
        this.balls[b.index] = null; // TODO reuse destroyed index
    }
}

Game.prototype.draw = function () {
    for (var i=0; i<this.balls.length; i++) {
        var b = this.balls[i];
        if (b) {
            b.draw(this.context);
        }
    }
    if (this.cursor) {
        this.cursor.draw(this.context);
    }
};
