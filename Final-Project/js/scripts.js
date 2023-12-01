function getGPAPopupColor(gpa) {
    if (gpa >= 3.53 && gpa <= 3.60) {
        return '#6347ff'; // Purple
    } else if (gpa > 3.60 && gpa <= 3.65) {
        return '#5182e4'; // Blue
    } else if (gpa > 3.65 && gpa <= 3.70) {
        return '#4db8b4'; // Teal
    } else if (gpa > 3.70 && gpa <= 3.75) {
        return '#5ac995'; // Green
    } else if (gpa > 3.75 && gpa <= 3.80) {
        return '#a5d978'; // Lime
    } else if (gpa > 3.80 && gpa <= 3.85) {
        return '#ffe066'; // Yellow
    } else if (gpa > 3.85 && gpa <= 3.90) {
        return '#ff9f66'; // Orange
    } else if (gpa > 3.90 && gpa <= 3.95) {
        return '#ff6347'; // Red
    } else {
        return '#000000'; // Black (default for GPAs outside defined ranges)
    }
}







// Function to determine outline color based on LSAT
function getLSATOutlineColor(lsat) {
    if (lsat >= 154 && lsat <= 160) {
        return 'yellow';
    } else if (lsat > 160 && lsat <= 165) {
        return 'orange';
    } else if (lsat > 165 && lsat <= 170) {
        return 'red';
    } else if (lsat > 170 && lsat <= 180) {
        return 'black';
    }
}

// Function to update the map when moved
function updateMap(mapFrom, mapTo) {
    var center = mapFrom.getCenter();
    var zoom = mapFrom.getZoom();
    mapTo.setView(center, zoom, { animate: false });
}

// Map 2010
var map2010 = L.map('map2010').setView([39.8283, -98.5795], 4);
map2010.addControl(new L.Control.Fullscreen());
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2010);

// Fetch GeoJSON data for 2010
fetch('/data/ABAdata.geojson')
    .then(response => response.json())
    .then(data => {
        // Create CircleMarkers layer and add it to the map
        var circleMarkers2010 = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                var gpa = feature.properties["2010GPA"];
                var lsat = feature.properties["2010LSAT"];
        
                var popupContent = "Name: " + feature.properties["Name"] + "<br>2010GPA: " + gpa + "<br>2010LSAT: " + lsat;
        
                var circleMarker = L.circleMarker(latlng, {
                    fillColor: getGPAPopupColor(gpa),
                    color: lsat !== undefined ? getLSATOutlineColor(lsat) : 'black',  // Check for undefined LSAT
                    weight: 2,  // Adjust weight here
                    fillOpacity: 0.8
                }).bindPopup(popupContent);
        
                return circleMarker;
            }
        }).addTo(map2010);
    });


    map2010.on('moveend', function () {
        updateMap(map2010, map2022);
    });
    
  
// Map 2022
var map2022 = L.map('map2022').setView([39.8283, -98.5795], 4);
map2022.addControl(new L.Control.Fullscreen());
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2022);

// Fetch GeoJSON data for 2022
fetch('/data/test.geojson')
    .then(response => response.json())
    .then(data => {
        // Create CircleMarkers layer and add it to the map
        var circleMarkers2022 = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                var gpa = feature.properties["2022GPA"];
                var lsat = feature.properties["2022LSAT"];
        
                var popupContent = "Name: " + feature.properties["Name"] + "<br>2022GPA: " + gpa + "<br>2022LSAT: " + lsat;
        
                var circleMarker = L.circleMarker(latlng, {
                    fillColor: getGPAPopupColor(gpa),
                    color: lsat !== undefined ? getLSATOutlineColor(lsat) : 'black',  // Check for undefined LSAT
                    weight: 2,  // Adjust weight here
                    fillOpacity: 0.8
                }).bindPopup(popupContent);
        
                return circleMarker;
            }
        }).addTo(map2022);
    });

