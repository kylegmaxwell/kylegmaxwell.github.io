class Circle extends Shape
{
    // private double myDiameter;

//Constructors

    constructor(x)
    {
        if (x != null) {
            throw new Error('CIrcle has default constructor');
        }
        super();
        super.initXY(0,0);
        this.myDiameter = 10;
    }

    // p - Point
    // diam - double
    static fromPointDiameter(p, diam)
    {
        let c = new Circle();
        c.setXcenter(p.x);
        c.setYcenter(p.y);
        c.myDiameter = diam;
        return c;
    }

    initPointDiameter(p, diam)
    {
        this.setXcenter(p.x);
        this.setYcenter(p.y);
        this.myDiameter = diam;
    }
//Accessors
    // returns double
    diameter()
    { return this.myDiameter; }

    // returns double
    radius()
    { return this.diameter()/2.0; }

    // returns double
    height()
    { return this.diameter(); }

    // returns double
    width()
    { return this.diameter(); }
    // p - Point
    moveTo(p)
    {
        this.setXcenter(p.x);
        this.setYcenter(p.y);
    }
    // v - Vector
    move(v)
    {
        let t = v.clone();
        t.translate(this.center());//setStart
        this.moveTo(t.endPt());
    }

//Actions
    show(ctx)
    {
        ctx.fillStyle=this.color();
        //transform the view frame
        let d = this.diameter();// /(6*s[si]));
        let x, y;
        x=this.Xcenter();
        y=this.Ycenter();
        //TODO
        // g.fillOval((int)x,(int)y,d,d);
        ctx.arc(x, y, 0.5*d, 0, 2 * Math.PI);

    }
}