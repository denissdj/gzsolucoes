angular.module("zssn").value("config", {
	baseUrl : getBaseUrl()
});

function getBaseUrl() {
	var baseUrl = "/services";
	
	if(window.location.host.indexOf('localhost') >= 0){
		baseUrl = window.location.pathname + "services";
	}
	
	return baseUrl;
};