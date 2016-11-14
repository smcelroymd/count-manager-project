define(['jquery',
	    'signals',
		'hasher',
		'crossroads',
		'view/home',
		'view/verification',
		'view/ballotPaperAccount',
		'view/analytics'], function ($, signals, hasher, crossroads, home, verification, ballotPaperAccount, analytics) {
	
	
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
	
		crossroads.addRoute('home', function() {
			home.show();
		});
		
		crossroads.addRoute('ballotPaperAccount', function(){
			ballotPaperAccount.show();
		});
		
		crossroads.addRoute('verification', function(){
			verification.show();
		});

		crossroads.addRoute('ballotPaperStats', function(){
			ballotPaperStats.show();
		});

		crossroads.addRoute('analytics', function(){
			analytics.show();
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
		hasher.setHash('home');
	})();
	
	return {
		getRoute : getRoute,
		setRoute : setRoute
	};
});