app.directive('listing', function($rootScope){
	return {
		restrict : 'E',
		templateUrl : 'js/common/directives/listing/listing.html',
		scope : {
			listing : '=ngModel'
		},
		link : function(scope, element, attribute){
			var storage = $window.sessionStorage;
			scope.addToCart = function(id){
				storage[storage.length] = "Hello";
				$rootScope.cart = storage.length;
			};
		}
	}
});