import java.awt.*;
import java.util.*;
public class SimpleGrid implements Environment
{
	private CDLL list;
	public int si;
	public double s[];
    public Point p= new Point(200,200);
    public SpaceObject sun=null;
    
	public SimpleGrid()
	{
		list = new CDLL();
		s = new double[50];
        for (int i=10;i<60;i++)
        {
            s[i-10]=(double)i/80.0;
        }
        si=s.length-1;
	}
	public void add(SpaceObject p)
	{
	    if (sun==null)
	        sun=p;
		list.addFirst(p);
	}
	//get the force at point p
	private Vector force(Point p, int count, double mass)
 	{
	    Vector k1, k2, k3, k4, v;
	    double dt=.01;
	    
	    //runge-kutta integration
	    //compute accelerations for all the space objects
		///k1 = f(xn)dt
		///k2 = f(xn + (1/2)k1)dt
		///k3 = f(xn + (1/2)k2)dt
		///k4 = f(xn + k3)dt
		//xn+1=xn+(1/6)(k1+2k2+2k3+k4);
        k1 = getForce(p, count, mass).dilate(dt);
		k2 = getForce(Point.add(p,Point.sub(k1.endPt(),k1.startPt()).scale(.5*dt)), count, mass);
		k3 = getForce(Point.add(p,Point.sub(k2.endPt(),k2.startPt()).scale(.5*dt)), count, mass);
		k4 = getForce(Point.add(p,Point.sub(k3.endPt(),k3.startPt()).scale(dt)), count, mass);
		/*k1.setStart(p);
		k2.setStart(p);
		k3.setStart(p);
		k4.setStart(p);*/
		v = new Vector();
		k2.dilate(2);
		k3.dilate(2);
		v.add(k1);
		v.add(k2);
		v.add(k3);
		v.add(k4);
        //return k1;
	    return v.dilate(1.0/6.0);
 	}
	private Vector getForce(Point p, int current, double mass)
 	{
 	    Vector pq, eax=new Vector();
 	    Particle q=null;
 	    int count = 0;
 	    for (Iterator itr = list.iterator();itr.hasNext();count++)
 	    {
 	       q=(Particle)itr.next();
 	       if (count==current)
 	           continue;
	        //objects do not interact with themselves
	        //exBUG: objects in same location also do not interact with themselves 
            pq = new Vector(p,q.center());
            double dist2 = Math.pow(pq.magnitude(),2);
    		if (dist2<1)
    			dist2=1;
    		double mm=mass*q.getMass();
    		//qp.setStart(p);
    		pq.setMagnitude(Particle.G*(mm/dist2));
		    eax.add(pq);
 	    }
	    return eax;
 	}
	
	private void process()
	{
	    if (list.isEmpty())
			return;
	    
		Particle q=null;
	    Vector v;
	    Point p;
	    int count = 0;//current index
	    for (Iterator itr = list.iterator();itr.hasNext();count++)
	    {
	        q=(Particle)itr.next();
	        
	        p = q.center();
	        v = force(p,count, q.getMass());
	        //v = getForce(p, count, q.getMass());
	        q.applyForce(new Vector(p,v.magnitude(),v.angle()));
	        //Vector t = new Vector(center(),G*(mm/dist2),v.angle());
	        
	    }
	}
	
	private void move()
	{
		for(Iterator itr = list.iterator();itr.hasNext();)
		{
			Particle p = ((Particle)itr.next());
			if (true)
				p.move();
		}
	}
	public void show(Graphics g)
	{
	    Particle q;
		for(Iterator itr = list.iterator();itr.hasNext();)
		{
		    q = (Particle)itr.next();
		    //transform the view frame
		    int d = (int)(q.diameter()/(4*Math.pow(s[si],.5)));
		    double x, y, sx, sy;
		    sx=sun.center().x;
		    sy=sun.center().y;
		    x=q.Xcenter();
		    y=q.Ycenter();
		    x-=sx;
		    y-=sy;
		    x*=s[si];
		    y*=s[si];
		    x+=p.x;
		    y+=p.y;
		    if (d<2)
		        d=2;
		    g.fillOval((int)x,(int)y,d,d);
		}
	}
	public void step(Graphics g)
	{
		g.setColor(new Color(150,150,150));//Color.lightGray);//
		show(g);//cover last position
		process();//compute accelerations
		move();//move
		g.setColor(Color.black);
		show(g);//show new position
	}
}