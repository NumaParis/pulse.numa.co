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

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 43.674, lng: 58.4746922},  
     zoomControl: false,
     streetViewControl: false,
     mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

jQuery.ajaxSetup({async:false});

$.get('NUMA_logo.svg', function(data) {
   template = data;
  
},'text');
svg = template.replace('{{ color }}', 'M 0,0 H 58.647 V 175.944 L 0,146.62 Z');

marker = new google.maps.Marker({
    position:  {lat: 48.858093, lng: 2.294694},
    map: map,
    draggable: false,
    icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) }
});

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
      console.log(cpt);
      if (cpt)
           svg = template.replace('{{ color }}', 'M 0,0 H 58.647 V 175.944 L 0,146.62 Z');
      else 
          svg = template.replace('{{ color }}', 'M 0,0 H 58.647 V 145.944 L 0,116.62 Z');

      icon = { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) }
      marker.setIcon(icon);
      
});