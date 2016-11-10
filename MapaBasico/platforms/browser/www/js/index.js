document.addEventListener('deviceready', this.onDeviceReady, false);

function onDeviceReady() {
    var map;

    require([
        "esri/map",
        "dojo/domReady!"
    ], function(
        Map
    ) {
        map = new Map("map", {
            basemap: "topo",
            center: [-74.05460907017716, 4.68670403797122], // longitude, latitude
            zoom: 16
        });
    });
}