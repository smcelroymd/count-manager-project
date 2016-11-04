define(['jquery',
	    'signals',
		'hasher',
		'crossroads',
		'view/home',
		'view/view1',
		'view/view2',
		'view/submenuviews/subMenuItem1',
		'view/submenuviews/subMenuItem2',
		'view/submenuviews/subMenuItem3',], function ($, signals, hasher, crossroads, home, view1, view2, subMenuItem1, subMenuItem2, subMenuItem3) {
	
	
	/**
	 * Gets the current route
	 * @returns
	 */
	function getRoute() {
		return hasher.getHash();
	}
	
	/**
	 * Sets the current route
	 * @returns
	 */
	function setRoute(route) {
		hasher.setHash(route);
	}
	
	/**
	 * Setup hasher parse function
	 */
	function parseHash(newHash, oldHash){
	  crossroads.parse(newHash);
	}
	
	/**
	 * Initialise router using a Self-Invoking Functions
	 */
	(function initialise() {
	
		crossroads.addRoute('/home', function() {
			home.show();
		});
		
		crossroads.addRoute('/view1', function() {
			view1.show();
		});
	
		crossroads.addRoute('/view2', function() {
			view2.show();
		});
		
		crossroads.addRoute('/submenuviews/subMenuItem1', function() {
			subMenuItem1.show();
		});

		crossroads.addRoute('/submenuviews/subMenuItem2', function() {
			subMenuItem2.show();
		});

		crossroads.addRoute('/submenuviews/subMenuItem3', function() {
			subMenuItem3.show();
		});

		/**
		 * Define what happens when a link is clicked
		 */
		$("a").click(function(e) {
			e.preventDefault();;
	        hasher.setHash($(this).attr('href'));
		});
		
		/**
		 * Setup hasher
		 * Crossroads does not handle browser history changes,
		 * to do that we have to use hasher.
		 */
		hasher.initialized.add(parseHash); //parse initial hash
		hasher.changed.add(parseHash); //parse hash changes
		hasher.init(); //start listening for history change		 
		/**
		 * update URL fragment generating new history record
		 */
		hasher.setHash('/home');
	})();
	
	return {
		getRoute : getRoute,
		setRoute : setRoute
	};
});