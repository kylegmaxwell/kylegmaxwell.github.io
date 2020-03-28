// Used for finite difference to compute curl noise
export function differenceFraction() {
    return 0.1;
}

// Ratio of noise frequency to curl noise delta
export function noiseFrequency() {
    return 0.08;
}

// Multiplier on advection speed
export function advectionScale() {
    return 2.0;
}

// Multiplier on rendered intensity of pixels
export function renderScale() {
    return 0.3;
}

// Rate of noise evolution
export function noiseSpeed() {
    return 0.1;
}

export function diffusionScale() {
    return 0.0005;
}