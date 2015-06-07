app.filter('activated', function(){
	return function(input, compareTo){
		return input === compareTo ? 'btn btn-default activated' : 'btn btn-default';
	}
})