//import java.awt.*;
public class Particle extends Circle implements SpaceObject
{
    public Vector myVelocity;
    public DoubleNode myPos;
    private double density;
    public static final double G = .01;
    
    public Particle(Point p)
    {
        super (p,10);
        density=1;
        myVelocity = new Vector();
    }
    public Particle(Point p, double diam)
    {
        super(p,diam);
        density=1;
        myVelocity = new Vector();
    }
//accessors
    public double getVolume()
    { return (4.0/3.0)*Math.PI*Math.pow((diameter()/2),3); }
    
    public double getMass()
    { return getVolume()*density; }
    
//mutators
    public void setDensity(double d)
    { density = d; }
    
    public void push(Particle that)
    {
        push (that, 1);
    }
    //times is the 1 over the number of calulations per timestep
    public void push(Particle that, double factor)
    {
        Point tis = this.center();
        Point tat = that.center();
        Vector v = new Vector(tis,tat);//tat, tis
        double dist2 = Math.pow(v.magnitude(),2);//,2
        if (dist2<1)
            dist2=1;
        double mm=this.getMass()*that.getMass();
        //System.out.println(mm);
        Vector t = new Vector(center(),G*(mm/dist2),v.angle());
        t.dilate(factor);
        //System.out.println(t.magnitude());
        applyForce(t);
    }
    public void moveOn(Vector v)
    {
        v.translate(center());
        moveTo(v.endPt());
    }
    public void move()
    {
        //if (myVelocity.magnitude()>15)
        //    myVelocity.setMagnitude(15);
        super.move(myVelocity);
    }
    
    public void applyForce(Vector force)
    {
        //f=ma... f/m=a
        double factor = 1.0/getMass();
        Vector t = force.dilate(factor);
        //System.out.println(t.magnitude());
        myVelocity.add(t);
    }
    public String toString()
    {
        return "Particle at "+//center().toString().substring(14);
            + Xcenter()+" "+Ycenter();    
    }
}

