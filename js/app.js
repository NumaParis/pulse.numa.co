function initMap() {
  var customMapType = new google.maps.StyledMapType([
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
      },
       {
        featureType: "administrative.country",
        elementType: "geometry.fill",
        stylers: [
            { visibility: "off" }
        ]
      },
         {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
            { visibility: "off" }
        ]
      },
  
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
     {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    
     {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#DAE1E3"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on",
            }
        ]
    },
    { featureType: "water", stylers: [
        { invert_lightness: true },
        { hue: "#ff003b" },
        { saturation: -100 },
        { lightness: 100 } /* generates "white" color */
    ] },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
   
], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';


map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 48.856614, lng: 2.352222},
     zoomControl: false,
     streetViewControl: false,
     mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

 var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(43.834527, -7.031250), 
  new google.maps.LatLng( 50.289339, 11.601563));

numa_logo = new google.maps.GroundOverlay(
      '/svg/numa_animated_low.svg',
      imageBounds);
numa_logo.setMap(map);

map.mapTypes.set(customMapTypeId, customMapType);
map.setMapTypeId(customMapTypeId);
}

var cpt = true;

 Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher('6ee4a54f8dffb3a573f4', {
      encrypted: true
    });
    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function(data) {
      cpt = !cpt;
      //console.log(cpt);
      if (cpt) {
            numa_logo.set('url','/svg/numa_animated_low.svg');
      }else {
          numa_logo.set('url','/svg/numa_animated.svg');
      }
       numa_logo.setMap(map);
});