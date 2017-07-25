//import java.awt.*;
public class Circle extends Shape
{
    private double myDiameter;
    
//Constructors
    
      public Circle()
    {
        super(0,0);
        myDiameter = 10;
    }
    public Circle(Point p, double diam)
    {
        super(p.x,p.y);
        myDiameter = diam;
    }
    
//Accessors
    public double diameter()
    { return myDiameter; }
    
    public double radius()
    { return diameter()/2.0; }
    
    public double height()
    { return diameter(); }
    
    public double width()
    { return diameter(); }
    
    public void moveTo(Point p)
    {
        setXcenter(p.x);
        setYcenter(p.y);
    }
    public void move(Vector v)
    {
        Vector t = (Vector)v.clone();
        t.translate(center());//setStart
        moveTo(t.endPt());
    }
    
//Actions
    public void show(java.awt.Graphics g)
    {
        //transform the view frame
        int d = (int)(diameter());// /(6*s[si]));
        //double s = 1;
        //Point p= new Point(0,0);
        //int d = (int)(diameter()/s);
        double x, y;
        x=Xcenter();
        y=Ycenter();
        /*x+=p.x;
        y+=p.y;
        x*=s[si];
        y*=s[si];
        x+=p.x;
        y+=p.y;*/
        g.fillOval((int)x,(int)y,d,d);
        
    }
}