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
    return 10.0;
}

// Multiplier on rendered intensity of pixels
export function renderScale() {
    return 0.3;
}

// Rate of noise evolution
export function noiseSpeed() {
    return 0.1;
}

export function noiseMagnitude() {
    return 2.0;
}

export function diffusionScale() {
    return 0.0001;
}

export function gaussSeidelIterations() {
    return 20;
}

export function userAddDensityScale() {
    return 0.1;
}

export function userAddVelocityScale() {
    return 0.5;
}

export function noiseModeColorDamping() {
    return 0.95;
}
export function advectModeColorDamping() {
    return 0.98;
}
