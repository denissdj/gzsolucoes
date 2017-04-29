angular.module("zssn").directive("uiMenu", function () {
	return {
		restrict: "A",
		priority: 100,
		controller: function ($scope, $element, $attrs) {
			var itens = [];
			this.registerElement = function (item) {
				itens.push(item);
			};
			this.unSelectedSubmenuAll = function () {
				itens.forEach(function (item) {
					item.isSelectedSubmenu = false;
					item.isMenuAberto = false;
				});
			};
			this.unSelectedAll = function () {
				itens.forEach(function (item) {
					item.isSelected = false;
				});
			};
			this.closeMenu = function () {
				if($(window).width() < 960){
//					$('.js-sidebar, .js-content').removeClass('is-toggled');
					document.getElementById("js-sidebar").classList.remove("is-toggled");
					document.getElementById("js-content").classList.remove("is-toggled");
				}
			};
		}
	};
});

angular.module("zssn").directive("uiMenuItem", function ($location, util) {
	return {
		restrict: "E",
		templateUrl: "js/directives/uiMenuDirective.html",
		priority: 99,
		require: "^uiMenu",
		replace: true,
		scope: {
			clazz: "@",
			name: "@",
			link: "@",
			id: "@",
			title: "@",
			submenu: "@",
			admin: "=",
			init:"="
		},
		link: function (scope, element, attrs, ctrl) {
			
			scope.isEsconderMenu = false;
			
			if(scope.admin){
				scope.isEsconderMenu = !util.isUserAdmin();
			}
			
			ctrl.registerElement(scope);
			scope.selected = function () {
				$('.fecharModalDadosUsuario').trigger('click');
				ctrl.unSelectedAll();
				if(scope.submenu !== "true"){
					ctrl.unSelectedSubmenuAll();
				}
				ctrl.closeMenu();
				scope.isSelected = true;
				util.rolarPaginaParaCima();
			};
			if(scope.init){
				scope.selected();
				$location.path(scope.link);
			}
		}
	};
});

angular.module("zssn").directive("uiMenuSubmenu", function ($location, util) {
	return {
		restrict: "E",
		templateUrl: "js/directives/uiMenuSubmenuDirective.html",
		priority: 98,
		require: "^uiMenu",
		replace: false,
		transclude: true,
		scope: {
			name: "@"
		},
		link: function (scope, element, attrs, ctrl) {
			ctrl.registerElement(scope);
			scope.id = scope.name.replace(/\s/g, "").toLowerCase();
			scope.selected = function () {
				$('.fecharModalDadosUsuario').trigger('click');
				if(!scope.isSelectedSubmenu){
					ctrl.unSelectedSubmenuAll();
				}
				scope.isSelectedSubmenu = true;
				scope.isMenuAberto = !scope.isMenuAberto;
			};
		}
	};
});