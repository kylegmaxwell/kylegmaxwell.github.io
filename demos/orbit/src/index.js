'use strict';

import Orbit from './orbit.js'
import * as constants from './constants.js'

var orbitInstance = null;

// Set up initial hook to start scripts after page loads
document.addEventListener("DOMContentLoaded", handleLoad);

/**
 * Main function that runs onLoad for the page
 */
function handleLoad() {
    orbitInstance = new Orbit(constants.tle());
}
