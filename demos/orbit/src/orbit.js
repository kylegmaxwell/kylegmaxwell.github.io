export default class Orbit {
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

    }
}