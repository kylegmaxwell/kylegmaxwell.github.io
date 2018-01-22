'use strict';
/*
 *  Handle particle positions and physics
 */
class Engine {
    /*
     *
     */
    constructor() {
        this.center = Vector.create([0,0]);

        this.count = 41;

        this.particles = [];
        this.prevParticles = [];
        this.prevPrevParticles = [];
        this.prevPrevPrevParticles = [];
        this.initBuffer(this.particles);
    }

    setCenter(centerVec) {
        this.center = centerVec;
    }

    hash(index) {
        // https://www.cs.hmc.edu/~geoff/classes/hmc.cs070.200101/homework10/hashfuncs.html
        return ((index*(index+3))%41)/41.0;
    }
    /**
     * Initialize a particle buffer
     * Contents are [x position, y position, starting x, starting y]
     * @param  {Array} particleBuffer The buffer to populate
     */
    initBuffer(particleBuffer) {
        for (let i=0;i<this.count;i++)
        {
            let seed = this.hash(i);
            particleBuffer[i] = [0.0, 0.0, seed];
        }
    }

    /**
     * Iterate the particles one time step
     * Passed as a callback to engine
     * @param {Array} particleBuffer Particle array (see initBuffer)
     */
    stepBuffer(dt, inBuffer, outBuffer) {
        let zero = Vector.create([0,0]);
        //TODO use dt
        let dist = 0.05;
        for (let i=0;i<inBuffer.length;i++) {
            let point = inBuffer[i];
            let seed = point[2];
            let p = Vector.create([point[0],point[1]]);
            p = p.subtract(this.center);
            let len = p.distanceFrom(zero);
            let r = 0.3 * Math.pow(seed,0.5) + 0.05;
            if (len !== 0) {
                p = p.multiply(r/len);
            } else {
                p = Vector.create([r, 0]);
            }
            p = p.rotate(0.5 * (((seed*171)%41)/41.0),zero);
            p = p.add(this.center);
            outBuffer[i] = [p.e(1), p.e(2), seed];
        }
    };

    /**
     * Step forward.
     */
    step(dt) {
        this.cloneBuffer(this.prevPrevParticles, this.prevPrevPrevParticles);
        this.cloneBuffer(this.prevParticles, this.prevPrevParticles);
        var tmp = this.particles;
        this.stepBuffer(dt, this.particles, this.prevParticles);
        this.particles = this.prevParticles;
        this.prevParticles = tmp; // Reuse the array
    }

    /**
     * Copy the buffer into another one
     * @param  {Array} inBuffer  Source
     * @param  {Array} outBuffer Destination
     */
    cloneBuffer(inBuffer, outBuffer) {
        for (let i=0;i<inBuffer.length;i++) {
            outBuffer[i] = inBuffer[i];
        }
    }

    getAllParticles () {
        return [
            this.particles,
            this.prevParticles,
            this.prevPrevParticles,
            this.prevPrevPrevParticles
        ];
    }
}