var futur_numa = {
  mexico : {
    center: {lat: 23.634501 , lng: -102.552784},
    population: 8405837
  },
  asie : {
    center: {lat: 14.058324,  lng: 108.277199},
    population: 8405837
  }
};


var present_numa = {
  moscou : { 
    start : {lat: 45.128649, lng: 30.222656},
    end : {lat:58.170702 , lng : 70.560547}
  },
  paris : {
    start : {lat: 41.834527, lng:-6.031250},
    end : {lat:54.289339, lng : 12.601563}
  },
   casablanca : {
    start : {lat: 30.026706, lng:-14.633789},
    end : {lat:38.603719, lng : -2.900391}
  },
    bengalore : {
    start : {lat: 6.098670,  lng:68.576172},
    end : {lat:23.136576, lng : 88.661133}
  }

 
};



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
    zoom: 2,
    center: {lat: 48.856614, lng: 2.352222},
     zoomControl: false,
     streetViewControl: false,
     mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

for (var numa in futur_numa) {
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: '#01B0F0',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#01B0F0',
      fillOpacity: 0.35,
      map: map,
      center: futur_numa[numa].center,
      radius: Math.sqrt(futur_numa[numa].population) * 700
    });
  }


for (var numa in present_numa) {
  var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(present_numa[numa].start), new google.maps.LatLng( present_numa[numa].end));
   numa_logo = new google.maps.GroundOverlay(
      '/svg/numa_animated_low.svg',
      imageBounds);
   numa_logo.setMap(map);
}



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