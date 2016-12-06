define(['app/model'], function(model){
	function execute(event) {  

		var obj = event.eventData;
		var ballotBoxCountExpression = "electionData[" + obj.selectedElection + "].ballotBoxCount";		
		
		var newObjectArray = $.mdRemove(model.get(ballotBoxCountExpression), event.eventData.objectsToDelete, "id");
		model.set(ballotBoxCountExpression, newObjectArray);
			
		model.set('refreshBallotBoxCountTable', new Date().getUTCMilliseconds());		
		
	};
 
	return {
		execute : execute
	};
});