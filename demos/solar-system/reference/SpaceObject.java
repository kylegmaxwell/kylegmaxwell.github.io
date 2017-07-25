public interface SpaceObject
{
	Point center();
	void applyForce(Vector v);
	double getMass();
	double getVolume();
}
