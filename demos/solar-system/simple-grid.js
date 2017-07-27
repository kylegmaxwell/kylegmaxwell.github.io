class SimpleGrid
{
    constructor()
    {
        this.list = [];
        this.s = [];
        this.s.length = 50;
        for (let i=10;i<60;i++)
        {
            this.s[i-10]=i/80.0;
        }
        this.si=this.s.length-1;
        this.p = new Point(200,200);
    }

    // p - SpaceObject (particle)
    add(p)
    {
        if (this.sun==null)
            this.sun=p;
        this.list = [p].concat(this.list);
    }

    //get the force at point p
    // p - Point
    // count - int
    // mass - double
    // returns Vector
    force(p, count, mass)
     {
        // vectors
        let k1, k2, k3, k4, v;
        let dt=.01;

        //runge-kutta integration
        //compute accelerations for all the space objects
        ///k1 = f(xn)dt
        ///k2 = f(xn + (1/2)k1)dt
        ///k3 = f(xn + (1/2)k2)dt
        ///k4 = f(xn + k3)dt
        //xn+1=xn+(1/6)(k1+2k2+2k3+k4);
        k1 = this.getForce(p, count, mass).dilate(dt);
        k2 = this.getForce(Point.add(p,Point.sub(k1.endPt(),k1.startPt()).scale(.5*dt)), count, mass);
        k3 = this.getForce(Point.add(p,Point.sub(k2.endPt(),k2.startPt()).scale(.5*dt)), count, mass);
        k4 = this.getForce(Point.add(p,Point.sub(k3.endPt(),k3.startPt()).scale(dt)), count, mass);
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

     // p - Point
     // current - int
     // mass - double
     // returns Vector
    getForce(p, current, mass)
    {
        // vectors
        let pq, eax=new Vector();
        for (let count=0; count < this.list.length; count++)
        {
            let q=this.list[count];
            if (count==current)
                continue;
            //objects do not interact with themselves
            //exBUG: objects in same location also do not interact with themselves
            pq = Vector.fromEndPoints(this.p,q.center());
            let dist2 = Math.pow(pq.magnitude(),2);
            if (dist2<1)
                dist2=1;
            let mm=mass*q.getMass();
            pq.setMagnitude(Particle.G()*(mm/dist2));
            eax.add(pq);
        }
        return eax;
     }

    process()
    {
        if (this.list.length === 0)
            return;

        for (let count=0; count < this.list.length; count++)
        {
            let q = this.list[count];

            let p = q.center();
            let v = this.force(p,count, q.getMass());
            let f = Vector.fromPolar(p,v.magnitude(),v.angle());
            q.applyForce(f);

        }
    }

    move()
    {
        for (let count=0; count < this.list.length; count++)
        {
            this.list[count].move();
        }
    }

    show(ctx)
    {
        for (let count=0; count < this.list.length; count++)
        {
            let q = this.list[count];
            //transform the view frame
            let d = (q.diameter()/(4*Math.pow(this.s[this.si],.5)));
            // doubles
            let x, y, sx, sy;
            sx=this.sun.center().x;
            sy=this.sun.center().y;
            x=q.Xcenter();
            y=q.Ycenter();
            x-=sx;
            y-=sy;
            x*=this.s[this.si];
            y*=this.s[this.si];
            x+=this.p.x;
            y+=this.p.y;
            if (d<2)
                d=2;
            ctx.beginPath();
            ctx.arc(x, y, 0.5*d, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    step(ctx)
    {
        // g.setColor(new Color(150,150,150));//Color.lightGray);//
        // show(g);//cover last position
        this.process();//compute accelerations
        this.move();//move
        // g.setColor(Color.black);
        this.show(ctx);//show new position
    }
}