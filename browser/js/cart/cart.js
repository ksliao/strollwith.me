app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartController'
    });

});

app.controller("CartController", function ($scope, $window, $rootScope){
	var storage = $window.sessionStorage;
	$scope.cartCount = storage.length;

	$scope.toursInCart = [];
	$scope.addToCart = function() {
		//$window.sessionStorage.tours = [];

			storage[storage.length] = "Hello"
			console.log("HREER", $window.sessionStorage);
			$scope.toursInCart.push("HELLO");
			$rootScope.cart = storage.length;
	}
});