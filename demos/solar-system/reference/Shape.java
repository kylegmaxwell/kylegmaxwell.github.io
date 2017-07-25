import java.awt.*;
public abstract class Shape
{

	private double myLeft;
	private double myTop;
	private Color myColor;
	public static int NextAvailableID=0;
	private int myID;

	public Shape()
	{
		myLeft=0;
		myTop=0;
		myColor = Color.black;
		giveID();
	}

	public Shape(double x, double y)
	{
		setXcenter(x);
		setYcenter(y);
		myColor = Color.black;
		giveID();
	}
	
	public Shape(double x, double y, Color col)
	{
		myLeft = x;
		myTop = y;
		myColor = col;
		giveID();
	}
	
	private void giveID()
	{
		myID=NextAvailableID;
		NextAvailableID++;
	}
//accessors
	public int ID()
	{ return myID; }
	
	public Color color()
	{ return myColor; }
	
	public double left()
	{ return myLeft; }

	public double top()
	{ return myTop; }
	
	public Point center()
	{ return new Point(Xcenter(),Ycenter()); }

//mutators
	public void setColor(Color newColor)
	{ myColor = newColor; }

	public void moveLeft(double amt)
	{ myLeft -= amt; }

	public void moveRight(double amt)
	{ myLeft += amt; }

	public void moveUp(double amt)
	{ myTop -= amt; }

	public void moveDown(double amt)
	{ myTop += amt; }
	
	public void setLeft(double newLeft)
	{ myLeft = newLeft; }
	
	public void setTop(double newTop)
	{ myTop = newTop; }
	public void setXcenter(double newX)
	{ myLeft = newX-(width()/2.0); }
	
	public void setYcenter(double newY)
	{ myTop = newY-(height()/2.0); }
//dependant
	public void setRight(double newRight)
	{ myLeft = newRight-width(); }
	
	public void setBottom(double newBottom)
	{ myTop = newBottom-height(); }

	public double right()
	{ return left()+width(); }
	
	public double bottom()
	{ return top()+height(); }
	
	public double Xcenter()
	{ return left()+(width()/2.0); }
	
	public double Ycenter()
	{ return top()+(height()/2.0); }
	
	
	public abstract double height();
	public abstract double width();
	public abstract void show(java.awt.Graphics g);
}