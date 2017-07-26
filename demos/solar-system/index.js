
function main() {
    console.log("INDEX");
    Test.run();
    // galaxy = new SolarSystem();
    let canvas = document.querySelector('#gravityFrame');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    let ctx = canvas.getContext('2d');
    paint(ctx, canvas.width, canvas.height);
}

// Graphics g
function paint(ctx, width, height)
{
 //    if (wipe)
    // {
 //        wipe=false;
 //        g.clearRect(0,0,getWidth(),getHeight());
 ctx.clearColor = 'red';
 ctx.clearRect(0, 0, width, height);
    // }
    // galaxy.step(g);
    ctx.beginPath();
    let p = new Particle();
    p.moveTo(new Point(100,50));
    p.show(ctx);
    ctx.fill();
}