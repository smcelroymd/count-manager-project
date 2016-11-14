define(['app/model',
        'service/ajaxService'], function(model, ajaxService){
	function execute(event) {	
		console.log(event.eventData);
		var data = event.eventData;
		}
	
	return {
		execute : execute
	};
});