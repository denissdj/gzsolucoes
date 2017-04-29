$(function() {
	$('.js-toggle').bind('click', function(event) {
		$('.js-sidebar, .js-content').toggleClass('is-toggled');
		event.preventDefault();
	});	
});

fecharMenu = function(){
	if($(window).width() < 960){
		$('.js-sidebar, .js-content').removeClass('is-toggled');
	}
}

$(function () {
	$("[data-toggle=popover]").popover({
	    html: true, 
		content: function() {
			  fecharMenu();
	          return $('#popover-usuario-content').html();
	        }
	})
	$(window).scroll(function() {
		$('#btnInfUsuario').blur();
		$("[data-toggle=popover]").popover('hide');
	});
});


//fecharMenuBtnSair = function(){
//$('.fecharModalDadosUsuario').trigger('click');
//$('.js-sidebar, .js-content').toggleClass('is-toggled');
//}

//fecharMenuBtnSair960px = function(){
//	if($(window).width() < 960){
////		setTimeout(function(){ 
//			$('.js-sidebar, .js-content').addClass('is-toggled')
////		}, 3000);
//	}
//}

//$(function() {
//	
//	alterarIconeMenu();
//	
//	$(window).resize(function() {
//		$('.js-sidebar, .js-content').removeClass('is-toggled');
//		$('.icone-menu').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-hamburger');
//	});
//	
//	$('.js-toggle').bind('click', function(event) {
//		$('.js-sidebar, .js-content').toggleClass('is-toggled');
//		alterarIconeMenu();
//		event.preventDefault();
//	});	
//});
//
//alterarIconeMenu = function(){
//	if($('.js-sidebar, .js-content').hasClass('is-toggled')){
//		$('.icone-menu').addClass('glyphicon-menu-left').removeClass('glyphicon-menu-hamburger');
//	} else {
//		$('.icone-menu').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-hamburger');
//	}
//}