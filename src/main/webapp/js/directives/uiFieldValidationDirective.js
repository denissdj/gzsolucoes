angular.module("zssn").directive("uiFieldValidation", function () {
	return {
		templateUrl: "js/directives/uiFieldValidationDirective.html",
		replace: true,
		restrict: "E",
		transclude: true,
		scope: {
			field: "=",
			message: "@",
			notLabel: "@"
		},
		link: function (scope, element, attrs, ctrl) {
			if(scope.notLabel == "true"){
				scope.notLabel = true;
			}
		}
	};
});

angular.module("zssn").directive('validarEmail', function() {
	return {
	  require: 'ngModel',
	  link: function(scope, element, attr, mCtrl) {
	      function validarEmail(value) {
	    	  var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z0-9]{2,3}/; 
	    	  var isValid = er.test(value);
	    	  mCtrl.$setValidity('charE', isValid);
	          return value;
	      }
	      mCtrl.$parsers.push(validarEmail);
	  }
	};
});

angular.module("zssn").directive('validarSenha', function() {
	return {
	  require: 'ngModel',
	  link: function(scope, element, attr, mCtrl) {
	      function validarEmail(value) {
	    	  var er = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/; 
	    	  var isValid = er.test(value);
	    	  mCtrl.$setValidity('charE', isValid);
	          return value;
	      }
	      mCtrl.$parsers.push(validarEmail);
	  }
	};
});


//Senha (maiúsculas, minúsculas e Number)
//" ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$ "

//Senha (letras maiúsculas, minúsculas, Número / SpecialChar e min 8 caracteres)
//" (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$ "

//Senha (letras minúsculas + números + caracter especial e min 8 caracteres)
//validate-field="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$"

angular.module("zssn").directive('validateField', function() {
//	utilizar assim = validate-field="^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z0-9]{2,3}"
	return {
	  require: 'ngModel',
	  link: function(scope, element, attr, mCtrl) {
	      function validateField(value) {
	    	  var er = attr.validateField; 
	    	  pattern = new RegExp(er);
	    	  var isValid = pattern.test(value);
	    	  mCtrl.$setValidity('charE', isValid);
	          return value;
	      }
	      mCtrl.$parsers.push(validateField);
	  }
	};
});

