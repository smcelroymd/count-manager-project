define(['text!view/analytics.html',
		'util/viewResolver',
		'util/eventHandler'], function (view, viewResolver, eventHandler) {
	
	function initialise() {
		/**
		 * Show the view
		 */
		viewResolver.show(view);	
		
		/**
		 * Add functionality
		 */
		$('#exampleBtn').off('click').on('click', function() {
			eventHandler.trigger({
				'type' : 'exampleEvent'
			});
		});
	}
	
	return {
		show : initialise
	};
});
