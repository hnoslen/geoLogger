var curr = document.getElementById("current");
var y = document.getElementById("result");
var map = document.getElementById("mapholder");
var logLen = document.getElementById("logLength");

if(typeof(Storage) !== "undefined") {
        if (sessionStorage.geoLocs) {
            sessionStorage.geoLocs = '[]';
        } else {
            sessionStorage.geoLocs = '[]';
        }
} else {
        y.innerHTML = "Sorry, your browser does not support web storage...";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        curr.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    curr.innerHTML = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;
    map.innerHTML = "<img src='"+putMap(position)+"'>";

    console.log(sessionStorage.geoLocs);
    var locsList = JSON.parse(sessionStorage.geoLocs);
    locsList.push(geo2str(position));
    sessionStorage.geoLocs = JSON.stringify(locsList);

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            curr.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            curr.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            curr.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            curr.innerHTML = "An unknown error occurred."
            break;
    }
}

function putMap(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    return "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
}

function readLog() {
    var locsList = JSON.parse(sessionStorage.geoLocs);
    logLen.innerHTML = locsList.length;
    var out = "";
    var index;
    for (index = 0; index < locsList.length; ++index) {
        var loc = JSON.parse(locsList[index])
        out = out + "Time: "+loc[0]+"<br>Latitude: " + loc[1] +"<br>Longitude: " + loc[2]+"<br>Accuracy: " + loc[3]+"<br><br>";
    }
    y.innerHTML = "Logged Locations:<br>"+out;
}

function geo2str(position){
    return JSON.stringify([position.timestamp, position.coords.latitude, position.coords.longitude, position.coords.accuracy]);
}
