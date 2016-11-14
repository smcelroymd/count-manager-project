define(['app/model'], function(model){
	function execute(event) {     
		  var objIndex = $.mdInArray(event.eventData, model.get('ballotPaperAccount.data'), "id");
		  if(objIndex !== -1) {  
			  model.set('ballotPaperAccount.data[' + objIndex + ']', event.eventData);
		  }
		 };
	
	return {
		execute : execute
	};
});