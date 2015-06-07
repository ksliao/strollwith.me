app.directive('listing', function(){
	return {
		restrict : 'E',
		templateUrl : 'js/common/directives/listing/listing.html',
		scope : {
			listing : '=ngModel'
		},
		link : function(scope, element, attribute){

		}
	}
});