define(['jquery',
	    'signals',
		'hasher',
		'crossroads',
		'view/count',
		'view/ballotBoxes',
		'view/ballotBoxCount',
		'view/ballotPaperAccount',
		'view/verification',
		'view/analytics3'], function ($, signals, hasher, crossroads, count, ballotBoxes, ballotBoxCount, ballotPaperAccount, verification, analytics) {
	
	
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
			ballotBoxCount.show("used");
		});
		
		crossroads.addRoute('unuseBallotsCount', function(){
			ballotBoxCount.show("unused");
		});

		crossroads.addRoute('verification', function(){
			verification.show("used");
		});

		crossroads.addRoute('unusedBallotsVerification', function(){
			verification.show("unused");
		});

		crossroads.addRoute('analytics', function(){
			analytics.show();
		});

		crossroads.addRoute('ballotBoxes', function() {
			ballotBoxes.show();
		});

		crossroads.addRoute('count', function() {
			count.show();
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
		hasher.setHash('analytics');
	})();
	
	return {
		getRoute : getRoute,
		setRoute : setRoute
	};
});