class Vector
{
    // double x;//base
    // double y;//height
    // double r;//hypotenuse
    // double fee;//angle in radians
    // Point origin;
    // Point endPoint;

//constructors
    constructor()
    {
        this.x=0;
        this.y=0.0;
        this.origin = new Point(0,0);
        this.updatePolars();
    }
    // b - double
    // h - double
    static fromDimensions(b, h)
    {
        let v = new Vector();
        v.x=b;
        v.y=h;
        // v.origin = new Point(0,0);
        v.updatePolars();
        return v;
    }

    // b - double base
    // h - double height
    // p - Point
    static fromOrigin(b, h, p)
    {
        let v = new Vector();
        v.x=b;
        v.y=h;
        v.origin = p;
        v.updatePolars();
        return v;
    }
    // p - Point
    // mag - double
    // angle - double
    static fromPolar(p, mag, angle)
    {
        let v = new Vector();
        v.origin = p;
        v.r=mag;
        v.fee=Vector.validAngle(angle);
        v.updateComponents();
        return v;
    }

    // theOrigin - Point
    // theEnd - Point
    static fromEndPoints(theOrigin, theEnd)
    {
        let v = new Vector();
        v.origin=theOrigin;
        v.setEnd(theEnd);
        return v;
    }

//accessors
    // returns double
    magnitude()
    {
        //dont forget that r is updated with this
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    // returns double
    angle()
    { return this.fee; }

    // returns double
    base()
    { return this.x; }

    // returns double
    height()
    { return this.y; }

    // returns Point
    startPt()
    { return this.origin.clone(); }

    // returns Point
    endPt()
    { return this.endPoint.clone(); }

    // returns Vector
    clone()
    {
        return Vector.fromOrigin(this.x,this.y,this.origin);
    }

//mutators
    // returns Vector
    rotate(angleInRadians)
    {
        this.fee+=angleInRadians;
        this.updateComponents();
        return this;
    }

    // newmag - double
    // returns Vector
    setMagnitude(newMag)
    {
        this.r = newMag;
        this.updateComponents();
        return this;
    }

    // v - Vector
    add(v)
    {
        this.x+=v.x;
        this.y+=v.y;
        this.updatePolars();
        return this;
    }

    // v - Vector
    subtract(v)
    {
        this.x-=v.x;
        this.y-=v.y;
        this.updatePolars();
        return this;
    }

    // factor - double
    // returns Vector
    dilate(factor)
    {
        this.r *= factor;
        this.updateComponents();
        return this;
    }

    // newOrigin - Point
    translate(newOrigin)
    {
        this.origin = newOrigin.clone();
        this.updatePolars();
    }

    // newEnd - Point
    setEnd(newEnd)
    {
        this.x=newEnd.x-this.startPt().x;
        this.y=newEnd.y-this.startPt().y;
        this.updatePolars();
        return this;
    }

    // newStart - Point
    setStart(newStart)
    {
        this. x=this.endPt().x-newStart.x;
        this.y=this.endPt().y-newStart.y;
        this.origin = new newStart.clone();
        this.updatePolars();
    }

//actions
    show(ctx)
    {
        throw new Error("TODO");
        // int x1,y1,x2,y2;
        // x1=(int)startPt().x;
        // y1=(int)startPt().y;
        // x2=(int)endPt().x;
        // y2=(int)endPt().y;
        // g.drawLine(x1,y1,x2,y2);
    }
//helpers
    // angle - double
    // returns double
    static validAngle(angle)
    {
        if (angle<0)
            angle+=2*Math.PI;
        else if (angle>=(Math.PI*2))
            angle-=2*Math.PI;
        return angle;
    }

    //precondition: x, y and origin are up to date
    //postcondition: r, fee and endPt are updated
    updatePolars()
    {
        this.r = this.magnitude();
        this.fee = Math.atan2(this.y,this.x);//ArcTan(y/x)
        this.updateEnd();
    }

    //precondition: r, fee and origin are to date
    //postcondition: x, y and endPt are updated
    updateComponents()
    {
        this.y = this.r*Math.sin(this.fee);
        this.x = this.r*Math.cos(this.fee);
        this.updateEnd();
    }

    updateEnd()
    {
        this.endPoint = new Point(this.origin.x+this.x,this.origin.y+this.y);
    }

    // returns string
    toString()
    {
        return "Vector: b="+x+" h="+y;
    }

}