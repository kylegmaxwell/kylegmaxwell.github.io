
// class Particle extends Circle implements SpaceObject
class Particle extends Circle
{
    // Vector myVelocity;
    // DoubleNode myPos;
    // private double density;
    // static final double G = .01;
    static G() {
        return 0.01;
    }

    constructor() {
        super();
        this.initPointDiameter(new Point(0,0), 10);
    }
    // p - point
    initPoint(p)
    {
        super.initPointDiameter(p, 10);
        this.density=1;
        this.myVelocity = new Vector();
        this.myPos = null;
    }
    // p - point
    // diam - double
    initPointDiameter(p, diam)
    {
        super.initPointDiameter(p, diam);
        this.density=1;
        this.myVelocity = new Vector();
        this.myPos = null;
    }

//accessors
    // returns double
    getVolume()
    { return (4.0/3.0)*Math.PI*Math.pow((this.diameter()/2),3); }

    // returns double
    getMass()
    { return this.getVolume()*this.density; }

//mutators
    // d - double
    setDensity(d)
    { this.density = d; }

    // that - particle
    push(that)
    {
        this.push(that, 1);
    }

    //times is the 1 over the number of calulations per timestep
    // that - Particle
    // factor - double
    push(that, factor)
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
    // v - Vector
    moveOn(v)
    {
        v.translate(this.center());
        this.moveTo(v.endPt());
    }
    move()
    {
        //if (myVelocity.magnitude()>15)
        //    myVelocity.setMagnitude(15);
        super.move(this.myVelocity);
    }
    // force - vector
    applyForce(force)
    {
        //f=ma... f/m=a
        let factor = 1.0/this.getMass();
        let t = force.dilate(factor);
        //System.out.println(t.magnitude());
        this.myVelocity.add(t);
    }
    // returns string
    toString()
    {
        return "Particle at "+//center().toString().substring(14);
            + this.Xcenter()+" "+this.Ycenter();
    }
}

