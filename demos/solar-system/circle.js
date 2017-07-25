class Circle extends Shape
{
	// private double myDiameter;
    
//Constructors
	
  	constructor()
	{
		super(0,0);
		this.myDiameter = 10;
	}

	// p - Point
	// diam - double
	constructor(p, diam)
	{
		super(p.x,p.y);
		this.myDiameter = diam;
	}
	
//Accessors
	// returns double
	funtion diameter()
	{ return this.myDiameter; }
	
	// returns double
	funtion radius()
	{ return this.diameter()/2.0; }
	
	// returns double
	funtion height()
	{ return this.diameter(); }
	
	// returns double
	funtion width()
	{ return this.diameter(); }
	// p - Point
	function moveTo(p)
	{
		this.setXcenter(p.x);
		this.setYcenter(p.y);
	}
	// v - Vector
	function move(v)
	{
		let t = v.clone();
		t.translate(this.center());//setStart
		this.moveTo(t.endPt());
	}
	
//Actions
	function show(ctx)
	{
	    //transform the view frame
	    let d = this.diameter();// /(6*s[si]));
	    let x, y;
	    x=Xcenter();
	    y=Ycenter();
	    //TODO
	    // g.fillOval((int)x,(int)y,d,d);
		
	}
}