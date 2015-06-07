app.directive('sidepane', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl : 'js/common/directives/side-pane/side-pane.html',
		scope: {
			stories: '=ngModel'
		},
		link : function(scope, element, attribute){
			scope.index = 0;
			scope.showing = scope.stories[scope.index];

			scope.$on('pointChanged', function(event, newIndex){
				scope.index = newIndex.index;
				scope.showing = scope.stories[scope.index];
				scope.$apply();
			});

			scope.$on('tourIsPlaying', function(){
				console.log('tour is playing');
			});

			scope.$on('tourIsPaused', function(){
				console.log('tour is paused');
			});

			scope.$on('tourIsEnded', function(){
				console.log('tour is ended');
			});

			scope.playTour = function(){
				scope.$emit('tourPlay');
			}

			scope.pauseTour = function(){
				scope.$emit('tourPause');
			}

			scope.nextPoi = function(){
				scope.$emit('tourNext');
			}

			scope.prevPoi = function(){
				scope.$emit('tourRewind');
			}
		}
	}
});