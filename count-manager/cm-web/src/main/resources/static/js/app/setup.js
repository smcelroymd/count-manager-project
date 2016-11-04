define(['jquery',
    	'Cookies',
		'util/router',
		'util/controller',
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
		 * If a user refreshes the browser (presses F5) remember the current page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		$( window ).on('beforeunload', function() {
			if(router === undefined) {
				var a = 1;
			}
			Cookies.set('mdl-count-mamanger-current-page', router.getRoute());
		});
		
		/**
		 * If a user refreshed the browser (presses F5) show the correct page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		var route = Cookies.get('mdl-count-mamanger-current-page');
		if(route !== undefined) {
			router.setRoute(route);
			Cookies.remove('mdl-count-mamanger-current-page');
		}		
		
		console.log('Application Initialised');
	})();
	
});