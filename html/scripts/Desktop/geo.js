 	
   function success(position) {
    var s = document.querySelector('#status');
    if (s.className == 'success') {
    return;
    }
    s.innerHTML ;
    s.className = 'success';
    var mapcanvas = document.createElement('div');
    mapcanvas.id = 'mapcanvas';
    mapcanvas.style.height = '135px';
    mapcanvas.style.width = '135px';
    document.querySelector('article').appendChild(mapcanvas);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
    zoom: 13,
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
    }
    function error(msg) {
    var s = document.querySelector('#status');
    s.innerHTML = typeof msg == 'string' ? msg : "geolocation failed";
    s.className = 'fail';
    alert('geolocation failed');
    // console.log(arguments);
    }
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    } else {
    error('not supported');
    }
 
 