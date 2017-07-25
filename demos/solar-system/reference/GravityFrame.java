import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
public class GravityFrame extends JApplet implements ActionListener
{
	private SimpleGrid grid;
	private javax.swing.Timer time = new javax.swing.Timer (20,this);
	private SolarSystem galaxy;
	private Point mouse, prev;
	private boolean wipe;//whether to clear screen(set by mouse)
	private GravityFrame app;
	public GravityFrame()
	{
		//super("Gravity!");
		init();
		app=this;
		mouse = new Point(0,0);
		prev = new Point(0,0);
		wipe=false;
		MouseFollow mf = new MouseFollow();
				
		this.addMouseMotionListener(mf);
		this.addMouseListener(mf);
		this.setBackground(Color.lightGray);
		setVisible(true);
	}
	
	public void init()
	{
		this.setSize(1000,700);
		galaxy = new SolarSystem();
		time.start();
	}
	public void paint(Graphics g)
	{
	    if (wipe)
		{
	        wipe=false;
	        g.clearRect(0,0,getWidth(),getHeight());
		}
	    galaxy.step(g);
	}
	public void actionPerformed(ActionEvent e)
	{
		repaint();
	}
	public class MouseFollow implements MouseMotionListener, MouseListener
	{
	    
	    public MouseFollow()
	    {
	    }
	    public void mouseExited(MouseEvent e)
	    {}
	    public void mouseEntered(MouseEvent e)
	    {}
	    public void mousePressed(MouseEvent e)
	    {}
	    public void mouseReleased(MouseEvent e)
	    {}
	    public void mouseClicked(MouseEvent e)
	    {}
	    public void mouseMoved(MouseEvent e)
		{
	        prev = mouse;
			mouse = new Point(e.getX(),e.getY());
			double dx = mouse.x-prev.x;
			double dy = mouse.y-prev.y;
			
		}
		public void mouseDragged(MouseEvent e)
		{
		    prev = mouse;
			mouse = new Point(e.getX(),e.getY());
			double dx = mouse.x-prev.x;
			double dy = mouse.y-prev.y;
			if (e.getModifiers()==MouseEvent.BUTTON1_MASK)
			{
			    galaxy.getEnv().p.x+=dx;
			    galaxy.getEnv().p.y+=dy;
			    wipe=true;
			}
			else 
			    if (e.getModifiers()==MouseEvent.BUTTON3_MASK)
				{
			        int i = galaxy.getEnv().si, len = galaxy.getEnv().s.length;
			        i+=2*len+dy;
			        i%=2*len;
			        if (i>=len)
			        {
			            i=2*len-i-1;
			        }
			        galaxy.getEnv().si=i;
				    wipe=true;
				}
			app.repaint();
			
		}
	}
}
