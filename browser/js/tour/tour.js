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
	// var audio = document.getElementById('audio');
	// $scope.tourData = {
	// 	creator: 'hello',
	// 	name : 'Katrina Euro Trip',
	// 	description: 'It is awesome',
	// 	points : [
	// 		{
	// 			latitude: 40.701929,
	// 			longitude: -73.983912,
	// 			audioUrl : 'https://s3.amazonaws.com/angelhack2015-audio-tour/testaudio.mp3',
	// 			imagesUrl : [
	// 				'http://www.ripleys.com/wp-content/uploads/2013/11/Snoopybabe3-550x550.jpg',
	// 				'http://holykaw.alltop.com/wp-content/uploads/2013/10/snoopybabe-cute-sad-cat-4-500x372.jpg',
	// 				'https://s-media-cache-ak0.pinimg.com/736x/af/7f/a2/af7fa28b2eada5402933713b6399d08e.jpg'
	// 			]
	// 		},
	// 		{
	// 			latitude: 50.701929,
	// 			longitude: -83.983912,
	// 			audioUrl : 'https://s3.amazonaws.com/angelhack2015-audio-tour/testaudio2.mp3',
	// 			imagesUrl : [
	// 				'http://urbanblog.pairsite.com/files/Boo_photo1.JPG',
	// 				'http://images5.fanpop.com/image/photos/31600000/Boo-Buddy-333-boo-and-buddy-31665381-960-720.jpg',
	// 				'http://images6.fanpop.com/image/photos/32500000/-boo-and-buddy-32578209-403-403.jpg'
	// 			]
	// 		},
	// 		{
	// 			latitude: 60.701929,
	// 			longitude: -93.983912,
	// 			audioUrl : '',
	// 			imagesUrl : [
	// 				'',
	// 				'',
	// 				''
	// 			]
	// 		}
	// 	]
	// };
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