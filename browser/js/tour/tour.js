'use strict'
app.config(function($stateProvider){
	$stateProvider.state('tour', {
		url : '/tour/:id',
		templateUrl : 'js/tour/tour.html',
		controller: 'TourCtrl',
		resolve : {
			tourData : function($stateParams, $state, TourFactory){
				return TourFactory.findTour($stateParams.id).catch(function(){
					$state.go('home');
				});
			}
		}
	});
});

app.controller('TourCtrl', function($scope, tourData){
	$scope.tourData = tourData;
});

app.factory('TourFactory', function($http){
	return {
		createTour : function(data){
			return $http.post('/tours', data).then(function(response){
				return response.data;
			});
		},
		findTour : function(id){
			return $http.get('/tours/' + id).then(function(response){
				return response.data;
			});
		},
		updateTour : function(id, data){
			return $http.put('/tours/' + id, data).then(function(response){
				return response.data;
			});
		},
		deleteTour : function(id){
			return $http.delete('/tours/'+ id).then(function(response){
				return response.data;
			});
		},
		findAllTours : function(){
			return $http.get('/tours').then(function(response){

			});
		}
	}
});