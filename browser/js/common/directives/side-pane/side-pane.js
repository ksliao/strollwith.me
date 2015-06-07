app.directive('sidepane', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl : 'js/common/directives/side-pane/side-pane.html',
		scope: {
			stories: '=ngModel',
			name : '=',
			description : '=',
			creator : '='
		},
		link : function(scope, element, attribute){
			scope.activatedButton = 'stop';

			scope.index = 0;
			scope.showing = scope.stories[scope.index];

			scope.$on('pointChanged', function(event, newIndex){
				scope.index = newIndex.index;
				scope.showing = scope.stories[scope.index];
				scope.$apply();
			});

			scope.$on('tourIsPlayingS', function(){
				scope.activatedButton = 'play';
			});

			scope.$on('tourIsPausedS', function(){
				console.log('tour is paused');
				scope.activatedButton = 'pause';
			});

			scope.$on('tourIsEndedS', function(){
				console.log('tour is ended');
				scope.activatedButton = 'stop';
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