//kyle maxwell
//tufts university


#ifndef CELL_H
#define CELL_H

#include "vecmath.h"

//struct to represent the properties of a region of fluid
struct Cell
{
	vec3 vel;	//velocity
	float p;	//density
	float t;	//temperature
};
#endif