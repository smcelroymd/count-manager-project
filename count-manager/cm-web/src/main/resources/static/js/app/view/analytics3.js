define(['text!view/analytics3.html',
		'util/viewResolver',
		'util/eventHandler',
		'command/updateAnalyticValuesCommand'], function (view, viewResolver, eventHandler, updateAnalyticValuesCommand) {
	
	function onComplete() {
		
		/**
		 * 
		 */
		eventHandler.trigger({'type' : 'updateAnalyticValuesEvent', 'eventData' : {}});
		
		/**
		 * Add functionality
		 */
		$('#exampleBtn').off('click').on('click', function() {
			eventHandler.trigger({
				'type' : 'exampleEvent'
			});
		});		
	}
	
	function initialise() {
				
		/**
		 * Show the view
		 */				
		viewResolver.show(view, onComplete);	
	}
	
	return {
		show : initialise
	};
});
