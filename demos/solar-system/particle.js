
// public class Particle extends Circle implements SpaceObject
class Particle extends Circle
{
    // public Vector myVelocity;
    // public DoubleNode myPos;
    // private double density;
    // public static final double G = .01;
    const static G() {
        return 0.01;
    }

    // p - point
    constructor(p)
    {
        super (p,10);
        this.density=1;
        this.myVelocity = new Vector();
        let myPos = null;
    }
    // p - point
    // diam - double
    constructor(p, diam)
    {
        super(p,diam);
        this.density=1;
        this.myVelocity = new Vector();
        this.myPos = null;
    }

//accessors
    public double getVolume()
    { return (4.0/3.0)*Math.PI*Math.pow((this.diameter()/2),3); }
    
    public double getMass()
    { return this.getVolume()*this.density; }
    
//mutators
    // d - double
    public void setDensity(d)
    { this.density = d; }
    
    // that - particle
    public void push(that)
    {
        this.push(that, 1);
    }

    //times is the 1 over the number of calulations per timestep
    // that - Particle
    // factor - double
    public void push(that, factor)
    {
        let tis = this.center();
        let tat = that.center();
        let v = new Vector(tis,tat);//tat, tis
        let dist2 = Math.pow(v.magnitude(),2);//,2
        if (dist2<1)
            dist2=1;
        let mm=this.getMass()*that.getMass();
        //System.out.println(mm);
        let t = new Vector(this.center(),Particle.G*(mm/dist2),v.angle());
        t.dilate(factor);
        //System.out.println(t.magnitude());
        this.applyForce(t);
    }
    public void moveOn(Vector v)
    {
        v.translate(this.center());
        this.moveTo(v.endPt());
    }
    public void move()
    {
        //if (myVelocity.magnitude()>15)
        //    myVelocity.setMagnitude(15);
        super.move(myVelocity);
    }
    // force - vector
    public void applyForce(force)
    {
        //f=ma... f/m=a
        let factor = 1.0/this.getMass();
        let t = force.dilate(factor);
        //System.out.println(t.magnitude());
        this.myVelocity.add(t);
    }
    public String toString()
    {
        return "Particle at "+//center().toString().substring(14);
            + this.Xcenter()+" "+this.Ycenter();    
    }
}

