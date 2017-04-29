angular.module("zssn").provider("util", function () {
	
	var _length = 10;
	
	this.getLength = function () {
		return _length
	};

	this.setLength = function (length) {
		_length = length;
	};
	
	_rolarPaginaParaCima = function rolarPaginaParaCima() {
		$('html, body').animate({scrollTop: $('html, body').offset().top - 50}, 1000);
	};
	
	_rolarPaginaParaBaixo = function rolarPaginaParaBaixo() {
		$('body').animate({scrollTop : $('body').height()}, 1000);
	}
	
	_rolarPaginaAteElemento = function rolarPaginaAteElemento(idElemento) {
		$('body').animate({ scrollTop :$('#'+ idElemento).offset().top - 50 }, 1000); 
	};
	
	_getDadosUsuarioLogado = function getDadosUsuarioLogado() {
		var storage = sessionStorage;
		if(localStorage.length > 0) storage = localStorage;
		var dadosUsuario = storage.getItem('dadosUsuario');
		if(dadosUsuario) {
			dadosUsuario = JSON.parse(storage.getItem('dadosUsuario'));
			dadosUsuario.ultimoLogin = storage.getItem('ultimoLogin') == "null" ? null : storage.getItem('ultimoLogin');
			return dadosUsuario;
		}
	};
	
	_changeStorage = function changeStorage(isManterConectado, loginUsuario) {
		var storage = sessionStorage;
		if(isManterConectado) storage = localStorage;
		storage.setItem("isAutenticado", true);
		storage.setItem("expires", loginUsuario.usuario.expires);
		storage.setItem("authorization", loginUsuario.usuario.autorizacao);
		storage.setItem("dadosUsuario", JSON.stringify(loginUsuario.usuario)); 
		storage.setItem("ultimoLogin", JSON.stringify(loginUsuario.dataUltimoLogin));
	};
	
	_clearStorage = function clearStorage() {
		Object.keys(sessionStorage).forEach(function(key) {
			sessionStorage.removeItem(key);
	    });
		Object.keys(localStorage).forEach(function(key) {
			localStorage.removeItem(key);
		});
	};
	
	this.$get = function () {
		return {
			
			
//			scrollTo: function scrollTo (eID){
//		        // This scrolling function 
//		        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
//		        
//		        var startY = currentYPosition();
//		        var stopY = elmYPosition(eID);
//		        var distance = stopY > startY ? stopY - startY : startY - stopY;
//		        if (distance < 100) {
//		            scrollTo(0, stopY); return;
//		        }
//		        var speed = Math.round(distance / 100);
//		        if (speed >= 50) speed = 50;
//		        var step = Math.round(distance / 25);
//		        var leapY = stopY > startY ? startY + step : startY - step;
//		        var timer = 0;
//		        if (stopY > startY) {
//		            for ( var i=startY; i<stopY; i+=step ) {
//		                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//		                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
//		            } return;
//		        }
//		        for ( var i=startY; i>stopY; i-=step ) {
//		            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//		            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
//		        }
//		        
//		        function currentYPosition() {
//		            // Firefox, Chrome, Opera, Safari
//		            if (self.pageYOffset) return self.pageYOffset;
//		            // Internet Explorer 6 - standards mode
//		            if (document.documentElement && document.documentElement.scrollTop)
//		                return document.documentElement.scrollTop;
//		            // Internet Explorer 6, 7 and 8
//		            if (document.body.scrollTop) return document.body.scrollTop;
//		            return 0;
//		        }
//		        
//		        function elmYPosition(eID) {
//		            var elm = document.getElementById(eID);
//		            if (elm == null) return 0;
//		            var y = elm.offsetTop;
//		            var node = elm;
//		            while (node.offsetParent && node.offsetParent != document.body) {
//		                node = node.offsetParent;
//		                y += node.offsetTop;
//		            } return y;
//		        }
//
//		    },
			
			preencheZeroEsquerda: function (valor,tamanho){
				if(valor != undefined ){
					valor = valor.toString();
					var qtd = valor.length;
					if(qtd < tamanho){
						var limite = tamanho-qtd;
						for(var i=0;i<limite;i++){
							valor = '0' + valor;
						}
					}
				}	
				return valor;
			},
			
			serialGenerate: function () {
				var serial = "";
				while(serial.length < _length) {
					serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
				}
				return serial;
			},
			
			stringToFloat: function (valor) {
				valor = valor.replace(/\./g,'').replace(',','.');
				return parseFloat(valor);
			},
			
			removerZeroEsquerda: function(valor) {
				return valor.replace(/^0+/, '');
			},
			
			removerCaracteresDiferenteDigito : function(valor) {
				return valor.replace(/[^0-9]+/g, "");
			},
			
			rolarPaginaParaCima : function (){
				_rolarPaginaParaCima();
			},
			
			rolarPaginaParaBaixo : function (){
				_rolarPaginaParaBaixo();
			},
			
			rolarPaginaAteElemento : function (idElemento){
				_rolarPaginaAteElemento(idElemento);
			},
			
			getIdUsuarioLogado : function (){
				return _getDadosUsuarioLogado().id;
			},
			
			isUserAdmin : function (){
				isUserAdmin = false;
				if(_getDadosUsuarioLogado()){
					isUserAdmin = _getDadosUsuarioLogado().userAdmin;
				}
				return isUserAdmin;
			},
			
			getDadosusuarioLogado : function (){
				return _getDadosUsuarioLogado();
			},
			
			changeStorage : function (isManterConectado, loginUsuario){
				_changeStorage(isManterConectado, loginUsuario);
			},
			
			clearStorage : function (){
				_clearStorage();
			},
			
		};
	};
});