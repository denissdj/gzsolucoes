angular.module("zssn").factory("usuariosAPI", function ($http, config) {
	var _getUsuarios = function () {
		return $http.get(config.baseUrl + '/usuario');
	};
	
	var _saveUsuario = function (usuario) {
		return $http.post(config.baseUrl + '/usuario', usuario);
	};
	
	var _getUsuario = function (id) {
		return $http.get(config.baseUrl + "/usuario/" + id);
	};
	
	var _marcarUsuarioComoInfectado = function (usuario) {
		return $http.put(config.baseUrl + '/usuario/marcarUsuarioComoInfectado', usuario);
	};
	
	return {
		getUsuarios: _getUsuarios,
		getUsuario: _getUsuario,
		saveUsuario : _saveUsuario,
		marcarUsuarioComoInfectado: _marcarUsuarioComoInfectado
	};
});