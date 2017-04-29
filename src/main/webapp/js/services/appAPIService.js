angular.module("zssn").factory('httpRequestInterceptor', function ($q, growl) {
	 return {
	  	  request: function (config) {
	  		  var authorization = "1234567890";
	  		  config.headers['Authorization'] = authorization;
	      	  return config;
	      },
	      
		  response: function(response) {
			  if(response.data.msg !== undefined){
				  growl.success(response.data.msg);
			  }
		      return response;
		  },
	      
		  responseError: function(response) {
			  var msg = null;
			  
			  switch (response.status) {
				  
				  case 401: //Unauthorized
					  growl.warning("Acesso ao Recurso não Autorizado!", {ttl: -1});
				  break;
				  
				  case 409: //Conflict
			  		  growl.warning(response.data.msg);
				  break;
				  
				  case 400: //Bad Request
			  		  msg = "Ocorreu um erro na aplicação!";
					  if(response.data && response.data.msg){
						  msg = response.data.msg;
					  }
				  break;
				  
				  case 403:
					  msg = "Acesso Proibido!";
				  break;
				  
				  case 404: // Nao utilizar para poder tratar das regras de negocios em particular
					  msg = null; /*"Não Encontrado!";*/
				  break;
				  
				  case 408:
					  msg = "Tempo de requisição esgotou!";
				  break;
				  
				  case 500:
					  msg = "Erro interno do servidor!";
				  break;
				  
				  case 501:
					  msg = "Não implementado!";
				  break;
				  
				  case 502:
					  msg = "Bad Gateway!";
				  break;
				  
				  case 503:
					  msg = "Serviço indisponível!";
				  break;
	
				  default:
					  msg = "Erro desconhecido!";
				  break;
			  }
			  
			  if(msg){
				  growl.error(msg, 	{ttl: -1});
			  }
			  
	          return $q.reject(response);
	      }
	 };
});

angular.module("zssn").config(function ($httpProvider) {
	  $httpProvider.interceptors.push('httpRequestInterceptor');
});