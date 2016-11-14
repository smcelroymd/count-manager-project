define(['app/model'], function(model){
	function execute(event) {     
		console.log("Edit Command");
		var objIndex = $.mdInArray(event.eventData, model.get('verificationCount.tableData'), "id");
		if(objIndex !== -1) {  
			model.set('verificationCount.tableData[' + objIndex + ']', event.eventData);
		}
	};
   
   return {
	   execute : execute
   };
});