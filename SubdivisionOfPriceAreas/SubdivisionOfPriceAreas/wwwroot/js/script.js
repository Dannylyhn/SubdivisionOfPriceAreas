var map = L.map('map').setView([51.505, -0.09], 3);

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

var geojsonLayer = new L.GeoJSON.AJAX("../json/geojson.json");
geojsonLayer.addTo(map);

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


