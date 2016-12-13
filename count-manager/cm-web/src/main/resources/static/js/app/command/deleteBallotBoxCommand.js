define(['app/model'], function(model){
	function execute(event) {  

		var obj = event.eventData;
		var ballotBoxExpression = "electionData[" + obj.selectedElection + "].ballotBoxes";		
		
		var newObjectArray = $.mdRemove(model.get(ballotBoxExpression), event.eventData.objectsToDelete, "id");
		model.set(ballotBoxExpression, newObjectArray);
			
		model.set('refreshBallotBoxTable', new Date().getUTCMilliseconds());		
		
	};
 
	return {
		execute : execute
	};
});