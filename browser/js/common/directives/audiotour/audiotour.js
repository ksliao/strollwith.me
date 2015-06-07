app.directive('audiotour', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/common/directives/audiotour/audiotour.html',
		scope: {
			stories : '=ngModel'
		},
		link: function(scope, element, attribute){
			scope.index = 0;
			scope.playing = scope.stories[scope.index].audioUrl;

			scope.$on('pointChanged', function(event, newIndex){
				playAudio(newIndex.index);
			});

			scope.$on('tourPause', function(event){
				element.triggerHandler('pause');
			});

			scope.$on('tourPlay', function(event){
				element.triggerHandler('play');
			});

			scope.$on('tourNext', function(event){
				if(scope.index < scope.stories.length) playAudio(scope.index + 1);
			});

			scope.$on('tourRewind', function(event){
				if(scope.index > 0) playAudio(scope.index - 1);
			});

			element.on('ended', function(){
				if(scope.index === scope.stories.length -1) scope.$emit('tourIsEnded');
				else playAudio(scope.index + 1);
			});

			element.on('play', function(){
				scope.$emit('tourIsPlaying');
			});

			element.on('pause', function(){
				scope.$emit('tourIsPaused');
			});

			function playAudio(index){
				scope.index = index;
				scope.playing = scope.stories[scope.index].audioUrl;
				scope.$apply();
			};
		}
	}
});