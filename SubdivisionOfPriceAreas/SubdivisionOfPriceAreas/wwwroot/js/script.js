var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var geojsonFeature = "json\geojson.json";

$.ajax({
    dataType: "json",
    url: geojsonFeature,
    success: function (data) {
        $(data.features).each(function (key, data) {
            jsonLayer.addData(data);
        });
    }
});

var jsonLayer = new L.geoJson().addTo(map);

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
});


