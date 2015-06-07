app.filter('trusted', function($sce){
	return function(link){
		return $sce.trustAsResourceUrl(link);
	};
});