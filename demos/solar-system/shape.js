let NextAvailableID=0;

class Shape
{

    // private double myLeft;
    // private double myTop;
    // private Color myColor;
    // public static int NextAvailableID=0;
    // private int myID;

    constructor(x)
    {
        if (x != null) {
            throw new Error('Shape has default constructor');
        }
        this.myLeft=0;
        this.myTop=0;
        this.myColor = 'black';
        this.giveID();
    }

    // x - double
    // y - double
    initXY(x, y)
    {
        this.setXcenter(x);
        this.setYcenter(y);
        this.myColor = 'black';
        this.giveID();
        return this;
    }

    // x - doble
    // y - double
    // col - Color
    initXYColor(x, y, col)
    {
        this.myLeft = x;
        this.myTop = y;
        this.myColor = col;
        this.giveID();
        return this
    }

    giveID()
    {
        this.myID=NextAvailableID++;
    }
//accessors
    // returns int
    ID()
    { return this.myID; }

    // returns Color
    color()
    { return this.myColor; }

    // returns double
    left()
    { return this.myLeft; }

    // returns double
    top()
    { return this.myTop; }

    // returns Point
    center()
    { return new Point(this.Xcenter(),this.Ycenter()); }

//mutators
    // newColor - Color
    setColor(newColor)
    { this.myColor = newColor; }
    // amt - double
    moveLeft(amt)
    { this.myLeft -= amt; }
    // amt - double
    moveRight(amt)
    { this.myLeft += amt; }
    // amt - double
    moveUp(amt)
    { this.myTop -= amt; }
    // amt - dobule
    moveDown(amt)
    { this.myTop += amt; }
    // newLeft - double
    setLeft(newLeft)
    { this.myLeft = newLeft; }
    // newTop - double
    setTop(newTop)
    { this.myTop = newTop; }
    // newX - double
    setXcenter(newX)
    { this.myLeft = newX-(this.width()/2.0); }
    // newY - double
    setYcenter(newY)
    { this.myTop = newY-(this.height()/2.0); }
//dependant
    // newRight - double
    setRight(newRight)
    { this.myLeft = newRight-this.width(); }
    // newBottom - double
    setBottom(newBottom)
    { this.myTop = newBottom-this.height(); }

    // returns double
    right()
    { return this.left()+this.width(); }

    // returns double
    bottom()
    { return this.top()+this.height(); }

    // returns double
    Xcenter()
    { return this.left()+(this.width()/2.0); }

    // returns double
    Ycenter()
    { return this.top()+(this.height()/2.0); }


    // abstract double height();
    // abstract double width();
    // abstract void show(java.awt.Graphics g);
}