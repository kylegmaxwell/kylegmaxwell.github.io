class SolarSystem
{

    constructor()
    {
        this.x = 230;
        this.y = 300;

        this.env = new SimpleGrid();
        this.sun = new Particle(new Point(this.x,this.y),45);

        //balance frame of reference
        //sun.myVelocity.add(new Vector(0,-.017));

        this.sun.setDensity(50);
        this.env.add(this.sun);
        this.init();
    }

    getEnv()
    {
        return this.env;
    }

    init()
    {
        for (let i=2;i<=7;i++)//3,5
        {
            let p = new Particle(new Point(this.x+150*i,this.y),7);
            p.setDensity(13);
            this.addVelocity(this.sun,p);

            //balance momentum in order to get a stationary frame of reference
            let mv = p.myVelocity.magnitude()*p.getMass();
            this.sun.myVelocity.add(Vector.fromDimensions(0,-1).dilate(mv/this.sun.getMass()));

            this.env.add(p);
            if (i>3)//3
            {
                let r = new Particle(new Point(p.center().x,p.center().y-12),2);
                r.setDensity(.01);
                r.myVelocity=p.myVelocity.clone();
                this.addVelocity(p,r);
                this.env.add(r);
            }
        }
    }

    //sets velocity to a stable orbit
    // big - particle
    // orbit - particle
    addVelocity(big, orbit)
    {
        let velocity = Math.sqrt((2*Particle.G()*big.getMass())/this.distanceBetween(big.center(),orbit.center()));
        let v = Vector.fromEndPoints(big.center(),orbit.center());
        v.rotate(Math.PI/2.0);
        orbit.myVelocity.add(v.setMagnitude(.6*velocity));
    }

    // a - Point
    // b - Point
    // returns double
    distanceBetween(a, b)
    { return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)); }

    step(ctx)
    {
        this.env.step(ctx);
    }

}