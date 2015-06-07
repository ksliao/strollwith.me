app.config(function($stateProvider){
	$stateProvider.state('tours', {
		url: '/tours',
		templateUrl: 'js/tour-all/tour-all.html',
		controller: 'ToursAllController'
	})
});

app.controller('ToursAllController', function($scope){
	
});