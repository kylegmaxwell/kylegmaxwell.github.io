// Used for finite difference to compute curl noise
export function differenceFraction() {
    return 0.1;
}

// Ratio of noise frequency to curl noise delta
export function noiseFrequency() {
    return 0.02;
}

// Multiplier on advection speed
export function advectionScale() {
    return 2.0;
}
