class Point
{
    // public double x,y;
    // p - point
    clone()
    {
        return new Point(this.x, this.y);
    }
    // x - double
    // y - double
    constructor(x, y)
    {
        if (x == null || y == null) throw new Error("Point constructor takes two doubles");
        this.x=x;
        this.y=y;
    }
    // returns int
    intX()
    { return this.x; }

    // returns int
    intY()
    { return this.y; }
    // returns Point
    // d - double
    scale(d)
    {
        this.x*=d;
        this.y*=d;
        return this;
    }
    // returns Point
    // a - Point
    // b - Point
    static add(a, b)
    { return new Point(a.x+b.x,a.y+b.y); }

    // returns Point
    // a - Point
    // b - Point
    static sub(a, b)
    { return new Point(a.x-b.x,a.y-b.y); }
    // returns bool
    // o - Object
    equals(o)
    {
        // Point p = (Point)o;
        let p = o;
        return p.x==this.x && p.y==this.y;
    }
    // returns string
    toString()
    { return "("+this.x+","+this.y+")"; }
}
