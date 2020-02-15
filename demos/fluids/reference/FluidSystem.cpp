/********************************************
Kyle Maxwell
Tufts University
Comp 275
*********************************************/
#define GLUT_BUILDING_LIB
#include <GL/glut.h>
#include <stdlib.h>
#include <math.h>
#include "vecmath.h"
#include "FluidSystem.h"
#include "Cell.h"

//defaut constructor
FluidSystem::FluidSystem()
{
	color = vec3(1,1,1);

	damping=1.0f;
	
	curr = &a;
	next = &b;

	reset();
}
//switch which array is the current one
void FluidSystem::swap()
{
	

	//switch matricies
	Cell (*tc)[SYSTEM_SIZE][SYSTEM_SIZE];
	tc = curr;
	curr = next;
	next = tc;

	//clear old matrix
	for (int r=0;r<SYSTEM_SIZE;r++)
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			nex(r,c)->vel=vec3(0,0,0);
			nex(r,c)->p=(0);
		}
}

//wrap index to be within system
void FluidSystem::fix(int &r, int &c)
{
	while (r<0)
		r+=SYSTEM_SIZE;
	r%=SYSTEM_SIZE;
	while (c<0)
		c+=SYSTEM_SIZE;
	c%=SYSTEM_SIZE;
}


//set boundary condiditons to contain fluid
void FluidSystem::set_boundary()
{
	for (int r=1;r<SYSTEM_SIZE-1;r++)
	{
		//bottom
		cur(r,0)->vel=vec3(0, -cur(r,1)->vel.y ,0);
		nex(r,0)->vel=vec3(0, -nex(r,1)->vel.y ,0);
		//top
		cur(r,SYSTEM_SIZE-1)->vel=vec3(0, -cur(r,SYSTEM_SIZE-2)->vel.y ,0);
		nex(r,SYSTEM_SIZE-1)->vel=vec3(0, -nex(r,SYSTEM_SIZE-2)->vel.y ,0);
	}
	for (int c=1;c<SYSTEM_SIZE-1;c++)
	{
		//bottom
		cur(0,c)->vel=vec3(-cur(1,c)->vel.x ,0,0);
		nex(0,c)->vel=vec3(-nex(1,c)->vel.x ,0,0);
		//top
		cur(SYSTEM_SIZE-1,c)->vel=vec3(-cur(SYSTEM_SIZE-2,c)->vel.x ,0 ,0);
		nex(SYSTEM_SIZE-1,c)->vel=vec3(-nex(SYSTEM_SIZE-2,c)->vel.x ,0 ,0);
	}
	
}

//accessor for the current cell r,c
Cell *FluidSystem::cur(int r, int c)
{
	fix(r,c);
	return &(*curr)[r][c];
}
//accessor for the next cell r,c
Cell *FluidSystem::nex(int r, int c)
{
	fix(r,c);
	return &(*next)[r][c];
}

//SOLVER

//simulates diffusion of properties of the fluid
void FluidSystem::diffuse()
{
	float a = 0.01;//diffusion constant
	//iterative matrix inversion
	for (int i=0;i<20;i++)
	{
		for (int r=1;r<SYSTEM_SIZE-1;r++)
		{
			for (int c=1;c<SYSTEM_SIZE-1;c++)
			{
				
				//diffuse good (iterative matrix inversion)

				nex(r,c)->p=((cur(r,c)->p + a*(nex(r+1,c)->p + nex(r-1,c)->p
															+ nex(r,c+1)->p + nex(r,c-1)->p)) / (1 + 4 * a) );

				nex(r,c)->t=((cur(r,c)->t + a*(nex(r+1,c)->t + nex(r-1,c)->t
															+ nex(r,c+1)->t + nex(r,c-1)->t)) / (1 + 4 * a) );
				
				nex(r,c)->vel=vec3( (cur(r,c)->vel.x + a*( nex(r+1,c)->vel.x + nex(r-1,c)->vel.x + nex(r,c+1)->vel.x + nex(r,c-1)->vel.x)) / (1 + 4 * a),
					(cur(r,c)->vel.y + a*( nex(r+1,c)->vel.y + nex(r-1,c)->vel.y + nex(r,c+1)->vel.y + nex(r,c-1)->vel.y)) / (1 + 4 * a),
					0);
			}
		}
		set_boundary();
	}
}

//moves fluid and velocity along vector field
void FluidSystem::advect()
{
	float x, y;//previous position

	float dt=1;//timestep

	int rr, cc;//corner of previous cell

	for (int r=1;r<SYSTEM_SIZE-1;r++)
	{
		for (int c=1;c<SYSTEM_SIZE-1;c++)
		{
			//figure out where fluid that will be in this cell is (source)
			x = r - dt*cur(r,c)->vel.x;
			y = c - dt*cur(r,c)->vel.y;

			//convert to indicies
			rr = (int)x;
			cc = (int)y;

			//bilinear interpolation from source
			float s1 = x-rr, s0 = 1-s1, t1 = y-cc, t0 = 1-t1;

			nex(r,c)->p=( s0 *(t0*cur(rr  ,cc)->p+t1*cur(rr  ,cc+1)->p) +
							s1 *(t0*cur(rr+1,cc)->p+t1*cur(rr+1,cc+1)->p) );

			nex(r,c)->t=( s0 *(t0*cur(rr  ,cc)->t+t1*cur(rr  ,cc+1)->t) +
							s1 *(t0*cur(rr+1,cc)->t+t1*cur(rr+1,cc+1)->t) );
	
			nex(r,c)->vel=vec3( s0 *(t0*cur(rr  ,cc)->vel.x+t1*cur(rr  ,cc+1)->vel.x) +
							s1 *(t0*cur(rr+1,cc)->vel.x+t1*cur(rr+1,cc+1)->vel.x),

							s0 *(t0*cur(rr  ,cc)->vel.y+t1*cur(rr  ,cc+1)->vel.y) +
								s1 *(t0*cur(rr+1,cc)->vel.y+t1*cur(rr+1,cc+1)->vel.y),0);

		}
	}
	set_boundary();
	
}

//removes all divergance/convergance from the vector field
void FluidSystem::project()
{
	//? something from stam - 
	float p[SYSTEM_SIZE][SYSTEM_SIZE];
	//divergance
	float div[SYSTEM_SIZE][SYSTEM_SIZE];

	//initialize
	for (int r=0;r<SYSTEM_SIZE;r++)
	{
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			div[r][c] = -0.5*(cur(r+1,c)->vel.x - cur(r-1,c)->vel.x + cur(r,c+1)->vel.y - cur(r,c-1)->vel.y);
			p[r][c]=0;
		}
	}

	//iterative matrix inversion
	for (int i=0;i<20;i++)
	{
		for (int r=0;r<SYSTEM_SIZE;r++)
		{
			for (int c=0;c<SYSTEM_SIZE;c++)
			{
				int s=r,t=c;
				
				p[r][c] = div[s][t];

				s=r-1,t=c;
				fix(s,t);//bound indicies into array
				p[r][c] += p[s][t];

				s=r+1,t=c;
				fix(s,t);//bound indicies into array
				p[r][c] += p[s][t];

				s=r,t=c-1;
				fix(s,t);//bound indicies into array
				p[r][c] += p[s][t];
				
				s=r,t=c+1;
				fix(s,t);//bound indicies into array
				p[r][c] += p[s][t];

				p[r][c] /= 4;

			}
		}
		set_boundary();
	}

	for (int r=0;r<SYSTEM_SIZE;r++)
	{
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			int w=r+1,x=c, y=r-1, z=c;
			fix(w,x);
			fix(y,z);

			int ww=r,xx=c+1, yy=r, zz=c-1;
			fix(ww,xx);
			fix(yy,zz);

			//copy to next matrix w/o divergance
			nex(r,c)->vel=vec3( cur(r,c)->vel.x - 0.5*(p[w][x]-p[y][z]),
								cur(r,c)->vel.y - 0.5*(p[ww][xx]-p[yy][zz]),0);
			//preserve density
			nex(r,c)->p=(cur(r,c)->p);
			nex(r,c)->t=(cur(r,c)->t);
		}
	}
	set_boundary();

}

//allows heat to influence vector field
void FluidSystem::churn()
{
	for (int r=0;r<SYSTEM_SIZE;r++)
	{
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			//preserve temperature and density and velocity
			nex(r,c)->p=cur(r,c)->p;
			nex(r,c)->t=cur(r,c)->t;
			nex(r,c)->vel=cur(r,c)->vel;

			//heat rises
			nex(r,c)->vel.y += cur(r,c)->t;
		}
	}
}

//remove a percentage of fluid in the system
void FluidSystem::damp()
{
	//default damping is 1, or none

	for (int r=0;r<SYSTEM_SIZE;r++)
	{
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			//reduce amount of everything
			nex(r,c)->p=(damping*cur(r,c)->p);
			nex(r,c)->t=(damping*cur(r,c)->t);
			nex(r,c)->vel=vec3(damping*cur(r,c)->vel);
		}
	}
}

//iterate one time step of sys
void FluidSystem::step()
{
		diffuse();	swap();
		project();	swap();
		advect();	swap();
		project();	swap();
		churn();	swap();
		project();	swap();
		damp();		swap();
}

//draw entire system
void FluidSystem::draw(bool wireframe)
{
	glColor3f(0.5f,0.5f,0.5f);
	
	//draw vector field
	if (wireframe)
	{
		//draw vector
		glBegin(GL_LINES);
		{

			for (int r=0;r<SYSTEM_SIZE;r++)
			{
				for (int c=0;c<SYSTEM_SIZE;c++)
				{
					vec3 v(r,c,0);
					glVertex3fv(v);
					glVertex3fv(v+cur(r,c)->vel);
					
				}
			}
		}glEnd();

		glPointSize(1);
		//draw cell center
		glBegin(GL_POINTS);
		{

			for (int r=0;r<SYSTEM_SIZE;r++)
			{
				for (int c=0;c<SYSTEM_SIZE;c++)
				{
					vec3 v(r,c,0);
					glVertex3fv(v);
				}
			}
		}glEnd();
	}

	//draw color patches of smoke with bilinear interpolated supersampling
	glBegin(GL_QUADS);
	{
		for (int r=1;r<SYSTEM_SIZE-1;r++)
		{
			for (int c=1;c<SYSTEM_SIZE-1;c++)
			{
				//supersample
				float step=0.1;//10 X 10
				for (float i=0;i<1;i+=step)
				{
					for (float j=0;j<1;j+=step)
					{
						float f;//the intensity of the color depends on the fluid density
						float t;//heat is rendered through the red component of the color

						//bilinear interpolation
						float s1 = i, s0 = 1-s1, t1 = j, t0 = 1-t1;

						f = ( s0 *(t0*cur(r,c)->p+t1*cur(r,c+1)->p) +
										s1 *(t0*cur(r+1,c)->p+t1*cur(r+1,c+1)->p) );

						t = ( s0 *(t0*cur(r,c)->t+t1*cur(r,c+1)->t) +
										s1 *(t0*cur(r+1,c)->t+t1*cur(r+1,c+1)->t) );
						glColor3f(t*color.x,f*color.y,f*color.z);
						//draw square
						vec3 v(r+i,c+j,-1); 
						glVertex3fv(v);
						v.x+=step;
						glVertex3fv(v);
						v.y+=step;
						glVertex3fv(v);
						v.x-=step;
						glVertex3fv(v);
					}
				}
			}
		}
	}glEnd();
}

//reset the system
void FluidSystem::reset()
{
	for (int r=0;r<SYSTEM_SIZE;r++)
		for (int c=0;c<SYSTEM_SIZE;c++)
		{
			cur(r,c)->p=(0);
			cur(r,c)->t=(0);
			cur(r,c)->vel=vec3(0,0,0);
		}
}

//precondition: xpos, ypos are between zero and one
//(they represent the fraction of the way across the system of the target point)


//add density at xpos, ypos
void FluidSystem::add_density(float xpos, float ypos)
{
	float x = xpos*SYSTEM_SIZE, y=ypos*SYSTEM_SIZE;
	cur((int)x,(int)y)->p=(1);
}

//add temperature at xpos, ypos
void FluidSystem::add_temperature(float xpos, float ypos)
{
	float x = xpos*SYSTEM_SIZE, y=ypos*SYSTEM_SIZE;
	cur((int)x,(int)y)->t=(1);
}

//add the velocity vx,vy at xpos,ypos 
void FluidSystem::add_velocity(float xpos, float ypos, float vx, float vy)
{
	float x = xpos*SYSTEM_SIZE, y=ypos*SYSTEM_SIZE;
	for (int r=-1;r<=1;r++)
		for (int c=-1;c<=1;c++)
			cur((int)x,(int)y)->vel=vec3(vec3(vx,vy,0));
}


