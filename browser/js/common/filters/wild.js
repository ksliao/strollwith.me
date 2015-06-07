app.filter('wild', function(){
	return function(tours, search){
		return tours.filter(function(tour){
			return tour.name.indexOf(search) > -1;
		});
	}
});