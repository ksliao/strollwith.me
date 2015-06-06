app.directive('gmap', function(){
	return {
		restrict :'E',
		replace: true,
		require: 'ngModel',
		templateUrl: 'js/common/directives/gmap/gmap.html',
		link: function(scope, element, attribute){
			
			function openInfo(infowindow, map, marker){
				return function(){
					infowindow.open(map, marker);
				}
			}

			function closeInfo(infowindow, map, marker){
				return function(){
					infowindow.close();
				}
			}

			function openDetails(marker){
				return function(){
					var markerPosition = marker.getPosition();
					var markerCoords = {};
					markerCoords.latitude = Math.round(markerPosition.A*1000000)/1000000;
					markerCoords.longitude = Math.round(markerPosition.F*1000000)/1000000;
					scope.$emit('slideShow', markerCoords);
				}
			}

			function initialize() {
		        var mapOptions = {
				    zoom: 3,
				    center: new google.maps.LatLng(60, -90),
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				  };

				  var map = new google.maps.Map(document.getElementById('map-canvas'),
				      mapOptions);

				  var tourCoordinates = scope.plan.map(function(el){
				  	return new google.maps.LatLng(el.latitude, el.longitude);
				  });

				  var tourPath = new google.maps.Polyline({
				    path: tourCoordinates,
				    geodesic: true,
				    strokeColor: '#FF0000',
				    strokeOpacity: 1.0,
				    strokeWeight: 2
				  });

				  tourCoordinates.forEach(function(el, index){

				  	var marker = new google.maps.Marker({
					    position: el,
					    animation: google.maps.Animation.DROP,
					    clickable: true,
					    title:"Point " + index
					});

					var infowindow = new google.maps.InfoWindow({
						content: '<p>' + marker.title + '</p>'
					});

					google.maps.event.addListener(marker, 'click', openDetails(marker));
					google.maps.event.addListener(marker, 'mouseover', openInfo(infowindow, map, marker));
					google.maps.event.addListener(marker, 'mouseout', closeInfo(infowindow, map, marker));

				  	marker.setMap(map);
				  });

				  tourPath.setMap(map);
		      }
		      initialize();
		}
	}
});