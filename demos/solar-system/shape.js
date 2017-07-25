let NextAvailableID=0;

class Shape
{

    // private double myLeft;
    // private double myTop;
    // private Color myColor;
    // public static int NextAvailableID=0;
    // private int myID;

    constructor()
    {
        this.myLeft=0;
        this.myTop=0;
        this.myColor = Color.black;
        this.giveID();
    }

    // x - double
    // y - double
    constructor(x, y)
    {
        this.setXcenter(x);
        this.setYcenter(y);
        this.myColor = Color.black;
        this.giveID();
    }
    
    // x - doble
    // y - double
    // col - Color
    constructor(x, y, col)
    {
        this.myLeft = x;
        this.myTop = y;
        this.myColor = col;
        this.giveID();
    }
    
    void giveID()
    {
        this.myID=NextAvailableID++;
    }
//accessors
    int ID()
    { return this.myID; }
    
    Color color()
    { return this.myColor; }
    
    double left()
    { return this.myLeft; }

    double top()
    { return this.myTop; }
    
    Point center()
    { return new Point(this.Xcenter(),this.Ycenter()); }

//mutators
    // newColor - Color
    void setColor(newColor)
    { this.myColor = newColor; }
    // amt - double
    void moveLeft(amt)
    { this.myLeft -= amt; }
    // amt - double
    void moveRight(amt)
    { this.myLeft += amt; }
    // amt - double
    void moveUp(amt)
    { this.myTop -= amt; }
    // amt - dobule
    void moveDown(amt)
    { this.myTop += amt; }
    // newLeft - double
    void setLeft(newLeft)
    { this.myLeft = newLeft; }
    // newTop - double
    void setTop(newTop)
    { this.myTop = newTop; }
    // newX - double
    void setXcenter(newX)
    { this.myLeft = newX-(width()/2.0); }
    // newY - double
    void setYcenter(newY)
    { this.myTop = newY-(height()/2.0); }
//dependant
    // newRight - double
    void setRight(newRight)
    { this.myLeft = newRight-width(); }
    // newBottom - double
    void setBottom(newBottom)
    { this.myTop = newBottom-height(); }

    double right()
    { return this.left()+this.width(); }
    
    double bottom()
    { return this.top()+this.height(); }
    
    double Xcenter()
    { return this.left()+(this.width()/2.0); }
    
    double Ycenter()
    { return this.top()+(this.height()/2.0); }
    
    
    // abstract double height();
    // abstract double width();
    // abstract void show(java.awt.Graphics g);
}