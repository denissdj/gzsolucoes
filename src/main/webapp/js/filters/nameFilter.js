angular.module("zssn").filter("name", function() {
	return function(input) {
		var listaDeNomes = input.split(" ");
		var listaDeNomesFormatada = listaDeNomes.map(function(nome) {
			if(nome.length === 2) return nome;
			return nome.charAt(0).toUpperCase() + nome.substring(1).toLocaleLowerCase();
		});
		return listaDeNomesFormatada.join(" ");
	};
});