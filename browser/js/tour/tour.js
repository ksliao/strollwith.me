'use strict'
app.config(function($stateProvider){
	$stateProvider.state('tour', {
		url : '/tour/:id',
		templateUrl : 'js/tour/tour.html',
		controller: 'TourCtrl',
		resolve : {
			tourData : function(TourFactory, $state, $stateParams){
				return TourFactory.findTour($stateParams.id).catch(function(){
					$state.go('home');
				});
			}
		}
	});
});

app.controller('TourCtrl', function($scope, tourData){
	$scope.tourData = tourData;

	//show and hiding images and map view
	$scope.show = false;
	$scope.showPics = function(){
		$scope.show = !$scope.show;
	}

	// updateInterval(audio, $scope.tourData.points[0].imagesUrl);
	$scope.interval = 5000;
	// $scope.slides = $scope.tourData.points[0].imagesUrl;
	// $scope.current = $scope.tourData.points[0].audioUrl;

	// $scope.$on('slideShow', function(event, data){
	// 	for(var i = 0; i < $scope.tourData.points.length; i++){
	// 		if($scope.tourData.points[i].latitude === data.latitude && $scope.tourData.points[i].longitude === data.longitude) {
	// 			$scope.images = $scope.tourData.points[i].imagesUrl;
	// 			$scope.slides = $scope.images;

	// 			$scope.$broadcast('pointChanged', {index: i});
	// 			// updateInterval(audio, $scope.tourData.points[i].imagesUrl);
	// 			break;
	// 		}
	// 	}
	// });

	// function updateInterval(htmlNode, imgArr){
	// 	$scope.interval = htmlNode.duration * 1000 / imgArr.length;
	// }

	$scope.$on('tourPause', function(event){
		$scope.$broadcast('tourPauseS');
	});

	$scope.$on('tourPlay', function(event){
		$scope.$broadcast('tourPlayS');
	});

	$scope.$on('tourNext', function(event){
		$scope.$broadcast('tourNextS');
	});

	$scope.$on('tourRewind', function(event){
		$scope.$broadcast('tourRewindS');
	});

	$scope.$on('tourIsEnded', function(event){
		$scope.$broadcast('tourIsEndedS');
	});

	$scope.$on('tourIsPlaying', function(event){
		$scope.$broadcast('tourIsPlayingS');
	});

	$scope.$on('tourIsPaused', function(event){
		$scope.$broadcast('tourIsPausedS');
	});
});

app.factory('TourFactory', function($http){
	return {
		createTour : function(data){
			return $http.post('api/tours', data).then(function(response){
				return response.data;
			});
		},
		findTour : function(id){
			console.log(id);
			return $http.get('api/tours/' + id).then(function(response){
				return response.data;
			});
		},
		updateTour : function(id, data){
			return $http.put('api/tours/' + id, data).then(function(response){
				return response.data;
			});
		},
		deleteTour : function(id){
			return $http.delete('api/tours/'+ id).then(function(response){
				return response.data;
			});
		},
		findAllTours : function(){
			return $http.get('api/tours').then(function(response){
				return response.data;
			});
		}
	}
});