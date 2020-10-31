import { updateAddress } from './form-util'

var platform = new H.service.Platform({
  'apikey': 'FI15I8h00HELPME22OAEGILiQ-WRd-YjNLkAr6xC4Zo'
});

var service = platform.getSearchService();


/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  // Resulting point.
  return {'lat': y+y0, 'lng': xp+x0};
}

export function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
 var geoPoint = generateRandomPoint({'lat':position.coords.latitude, 'lng':position.coords.longitude}, 500);
  service.reverseGeocode({
  at: geoPoint.lat+','+geoPoint.lng
}, (result) => {
    logPosition(result.items[0]);
}, alert);
  
}

function logPosition(returnArray) {
  updateAddress(returnArray)
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      result = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      result = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      result = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      result = "An unknown error occurred."
      break;
  }
  
  alert(result);
}

