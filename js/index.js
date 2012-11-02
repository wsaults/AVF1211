// AVF Project
// Name: William Saults
// Term: 1211

// Wait until the DOM is ready
$(document).ready(function() {
});

// Device
document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
	console.log("Device ready");
	alert('Name: ' + device.name + '\n'
		+ 'Cordova: '  + device.cordova + '\n'
		+ 'Platform: ' + device.platform + '\n'
		+ 'Version: '  + device.version
	);
	
    checkConnection();
}

/* Generic Error Alert */
function onError(message) {
  alert('Error: ' + message);
}

/* Compass Error Alert */
function onCompassError(error) {
  alert('Compass error code: ' + error.code);
}

/* Connection */
function checkConnection() {
    var networkStatus = navigator.network.connection.type;
    var status = {};
    status[Connection.UNKNOWN]  = 'Unknown';
    status[Connection.ETHERNET] = 'Ethernet';
    status[Connection.WIFI]     = 'WiFi';
    status[Connection.CELL_2G]  = 'Cell 2G';
    status[Connection.CELL_3G]  = 'Cell 3G';
    status[Connection.CELL_4G]  = 'Cell 4G';
    status[Connection.NONE]     = 'No network connection';

    alert('Connection: ' + status[networkStatus]);
}

/* Camera */
function takePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onCameraSuccess, onError, { 
  	quality: 75, 
  	destinationType: Camera.DestinationType.DATA_URL,
  	sourceType : Camera.PictureSourceType.CAMERA,
  	encodingType: Camera.EncodingType.JPEG 
  });
}

function onCameraSuccess(imageData) {
	alert('imageData success ');
}

/* Compass */
// The compass id references the current 'watchHeading'
var compassID = null;

function startCompass() {
    // Update compass every 3 seconds
    var options = { frequency: 3000 };

    compassID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
}

function stopCompass() {
    if (compassID) {
        navigator.compass.clearWatch(compassID);
        compassID = null;
    }
}


function onCompassSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);
    stopCompass();
}

/* Contacts */
// Contact search criteria
function searchContacts() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	var fields = ["displayName"];
	
	navigator.contacts.find(fields, onContactSuccess, onError, options);
}

function onContactSuccess(contacts) {
    alert('Yay found ' + contacts.length + ' contacts!');
};

/* Geolocation */
function startGeo() {
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
}

function onGeoSuccess(position) {
    alert('Lat: ' + position.coords.latitude + '\n' +
        'Lon: ' + position.coords.longitude + '\n' +
        'Alt: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Alt Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n'
    );
}


/* Accelerometer */
function startAccelerometer() {
	navigator.accelerometer.getCurrentAcceleration(onAccelerometerSuccess, onError);
}

function onAccelerometerSuccess(acceleration) {
    alert('X: ' + acceleration.x + '\n' +
        'Y: ' + acceleration.y + '\n' +
        'Z: ' + acceleration.z + '\n' +
        'Timestamp: ' + acceleration.timestamp + '\n'
    );
}

/* Video */
function toggleMobileVideo() {
	if (!$('#research_mobile').hasClass("hidden")) {
		toggleMobileResearch();
	}
	$('#video_mobile').toggleClass("hidden");
}

function toggleMobileResearch() {
	if (!$('#video_mobile').hasClass("hidden")) {
		toggleMobileVideo();
	}
	$('#research_mobile').toggleClass("hidden");
}