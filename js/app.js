var futur_numa = {
  mexico : {
    center: {lat: 23.634501 , lng: -102.552784},
    radius : 900000
  },
  asie : {
    center: {lat: 14.058324,  lng: 108.277199},
    radius : 900000
  }
};


var present_numa = {
  moscou : { 
    center : {lat: 55.755826, lng: 37.617300},
    size : 2
  },
  paris : {
    center  : {lat: 48.856614, lng:2.352222},
    size : 4
  },
   casablanca : {
    center : {lat: 33.573110, lng: -7.589843},
    size : 2
  },
    bengalore : {
    center : {lat: 12.971599,  lng: 77.594563},
     size : 3
  }

 
};

var markers = [];



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
      radius: futur_numa[numa].radius * 2
    });
  }

for (var numa in present_numa) {
  centerCity = new google.maps.LatLng(present_numa[numa].center);
  circle = new google.maps.Circle({radius: 900000 * present_numa[numa].size, center: centerCity});
  bounds = circle.getBounds();
  var imageBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
//  var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(present_numa[numa].start), new google.maps.LatLng( present_numa[numa].end));
   numa_logo= new google.maps.GroundOverlay(
      '/svg/numa_respire_2.svg',
      imageBounds);
   markers[numa] = numa_logo;
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
      console.log(markers);
      logo = markers['paris'];

      //console.log(cpt);
      if (cpt) {
            logo.set('url','/svg/NUMA_respire_2.svg');
      }else {
          logo.set('url','/svg/NUMA_respire_5.svg');
      }
      logo.setMap(map);
});