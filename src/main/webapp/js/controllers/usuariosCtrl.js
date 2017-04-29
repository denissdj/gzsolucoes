angular.module("zssn").controller("usuariosCtrl", function ($scope, usuarios, usuariosAPI, util, growl) {
	$scope.usuarios = usuarios.data.usuarios;
	$scope.usuario = {};
	
    var carregarUsuarios = function carregarUsuarios() {
    	 usuariosAPI.getUsuarios().success(function (data) {
			$scope.usuarios = data.usuarios;
		});
	};
	
	
	var fecharFormAdicionarUsuario = function fecharFormAdicionarUsuario() {
		util.rolarPaginaParaCima();
		$scope.limparFormulario();
		$scope.apresentarFormAdicionar = false;
	};
	
	$scope.salvarUsuario = function salvarUsuario(usuario){
		$scope.isDisabledBtnSalvar = true;
		usuariosAPI.saveUsuario(usuario).success(function (data, status){
			$scope.limparFormulario();
			fecharFormAdicionarUsuario();
			carregarUsuarios();
		})
		$scope.isDisabledBtnSalvar = false;
	};
	
	$scope.editarUsuario = function editarUsuario(usuario) {
		usuariosAPI.getUsuario(usuario.id).success(function (data, status){
			$scope.adicionarUsuario();
			$scope.usuario = data;
		});
	};
	
	$scope.limparFormulario = function limparFormulario() {
		$scope.usuarioForm.$setPristine();
		$scope.usuario = {};
		util.rolarPaginaAteElemento('usuarioForm');
	};
	
	$scope.selecionarUsuario = function selecionarUsuario(usuario) {
		$scope.usuarioSelecionado = usuario;
	};
	
	$scope.removerUsuario = function removerUsuario(usuario) {
		usuariosAPI.removeUsuario(usuario.id).success(function (data) {
			$('.fecharModalConfirmar').trigger('click');
			delete $scope.usuarioSelecionado;
			carregarUsuarios();
		}).error(function (data, status){
			$('.fecharModalConfirmar').trigger('click');
		});
	};
	
	$scope.marcarUsuarioComoInfectado = function marcarUsuarioComoInfectado(usuario) {
		usuariosAPI.marcarUsuarioComoInfectado(usuario).success(function (data) {
			$('.fecharModalConfirmar').trigger('click');
			delete $scope.usuarioSelecionado;
			carregarUsuarios();
		});
	};
	
	$scope.adicionarUsuario = function adicionarUsuario() {
		$scope.limparFormulario();
		$scope.apresentarFormAdicionar = true;
		util.rolarPaginaAteElemento('usuarioForm');
	};
	
	$scope.cancelarAdicionarUsuario = function cancelarAdicionarUsuario() {
		fecharFormAdicionarUsuario();
	};

});