app.directive('audiotour', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'js/common/directives/audiotour/audiotour.html',
		scope: {
			stories : '=ngModel'
		},
		link: function(scope, element, attribute){
			var audio = document.getElementById('audiotour');

			scope.index = 0;
			scope.playing = scope.stories[scope.index].audioUrl;

			scope.$on('pointChanged', function(event, newIndex){
				playAudio(newIndex.index);
			});

			scope.$on('tourPauseS', function(event){
				audio.pause();
			});

			scope.$on('tourPlayS', function(event){
				audio.play();
			});

			scope.$on('tourNextS', function(event){
				if(scope.index < scope.stories.length) playAudio(scope.index + 1);
			});

			scope.$on('tourRewindS', function(event){
				console.log('nextTour');
				if(scope.index > 0) playAudio(scope.index - 1);
			});

			element.on('ended', function(){
				if(scope.index === scope.stories.length -1) scope.$emit('tourIsEnded');
				else playAudio(scope.index + 1);
			});

			element.on('play', _.debounce(function(){
					return scope.$emit('tourIsPlaying');
				}, 100000, {
					leading: true
				})
			);

			element.on('pause', _.debounce(function(){
					return scope.$emit('tourIsPaused');
				}, 100000, {
					leading: true
				})
			);

			function playAudio(index){
				scope.index = index;
				scope.playing = scope.stories[scope.index].audioUrl;
				scope.$apply();
			};
		}
	}
});