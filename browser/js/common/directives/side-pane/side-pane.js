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

		}
	}
});