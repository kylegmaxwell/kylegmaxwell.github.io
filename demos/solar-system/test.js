
class Test
{
    static tolerance()
    {
        return 0.000001;
    }

    static fuzzyEqual(a, b) {
        Test.expect(Math.abs(a-b) < Test.tolerance(), a +' should equal '+b);
    }

    static equal(a, b) {
        Test.expect(a===b, a +' should equal '+b);
    }

    static expect(value, message) {
        if (!value) {
            throw new Error(message);
        }
    }

    static run() {
        Test.point();
        Test.vector();
        Test.circle();
        Test.particle();
        Test.grid();
        Test.solar();
        console.log("Tests passed")
    }

    static point() {
        let p = new Point(1,2);
        let q = new Point(1,5);
        Test.equal(p.toString(),"(1,2)");
        let r = Point.add(p, q);
        Test.equal(r.toString(),"(2,7)");
        Test.expect(r.equals(r.clone()), "Point equal")
    }

    static vector() {
        let v1 = Vector.fromOrigin(3,4, new Point(0,0));
        Test.fuzzyEqual(v1.magnitude(), 5);
        let v2 = Vector.fromPolar(new Point(0,0), 1, Math.PI/2);
        Test.fuzzyEqual(v2.base(),0);
        Test.fuzzyEqual(v2.height(),1);
    }

    static circle() {
        let c = new Circle();
        Test.expect(c.diameter() > 0, 'Default circle has radius');
        c.moveTo(Vector.fromDimensions(-1,1));
        Test.equal(c.center().x, -1);
        Test.equal(c.center().y, 1);
    }

    static particle() {
        let p = new Particle(new Point(0,0),10);
    }

    static grid() {
        let g = new SimpleGrid();
    }

    static solar() {
        let s = new SolarSystem();
    }
}