define(['app/model'], function(model){
	function execute(event) {  
		console.log("Delete Command");
		var newObjectArray = $.mdRemove(model.get('verificationCount.tableData'), event.objectsToDelete, "countID");
		model.set('verificationCount.tableData', newObjectArray);
	};
 
	return {
		execute : execute
	};
});