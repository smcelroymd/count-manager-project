define(['jquery',
	    'Cookies', 
		'util/router',
		'util/controller',
		'util/jquery.md.object.util',
		'bootstrap'], function ($, Cookies, router) {
	
	(function initialise() {												
		
		/**
		 * Removes 'active' class from currently selected/active item on 
		 * side menubar and adds the 'active' class to the item that
		 * has just been clicked
		 * 
		 * The 'active' class makes the text green. 
		 */
		$('.sidenav .nav-pills li').on('click', function() {		  
			if($('a',this).attr('href') !== '#') {
				$('.sidenav ul.nav-pills li.active').removeClass('active');
				$(this).addClass('active');
			}
		});
		
		/**
		 * Collapse the menu if shown and a link is clicked
		 */
		$(".nav-pills-menu li a").click(function(event) {
			if($(this).attr('href') !== '#') {
				$(".navbar-collapse").collapse('hide');
			}
		});
		
		/**
		 * If a user refreshes the browser (presses F5) remember the current page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		$( window ).on('beforeunload', function() {
			Cookies.set('mdl-register-manager-current-page', router.getRoute());
		});
		
		/**
		 * If a user refreshed the browser (presses F5) show the correct page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		var route = Cookies.get('mdl-register-manager-current-page');
		if(route !== undefined) {
			router.setRoute(route);
			Cookies.remove('mdl-register-manager-current-page');
			
			/**
			 * Highlight the correct menu option 
			 */
			$('.sidenav ul.nav-pills li.active').removeClass('active');
			$('a[href^="' + route + '"').parent().addClass('active');			
		}
		
		console.log('Application Initialised');
	})();
	
});