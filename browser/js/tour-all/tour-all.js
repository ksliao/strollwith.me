app.config(function($stateProvider){
	$stateProvider.state('tours', {
		url: '/tours',
		templateUrl: 'js/tour-all/tour-all.html',
		controller: 'ToursAllController',
		resolve : {
			toursData : function(TourFactory, $state){
				return TourFactory.findAllTours().catch(function(err){
					$state.go('home');
				});
			}
		}
	})
});

app.controller('ToursAllController', function($scope, toursData){
	$scope.tours = toursData;
});