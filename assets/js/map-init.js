// Initialize map
function initMap() {
    
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
    };    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Custom Map Marker Path
    var iconPath = 'assets/img/icons/'
    
    // Check which city's markers should be displayed
    var selected = $('#cities').find('input:checked').val();

    var markers;

    // If Vancouver
    if (selected == 'vancouver') {
        markers = [
            ['UBC Main Mall', 49.266882, -123.254520, iconPath + 'dynamics.svg'],
            ['UBC Pacific Spirit', 49.274870, -123.252972, iconPath + 'water.svg'],
            ['SE False Creek', 49.273271, -123.102418, iconPath + 'earthquakes.svg'],
            ['Stanley Park', 49.298072, -123.135838, iconPath + 'land.svg']
        ];
    } else {
        markers = [
            ['Cultural District', 49.888039, -119.497512, iconPath + 'water.svg'],
            ['Knox Mountain Park', 49.905295, -119.490656, iconPath + 'fire.svg'],
            ['Mission Creek Park', 49.877524, -119.431510, iconPath + 'land.svg'],
            ['UBC Okanagan', 49.940462, -119.399210, iconPath + 'dynamics.svg']
        ]
    }
                        
    // Info for Vancouver Locations
    var yvrWindowContent = [
        ['<div class="info-content">' + '<h3>GROUP SURVIVAL</h3>' + '<p><strong>At UBC/Main Mall</strong>: Discover and overcome your many, many cognitive biases in order to work well with other humans.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>FINDING WATER</h3>' + '<p><strong>At UBC/Pacific Spirit Park</strong>: Hunt for a fabled water reservoir and learn to find and filter wild water.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>EARTHQUAKE PREP</h3>' + '<p><strong>Around SE False Creek</strong>: Conquer your fears of a quaking earth.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>LIVING OFF THE LAND</h3>' + '<p><strong>At Stanley Park</strong>: Search the park for a place to house, feed, and water your group of survivors.</p>' + '</div>']
    ];

    // Info for Kelowna Locations
    var ylwWindowContent = [
        ['<div class="info-content">' + '<h3>FINDING WATER</h3>' + '<p><strong>In the Downtown/Cultural District:</strong> Learn to find and filter water in an urban area.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>WILDFIRES</h3>' + '<p><strong>At Knox Mountain Park:</strong> Conquer your fears of a scorched earth.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>LIVING OFF THE LAND</h3>' + '<p><strong>At Mission Creek Park:</strong> Search the park for a place to house, feed, and water your group of survivors.</p>' + '</div>'],
        ['<div class="info-content">' + '<h3>GROUP SURVIVAL</h3>' + '<p><strong>At UBC Okanagan:</strong> Discover and overcome your many, many cognitive biases in order to work well with other humans.</p>' + '</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            icon: markers[i][3],
            optimized: false
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                // Check to get proper info window content
                if (selected == 'vancouver') {
                    infoWindow.setContent(yvrWindowContent[i][0]);
                } else {
                    infoWindow.setContent(ylwWindowContent[i][0]);
                }
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Re-center the map on window resize
    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds);
    });

}