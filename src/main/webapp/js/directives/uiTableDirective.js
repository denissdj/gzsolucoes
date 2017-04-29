angular.module("zssn").directive("uiTable", function ($filter) {
	return {
		templateUrl: "js/directives/uiTableDirective.html",
		replace: true,
		restrict: "E",
		transclude: true,
		priority: 10,
		scope: {
			list: "=",
			startFrom: "=",
			pageSize: "=",
			criterionSearch: "="
		},
		
		link: function (scope, element, attrs, ctrl) {
			
			if(!scope.list){
				scope.list = [];
			}
			
			if(scope.pageSize == undefined){
				scope.pageSize = 5;
			}
			
			if(scope.criterionSearch == undefined){
				scope.criterionSearch = "";
			}
			
			scope.$watch("criterionSearch", function(query){
				scope.filteredItems = $filter("filter")(scope.list, query);
			});
			
			//executa fucoes quando a lista for atualizada
            scope.$watch('list', function (list) {
    			scope.criterionSearch = "";
            	scope.loadPagination();
            });
            
            scope.loadPagination = function loadPagination() {
		    	 scope.goToPage(0);
		    };
            
		    scope.goToPage = function goToPage(page) {
		    	scope.numeroPaginas = scope.numberOfPages();
		    	if(page >= 0 && page <= scope.numeroPaginas - 1 || scope.numeroPaginas == 0){
		    		scope.pageSequence = mostrarPagina(page + 1);
		    		scope.currentPage =  page;
		    		scope.startFrom = scope.currentPage * scope.pageSize;
		    		definirTotalregistros(scope.numeroPaginas)
		    	}
		    };
		    
			scope.numberOfPages = function numberOfPages(){
				var numeroPaginas = 0;
				if(!scope.currentPage) scope.currentPage = 0;
				if(scope.criterionSearch == ""){
					numeroPaginas = obterNumeroPaginas(scope.list.length);
					scope.isGridVazia = scope.list.length == 0;
				} else {
					numeroPaginas = obterNumeroPaginas(scope.filteredItems.length);
					scope.isGridVazia = scope.filteredItems.length == 0;
				}
				scope.totalGeralRegistros = scope.list.length;
				return numeroPaginas;  
		    }
			
			var obterNumeroPaginas = function obterNumeroPaginas(totalRegistros){
				scope.totalRegistros = totalRegistros;
				numeroPaginas = Math.ceil(totalRegistros/scope.pageSize); 
				return numeroPaginas;
			}
		    
			var definirTotalregistros = function definirTotalregistros(numeroPaginas){
				scope.registroPaginaInicial = numeroPaginas == 0 ? 0 : (scope.currentPage * scope.pageSize) + 1;
				scope.registroPaginaFinal = (scope.currentPage + 1) * scope.pageSize;
				scope.registroPaginaFinal > scope.totalRegistros ? scope.registroPaginaFinal = scope.totalRegistros : '';
		    };
			
			var pageSequenceDefnition = function pageSequenceDefnition(){
				var retorno = [];
				for (var int = 0; int < scope.numeroPaginas; int++) {
					retorno.push(int + 1);
				}
				return retorno;
		    };
		    
		    var mostrarPagina = function mostrarPagina(page){
		    	var paginasMostrar = [];
		    	var paginas = pageSequenceDefnition();
		    	var indexPagina = paginas.indexOf(page);
		    	
		    	if(indexPagina != -1){
		    		if(paginas.length < 6){
						return paginas;
					}
		    		if(paginas.length - indexPagina <= 3){
						paginasMostrar = paginas.slice(paginas.length - 5, paginas.length + 1)
						return paginasMostrar;
					}
		    		for (var int = 0; int < paginas.length; int++) {
		    			if(indexPagina < 2 && paginasMostrar.length < 5){
		    				paginasMostrar.push(paginas[int]);
		    			}
		    			else if(int < indexPagina + 3 && int > indexPagina - 3){
		    				paginasMostrar.push(paginas[int]);
		    			}
		    		}
		    	}
		    	return paginasMostrar;
		    };
		    
		}
	};
});

angular.module("zssn").directive("uiTableHead", function () {
	return {
		restrict: "A",
		priority: 9,
		controller: function ($scope, $element, $attrs) {
			var itens = [];
			this.registerElement = function (item) {
				itens.push(item);
			};
			this.closeAll = function () {
				itens.forEach(function (item) {
					item.show = false;
				});
			};
		}
	};
});

angular.module("zssn").directive("uiTableHeadTh", function () {
	return {
		restrict: "A",
		priority: 8,
		templateUrl: "js/directives/uiTableSortingByDirective.html",
		require: "^uiTableHead",
		scope: {
			name: "@",
			orderBy: "@",
			ordenacao: "@",
			direction: "=",
			sortingBy: "=",
			init:"="
		},
		link: function (scope, element, attrs, ctrl) {
			ctrl.registerElement(scope);
			scope.loadPagination = function () {
				if(!!scope.$parent.$parent.loadPagination){
					scope.$parent.$parent.loadPagination();
				}
			}
			scope.order = function () {
				scope.direction = scope.show ? !scope.direction : false;
				ctrl.closeAll();
				scope.sortingBy = scope.orderBy;
				scope.show = true;
				scope.loadPagination();
			};
			
			if(scope.init){
				scope.direction = scope.ordenacao == "asc" ? true : false;
				scope.show= true
				scope.order();
			}
		}
	};
});
