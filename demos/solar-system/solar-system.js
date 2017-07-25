class SolarSystem
{

    
    constructor()
    {
        const x = 230;
        const y = 300;

        this.env = new SimpleGrid();
        this.sun = new Particle(new Point(x,y),45);
        
        //balance frame of reference
        //sun.myVelocity.add(new Vector(0,-.017));
        
        sun.setDensity(50);
        env.add(sun);
        init();

        
    }

    getEnv()
    {
        return env;
    }
    
    void init()    
    {
        for (int i=2;i<=7;i++)//3,5
        {
            let p = new Particle(new Point(x+150*i,y),7);
            p.setDensity(13);
            this.addVelocity(sun,p);
            
            //balance momentum in order to get a stationary frame of reference
            let mv = p.myVelocity.magnitude()*p.getMass();
            sun.myVelocity.add(new Vector(0,-1).dilate(mv/sun.getMass()));
            
            env.add(p);
            if (i>3)//3
            {
                Particle r = new Particle(new Point(p.center().x,p.center().y-12),2);
                r.setDensity(.01);
                r.myVelocity=(Vector)p.myVelocity.clone();
                addVelocity(p,r);
                env.add(r);
            }
        }
    }
    
    //sets velocity to a stable orbit
    // big - particle
    // orbit - particle
    void addVelocity(big, orbit)
    {
        let velocity = Math.sqrt((2*Particle.G*big.getMass())/distanceBetween(big.center(),orbit.center()));
        let v = new Vector(big.center(),orbit.center());
        v.rotate(Math.PI/2.0);
        orbit.myVelocity.add(v.setMagnitude(.6*velocity));
    }
    
    double distanceBetween(Point a, Point b)
    { return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)); }
    
    void step(Graphics g)
    {
        // env.step(g);
    }
    
}