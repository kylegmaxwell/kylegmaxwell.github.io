// Cesium async updates its transforms, so we have to us this to do something once after it is ready.
var setupOnce = false;

function dateFromSatrec(satrec) {
    const j2000offset = 2000;
    var date = new Date(j2000offset + satrec.epochyr, 0); // initialize a date in `year-01-01`
    const dayNumber = Math.floor(satrec.epochdays);
    date.setMonth(0, dayNumber); // add the number of days
    const dayFraction = satrec.epochdays - dayNumber;
    const secondsInADay = 60 * 60 * 24;
    date.setSeconds(dayFraction * secondsInADay)
    return date;
}

function pointPositionAtTime(satrec, inertialToFixed, deltaMinutes) {
    //  Propagate satellite using time since epoch (in minutes).
    const timeSinceTleEpochMinutes = deltaMinutes;
    const positionAndVelocity = satellite.sgp4(satrec, timeSinceTleEpochMinutes);

    // The position_velocity result is a key-value pair of Inertial coordinates.
    // These are the base results from which all other coordinates are derived.
    const positionInInertial = positionAndVelocity.position;
    const pointInInertial = new Cesium.Cartesian3(positionInInertial.x, positionInInertial.y, positionInInertial.z);
    const meterPerKilometer = 1000;
    Cesium.Cartesian3.multiplyByScalar(pointInInertial, meterPerKilometer, pointInInertial);

    // Transform a point from the ICRF (inertial) axes to the Fixed axes.
    var pointInFixed = new Cesium.Cartesian3();
    pointInFixed = Cesium.Matrix3.multiplyByVector(inertialToFixed, pointInInertial, pointInFixed);
    return pointInFixed;
}

// Create the geometry to draw over the earth.
// Makes a point and curve for a satellite path.
function setupEntities(viewer, satrec, inertialToFixed, epochJulian) {
    viewer.clockViewModel.startTime = epochJulian;
    viewer.clockViewModel.endTime = epochJulian.clone();
    viewer.clockViewModel.endTime.secondsOfDay += 90 * 60;
    viewer.clockViewModel.multiplier = 60;
    viewer.timeline.zoomTo(viewer.clockViewModel.startTime, viewer.clockViewModel.endTime);
    const points = [];
    for (let minute = 0; minute < 90; minute++) {
        const pointInFixed = pointPositionAtTime(satrec, inertialToFixed, minute);
        points.push(pointInFixed);
    }

    // Visualize the path the satellite will take according to TLE
    const pathEntity = new Cesium.Entity({
        id: satrec.satnum + "-path",
        polyline: {
            positions: points,
            width: 3,
            material: Cesium.Color.BROWN
        },
    });

    const pointEntity = createPointEntity(satrec, points[0]);

    viewer.entities.add(pathEntity);
    viewer.entities.add(pointEntity);
    viewer.clock.currentTime = epochJulian;
    viewer.selectedEntity = pointEntity;
    return pointEntity;
}

function createPointEntity(satrec, position) {
    // Visualize the position at the beginning of the TLE
    const pointEntity = new Cesium.Entity({
        id: satrec.satnum,
        position: position,
        point: {
            pixelSize: 8,
            color: Cesium.Color.RED
        },
    });
    return pointEntity;
}

// Update position in response to time change
function updateEntities(satrec, inertialToFixed, epochJulian, time, pointEntity) {
    const minutesElapsed = Cesium.JulianDate.secondsDifference(time, epochJulian) / 60;
    const timeInput = document.querySelector('#elapsedTimeInput');
    timeInput.value = minutesElapsed;

    const pointInFixed = pointPositionAtTime(satrec, inertialToFixed, minutesElapsed);
    pointEntity.position.setValue(pointInFixed);
    return pointEntity;

}

export default class Orbit {
    point = null;
    constructor(tle) {

        const viewer = new Cesium.Viewer('cesiumContainer', {
            // Don't use this since it triggers Cesium ion warning about data provider.
            geocoder: false,

            //Hide the base layer picker
            baseLayerPicker: false,

            // Use OpenStreetMaps
            imageryProvider: new Cesium.OpenStreetMapImageryProvider({
                url: 'https://a.tile.openstreetmap.org/'
            }),

            skyAtmosphere: false

        });
        // Initialize a satellite record
        var satrec = satellite.twoline2satrec(tle[0], tle[1]);

        viewer.scene.postUpdate.addEventListener((_scene, time) => {
            // View in ICRF (Inertial).
            const epochDate = dateFromSatrec(satrec);
            const epochJulian = Cesium.JulianDate.fromDate(epochDate);

            var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(epochJulian);
            if (Cesium.defined(icrfToFixed)) {
                if (!setupOnce) {
                    setupOnce = true;
                    this.point = setupEntities(viewer, satrec, icrfToFixed, epochJulian);
                }
                updateEntities(satrec, icrfToFixed, epochJulian, time, this.point);
            }
        });

    }
}