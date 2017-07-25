import java.awt.*;
public class SolarSystem
{
    private SimpleGrid env;
    private Particle sun;
    private final int x = 230,y=300;

    
    public SolarSystem()
    {
        env = new SimpleGrid();
        sun = new Particle(new Point(x,y),45);
        
        //balance frame of reference
        //sun.myVelocity.add(new Vector(0,-.017));
        
        sun.setDensity(50);
        env.add(sun);
        init();

        
    }
    public SimpleGrid getEnv()
    { return env; }
    private void init()    
    {
        for (int i=2;i<=7;i++)//3,5
        {
            Particle p = new Particle(new Point(x+150*i,y),7);
            p.setDensity(13);
            addVelocity(sun,p);
            
            //balance momentum in order to get a stationary frame of reference
            double mv = p.myVelocity.magnitude()*p.getMass();
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
    private void addVelocity(Particle big, Particle orbit)
    {
        double velocity = Math.sqrt((2*Particle.G*big.getMass())/distanceBetween(big.center(),orbit.center()));
        Vector v = new Vector(big.center(),orbit.center());
        v.rotate(Math.PI/2.0);
        orbit.myVelocity.add(v.setMagnitude(.6*velocity));
    }
    
    private double distanceBetween(Point a, Point b)
    { return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)); }
    
    //public void show(java.awt.Graphics g)
    //{ env.show(g); }
    
    public void step(Graphics g)
    {
        //sun.moveTo(new Point(x,y));
        env.step(g);
    }
    
}