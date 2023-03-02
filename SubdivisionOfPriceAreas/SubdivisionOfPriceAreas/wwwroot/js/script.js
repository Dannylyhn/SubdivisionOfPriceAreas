var map = L.map('map').setView([51.505, -0.09], 3);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
 
var geojsonLayer = new L.GeoJSON.AJAX("../json/geojson.json", {
    onEachFeature: onEachFeature
    });
var geoJsonLayerReplacement = new L.GeoJSON.AJAX("../json/newMap.json");

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        console.log(e);
        layer.setStyle({fillColor: "blue"})
    });
}

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

    geojsonLayerGroup.addLayer(geoJsonLayerReplacement);
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

    //Log GIS coordinates from drawn objects
    console.log("A drawing has been created:")
    console.log(JSON.stringify(layer.toGeoJSON()));
});






