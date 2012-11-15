// AVF Project
// Name: William Saults
// Term: 1211

var subject = "ios";
var lat = 0;
var long = 0;
var imageArray = new Array();
	
// Wait until the DOM is ready
$(document).ready(function() {
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		subject = "iOS";
	} else if (/Android/i.test(navigator.userAgent)) {
		subject = "Android";
	}

	if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		startGeo();
	} else {
		lat = 27.781157;
		long = -122.398720;
		freebaseRequest("https://www.googleapis.com/freebase/v1/search?query=heroes&start=10&limit=20&indent=true");
		twitterRequest("http://search.twitter.com/search.json?q="+subject+"&rpp=20&include_entities=true&result_type=recent&geocode="+lat+","+long+",1000mi");
	}
});

// Device
document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {	
    checkConnection();
    
    setInterval(function(){ navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onError); }, 500);
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
    
    if (status[networkStatus] != "Unknown") {
    	freebaseRequest("https://www.googleapis.com/freebase/v1/search?query=heroes&start=10&limit=20&indent=true");
		twitterRequest("http://search.twitter.com/search.json?q="+subject+"&rpp=20&include_entities=true&result_type=recent&geocode="+lat+","+long+",1000mi");
    } else {
    	alert("Connection status Unknown.")
    }
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


/* Accelerometer */
function onAccelerationSuccess(acceleration) {
    console.log('Acceleration Y: ' + acceleration.y);
    
    var left = 0;
    if(acceleration.x > 0) {
    	// left side
	    if (acceleration.y > 0) {
	    	if	(acceleration.y > 9) {
	    		acceleration.y = 9;
	    	}
	    	acceleration.y = acceleration.y/2;
	    	left = acceleration.y * 10;
	    } else {
	    	acceleration.y = 9;
	    }
    } else {
    	// right side
    	if (acceleration.y > 0) {
    		
    		acceleration.y = numSwap(acceleration.y);
    		
	    	acceleration.y = acceleration.y/2;
	    	left = acceleration.y * 10;
	    } else {
	 		acceleration.y = 9;
	    }
    }
    
    $('#twitterFeed ul li img').css({
	  left: left + '%'
	});
}

function numSwap(x) {
	switch(Math.floor(x))
		{
		case 0:
		case 1:
		  	x = 16;
		  break;
		case 2:
		  	x = 15;
		  break;
		case 3:
		  	x = 14;
		  break;
		case 4:
		  	x = 13;
		  break;
		case 5:
		  	x = 12;
		  break;
		case 6:
		  	x = 11;
		  break;
		case 7:
		  	x = 10;
		  break;
		case 8:
		  	x = 9;
		  break;
		case 9:
		  	x = 9;
		  break;
		default:
		  
		}
	return x;
}

/* Geolocation */
function startGeo() {
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
}

function onGeoSuccess(position) {   
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

/* Research */
function toggleMobileResearch() {
	if (!$('#video_mobile').hasClass("hidden")) {
		toggleMobileVideo();
	}
	$('#research_mobile').toggleClass("hidden");
}

/* Twitter Restful Service */
function twitterRequest(url) {
	$.ajax({
		url: url,
		dataType: 'jsonp',
		success: function(data){
		console.log(data);
		
		$.each(data, function(key, val) {
			if	(key === "results") {
				$.each(val, function(k, v) {
					var li = $('<li>');
					var p = $('<p>');
					var h4 = $('<h4>');
					li.append(h4);
					h4.text(v.from_user_name + ":");
					li.append(p);
					if(v.profile_image_url.length < 120) {
						li.append($('<img>', { 
						    src : v.profile_image_url, 
						    width : 50, 
						    height : 50, 
						    alt : "Profile Pic", 
						    title : "Profile Pic",
						    onClick : "test("+k+")"
						}));
						
						imageArray.push(v.profile_image_url);
					}
					p.text(v.text);
					$('#twitterFeed ul').append(li);
				});
			}
		});
		
      },
      error: function(){console.log("Error.")}
	});
}

/* Freebase Restful Service */
function freebaseRequest(url) {
	$.ajax({
		url: url,
		dataType: 'jsonp',
		success: function(data){
		$.each(data, function(key, val) {
			if	(key === "result") {
				$.each(val, function(k, v) {
					var li = $('<li>');
					var p = $('<p>');
					var h4 = $('<h4>');
					li.append(h4);
					h4.text(v.name + ":");
					li.append(p);
					p.text(v.notable.name).append($('<br>'))
					.append("Score: " + v.score);
					$('#freebaseFeed ul').append(li);
				});
			}
		});

      },
      error: function(){console.log("Error.")}
	});
}

function test(index) {
	console.log(imageArray[index]);
    console.log("Test");
}
