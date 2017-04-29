angular.module("zssn").config(function ($routeProvider) {
	
	$routeProvider.when("/dashboard", {
		templateUrl: "view/dashboardView.html",
		controller: "dashboardCtrl"
	});
	
	$routeProvider.when("/usuarios", {
		templateUrl: "view/usuariosView.html",
		controller: "usuariosCtrl",
		resolve: {
			usuarios: function (usuariosAPI) {
				return usuariosAPI.getUsuarios();
			}
		}
	});
	
	$routeProvider.otherwise({redirectTo: "/dashboard"});
});