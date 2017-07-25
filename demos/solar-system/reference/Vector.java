import java.awt.*;
public class Vector
{
	private double x;//base
	private double y;//height
	private double r;//hypotenuse
	private double fee;//angle in radians
	private Point origin;
	private Point endPoint;
	
//constructors
	public Vector()
	{
		x=0;
		y=0.0;
		origin = new Point(0,0);
		updatePolars();
	}
	public Vector (double b, double h)
	{
		x=b;
		y=h;
		origin = new Point(0,0);
		updatePolars();
	}
	public Vector(double b, double h, Point p)
	{
		x=b;
		y=h;
		origin = p;
		updatePolars();
	}
	
	public Vector(Point p, double mag, double angle)
	{
		origin = p;
		r=mag;
		fee=validAngle(angle);
		updateComponents();
	}
	
	public Vector(Point theOrigin, Point theEnd)
	{
		origin=theOrigin;
		setEnd(theEnd);
	}

//accessors	
	public double magnitude()
	{
		//dont forget that r is updated with this
		return Math.sqrt(x*x + y*y);
	}
	
	public double angle()
	{ return fee; }
	
	public double base()
	{ return x; }
	
	public double height()
	{ return y; }
	
	public Point startPt()
	{ return new Point(origin); }
	
	public Point endPt()
	{ return new Point(endPoint); }
	
	public Object clone()
	{
		return new Vector(x,y,origin);
	}
	
//mutators
	public Vector rotate(double angleInRadians)
	{
		fee+=angleInRadians;
		updateComponents();
		return this;
	}
	
	public Vector setMagnitude(double newMag)
	{
		r = newMag;
		updateComponents();
		return this;
	}
	public void add(Vector v)
	{
		x+=v.x;
		y+=v.y;
		updatePolars();
	}
	
	public void subtract(Vector v)
	{
		x-=v.x;
		y-=v.y;
		updatePolars();
	}
	
	public Vector dilate(double factor)
	{
		r *= factor;
		updateComponents();
		return this;
	}
	
	public void translate(Point newOrigin)
	{
		origin = new Point(newOrigin);
		updatePolars();
	}
	public void setEnd(Point newEnd)
	{
		x=newEnd.x-startPt().x;
		y=newEnd.y-startPt().y;
		updatePolars();
	}
	
	public void setStart(Point newStart)
	{
		x=endPt().x-newStart.x;
		y=endPt().y-newStart.y;
		origin = new Point(newStart);
		updatePolars();
	}
	
//actions
	public void show(Graphics g)
	{
		int x1,y1,x2,y2;
		x1=(int)startPt().x;
		y1=(int)startPt().y;
		x2=(int)endPt().x;
		y2=(int)endPt().y;
		g.drawLine(x1,y1,x2,y2);
	}
//private helpers
	private double validAngle(double angle)
	{//throw new ArithmeticException("Invalid Angle:"+angle);
		if (angle<0)
			angle+=2*Math.PI;
		else if (angle>=(Math.PI*2))
			angle-=2*Math.PI;
			
		return (angle);
	}
	
	//precondition: x, y and origin are up to date
	//postcondition: r, fee and endPt are updated
	private void updatePolars()
	{
		r = magnitude();
		fee = Math.atan2(y,x);//ArcTan(y/x)
		updateEnd();
	}
	
	//precondition: r, fee and origin are to date
	//postcondition: x, y and endPt are updated
	public void updateComponents()
	{
		y = r*Math.sin(fee);
		x = r*Math.cos(fee);
		updateEnd();
	}
	
	private void updateEnd()
	{
		endPoint = new Point(origin.x+x,origin.y+y);
	}
	
	public String toString()
	{
		return "Vector: b="+x+" h="+y;
	}

}