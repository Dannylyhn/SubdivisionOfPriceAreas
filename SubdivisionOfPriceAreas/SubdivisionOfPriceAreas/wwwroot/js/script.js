﻿var map = L.map('map').setView([51.505, -0.09], 3);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

//geoJSON feature to add to map with ajax. This can be done better using other scripts/plugin.
//var geojsonfeature = "../json/geojson.json";
//var jsonlayer = new l.geojson().addto(map);

//$.ajax({
//    datatype: "json",
//    url: geojsonfeature,
//    success: function (data) {
//        $(data.features).each(function (key, data) {
//            jsonlayer.adddata(data);
//        });
//    }
//});

//GeoJSON feature objects. Get them from geojson files that we get with ajax
var geojsonLayer = new L.GeoJSON.AJAX("../json/geojson.json");
/*geojsonLayer.addTo(map);*/
var geoJsonLayerReplacement = new L.GeoJSON.AJAX("../json/newMap.json");

//layer group to add to map
var geojsonLayerGroup = new L.LayerGroup();
geojsonLayerGroup.addTo(map);
geojsonLayerGroup.addLayer(geojsonLayer);



//Button to change map
var buttonAddArea = document.getElementById("addArea");
buttonAddArea.addEventListener("click", changeMap);

function changeMap() {
    //remove all layers
    geojsonLayerGroup.eachLayer(function (layer) {
        geojsonLayerGroup.removeLayer(layer);
    });

    //Add new layer
    geojsonLayerGroup.addLayer(geoJsonLayerReplacement);

    let i = 0;
    geojsonLayerGroup.eachLayer(function () { i += 1; });
    console.log('Map has', i, 'layers.');

    //map.eachLayer(function (layer) {
    //    map.removeLayer(layer);
    //});
    //geoJsonLayerReplacement.addTo(map);
}

//Options for editing via drawing
var options = {
    position: 'topright',
    draw: {
        polyline: true,
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons 
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects 
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect 
            }
        },
        circle: true, // Turns off this drawing tool 
        rectangle: true,
        marker: true
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!! 
        remove: true
    }
};

var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    editableLayers.addLayer(layer);
    console.log("A drawing has been created:")
    console.log(JSON.stringify(layer.toGeoJSON()));
});


