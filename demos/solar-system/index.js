
function main() {
    console.log("INDEX");
    Test.run();
    let galaxy = new SolarSystem();
    let canvas = document.querySelector('#gravityFrame');

    // canvas size must be set explicitly
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    let ctx = canvas.getContext('2d');
        paint(ctx, canvas.width, canvas.height, galaxy);
}

// Graphics g
function paint(ctx, width, height, galaxy)
{
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle='black';
    galaxy.step(ctx);
    // only draw when focused
    requestAnimationFrame(()=> {
        // wait more
        setTimeout(()=> {
            paint(ctx, width, height, galaxy);
        },100);
    });

}