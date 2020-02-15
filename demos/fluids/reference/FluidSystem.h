/********************************************
Kyle Maxwell
Tufts University
Comp 275
*********************************************/
#ifndef SYSTEM_H
#define SYSTEM_H

#include "Cell.h"

#define SYSTEM_SIZE 25		//dimension of fluid system

//a system to represent flowing fluids
class FluidSystem
{
	friend class Environment;//allow environment private access in order to transfer heat between systems

private:
	//two arrays, one for current values, one for previous
	Cell a[SYSTEM_SIZE][SYSTEM_SIZE];
	Cell b[SYSTEM_SIZE][SYSTEM_SIZE];

	//pointers to remember which array is currently being used
	Cell (*curr)[SYSTEM_SIZE][SYSTEM_SIZE];
	Cell (*next)[SYSTEM_SIZE][SYSTEM_SIZE];

	//switch which array is the current one
	void swap();
	//wrap index to be within system
	void fix(int &r, int &c);
	//set boundary condiditons to contain fluid
	void set_boundary();
	//accessor for the current cell r,c
	Cell *cur(int r, int c);
	Cell *nex(int r, int c);

	//solver

	//simulates diffusion of properties of the fluid
	void diffuse();
	//moves fluid and velocity along vector field
	void advect();
	//removes all divergance/convergance from the vector field
	void project();
	//allows heat to influence vector field
	void churn();
	//remove a percentage of fluid in the system
	void damp();
	
	

	
public:
	float damping;
	vec3 color;

	//default consructor
	FluidSystem();
	//initialize system values
	void step();
	//draw entire system with optional vector field
	void draw(bool wireframe);
	//reset the system
	void reset();
	
	//precondition: xpos, ypos are between zero and one
	//(they represent the fraction of the way across the system of the target point)
	
	//add density at xpos, ypos
	void add_density(float xpos, float ypos);
	//add temperature at xpos, ypos
	void add_temperature(float xpos, float ypos);
	//add the velocity vx,vy at xpos,ypos 
	void add_velocity(float xpos, float ypos, float vx, float vy);

};



#endif
