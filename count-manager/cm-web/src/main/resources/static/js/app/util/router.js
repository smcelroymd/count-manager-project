define(['jquery',
	    'signals',
		'hasher',
		'crossroads',
		'view/ballotBoxCount',
		'view/ballotPaperAccount',
		'view/verification',
		'view/analytics',
		'view/analytics2',
		'view/analytics3'], function ($, signals, hasher, crossroads, ballotBoxCount, ballotPaperAccount, verification, analytics, analytics2, analytics3) {
	
	
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
		
		crossroads.addRoute('ballotBoxCount', function(){
			ballotBoxCount.show();
		});

		crossroads.addRoute('verification', function(){
			verification.show();
		});

		crossroads.addRoute('analytics', function(){
			analytics.show();
		});

		crossroads.addRoute('analytics2', function(){
			analytics2.show();
		});

		crossroads.addRoute('analytics3', function(){
			analytics3.show();
		});

		/**
		 * Define what happens when a link is clicked
		 */
		$("a").click(function(e) {
			e.preventDefault();
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
		hasher.setHash('analytics3');
	})();
	
	return {
		getRoute : getRoute,
		setRoute : setRoute
	};
});