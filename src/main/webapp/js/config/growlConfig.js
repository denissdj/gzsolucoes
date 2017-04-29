angular.module("zssn").config(['growlProvider', function(growlProvider) {
	
	growlProvider.globalTimeToLive(5000);
	growlProvider.globalDisableCountDown(true);
	
}]);

