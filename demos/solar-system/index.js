
function main() {
    console.log("INDEX");
    Test.run();
    let galaxy = new SolarSystem();
    let canvas = document.querySelector('#gravityFrame');

    // canvas size must be set explicitly
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    let ctx = canvas.getContext('2d');
    let wipeCheckbox = document.querySelector('#wipeCheckbox');

    let state = {
        width: canvas.width,
        height: canvas.height,
        wipe: wipeCheckbox.checked
    };

    wipeCheckbox.addEventListener('change', () => {
        state.wipe = wipeCheckbox.checked;
    });

    paint(ctx, state, galaxy);
}

// Graphics g
function paint(ctx, state, galaxy)
{
    if (state.wipe) {
        ctx.clearRect(0, 0, state.width, state.height);
    }
    ctx.fillStyle='black';
    galaxy.step(ctx);

    requestAnimationFrame(()=> {
        paint(ctx, state, galaxy);
    });

}