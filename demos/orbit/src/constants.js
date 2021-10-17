// Used for finite difference to compute curl noise
export function spaceObjectNumber() {
    return 25544;
}

// Satellite orbit data
// https://www.n2yo.com/satellite/?s=25544
export function tle() {
    return `1 25544U 98067A   21290.19853984  .00007084  00000-0  13794-3 0  9997
2 25544  51.6433  99.4296 0004200 119.2585  52.9185 15.48722168307509`;
}
