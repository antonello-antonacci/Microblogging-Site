
function setText(val, e) {
    alert( document.getElementById(e).value = val);
}

function insertText(val, e) {
    document.getElementById(e).value += val;
}

var nav = null; 

function requestPosition() {
  if (nav == null) {
      nav = window.navigator;
  }
  if (nav != null) {
      var geoloc = nav.geolocation;
      if (geoloc != null) {
          geoloc.getCurrentPosition(successCallback);
      }
      else {
          alert("geolocation not supported");
      }
  }
  else {
      alert("Navigator not found");
  }
}


function successCallback(position)
{
    
    var s = document.querySelector('#status');
    if (s.className == 'success') {
        return;
    }   
    s.innerHTML ;
    s.className = 'success';
    var mapcanvas = document.createElement('div');
    mapcanvas.id = 'mapcanvas';
    mapcanvas.style.height = '300px';
    mapcanvas.style.width = '205px';
    document.querySelector('article').appendChild(mapcanvas);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
    });
    
//   setText(position.coords.latitude, "latitude");
//   setText(position.coords.longitude, "longitude");
   
}

