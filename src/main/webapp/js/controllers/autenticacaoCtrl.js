angular.module("zssn").service('autenticacaoService', function($window) {
	
	// Check browser support localStorage | sessionStorage (Session Storage)
	if (typeof(Storage) !== "undefined") {
		
		this.isAutenticado = false;
		var isAutenticadoSessionStorage = false;
		var isAutenticadoLocalStorage = false;
		var diaAtual = new Date().getDate().toString();
		var expires = "";
		
		if(sessionStorage.getItem("isAutenticado") === 'true'){
			isAutenticadoSessionStorage = true;
			expires = sessionStorage.getItem("expires");
		}
		
		if(localStorage.getItem("isAutenticado") === 'true'){
			isAutenticadoLocalStorage = true;
			expires = localStorage.getItem("expires");
		}
		
		if(diaAtual === expires){
			this.isAutenticado = isAutenticadoSessionStorage || isAutenticadoLocalStorage;
		}
		
	} else {
		$window.alert("Browser does not support Web Storage. When refresh the page, you must login again");
		this.isAutenticado = false;
	}
});

angular.module("zssn").controller('autenticacaoCtrl', function ($scope, autenticacaoService, usuariosAPI, $timeout, $location, util) {
	
	$scope.login = autenticacaoService;
	$scope.isAutenticado = autenticacaoService.isAutenticado;
	$scope.usuario = {};
	$scope.usuarioLogado = {};
	$scope.dataLoading = false;
	$scope.captcha = {};
	$scope.captcha.key = "6LeSXRMUAAAAAK9YImEvdC6W1igDvzw6uP_tFWA8";
	$scope.widgetId = null;
	$scope.response = null;
	
	$scope.entrar = function entrar(usuario) {
		 $scope.dataLoading = true;
		 $scope.loginForm.$setPristine();
		 delete $scope.error;
		 
		 if(usuario.login == undefined || usuario.senha == undefined){
			$scope.loginForm.login.$setDirty();
			$scope.loginForm.senha.$setDirty();
			$scope.dataLoading = false;
			return false;
		 }
	 
		 $timeout(function() {
			usuariosAPI.efetuarLogin(usuario).success(function (data) {
				util.changeStorage($scope.isManterConectado, data.loginUsuario);
				$scope.login.isAutenticado = true;
				delete $scope.usuario;
				$scope.usuario = {};
				$scope.loginForm.$setPristine();
				$location.path("/dashboard");
				$('.itemMenu').parent().removeClass('is-selected');
				$('#menuDashboard').addClass('is-selected');
			}).error(function (data, status){
				$scope.error = data.msg;
				$scope.login.isAutenticado = false;
				vcRecaptchaService.reload($scope.widgetId);
			});
			$scope.dataLoading = false;
	    }, 500);
	};
	
	$scope.logout = function logout() {
		$scope.dataLoading = true;
		$timeout(function() {
			$scope.login.isAutenticado = false;
			util.clearStorage();
			$scope.usuarioLogado = {};
//			location.reload();
			$('.fecharModalLogout').trigger('click');
			$scope.dataLoading = false;
		}, 1000);
	};
	
	$scope.atualizarDadosUsuario = function atualizarDadosUsuario() {
		$scope.usuarioLogado = util.getDadosusuarioLogado();
	};
	
	$scope.setResponse = function (response) {
//        console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
        $scope.widgetId = widgetId;
        ajustarRecaptcha();
		//console.info('Created widget ID: %s', widgetId);
    };
    $scope.cbExpiration = function() {
        //console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        ajustarRecaptcha();
        $scope.response = null;
    };
     
	 ajustarRecaptcha = function ajustarRecaptcha(){
		 var larguraTela = $(window).width();
	     var escala = 1;
	     if(larguraTela < 385){
	     	var largExcedente = 385 - larguraTela;
	     	var diminuirEscala = largExcedente / 3.066666666666667 / 100;
	     	escala = escala - diminuirEscala;
	     }
	     //console.log('tamanho escala: ' + escala);
	     $('#loginForm iframe').css({
			  'transform':'scale('+escala+')',
			  'transform-origin': 'left top',
			  '-webkit-transform-origin': 'left top'
	     });
	 };
	
});