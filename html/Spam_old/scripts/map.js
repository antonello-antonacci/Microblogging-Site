var initialLocation;

//function showMap()
//{
//    
//    var latlng = new google.maps.LatLng(44.112909 , 9.835415); //centra la mappa in un punto preciso
//    var myOptions = {
//    zoom: 11,
//    center: latlng,
//    mapTypeId: google.maps.MapTypeId.HYBRID  //imposta la mappa come ibrida.
//    };
//    var map = new google.maps.Map(document.getElementById("map"), myOptions);
//}
    
//    var myOptions = {
//    zoom: 6,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//    var map = new google.maps.Map(document.getElementById("map"), myOptions);
//        
//    // Try W3C Geolocation (Preferred)
//    if(navigator.geolocation) {
//        browserSupportFlag = true;
//        navigator.geolocation.getCurrentPosition(function(position) {
//                                                 initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//                                                 map.setCenter(initialLocation);
//                                                 }, function() {
//                                                 handleNoGeolocation(browserSupportFlag);
//                                                 });
//
//        // Try Google Gears Geolocation
//    } else if (google.gears) {
//        browserSupportFlag = true;
//        var geo = google.gears.factory.create('beta.geolocation');
//        geo.getCurrentPosition(function(position) {
//                               initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
//                               map.setCenter(initialLocation);
//                               }, function() {
//                               handleNoGeoLocation(browserSupportFlag);
//                               });
//        // Browser doesn't support Geolocation
//    } else {
//        browserSupportFlag = false;
//        handleNoGeolocation(browserSupportFlag);
//    }
//    
//    function handleNoGeolocation(errorFlag) {
//
//    }
//}
