define(['app/model'], function(model){
	function execute(event) {  

		var obj = event.eventData;
		var electoralAreaExpression = 'electionData[' + obj.selectedElection + '].ballotBoxCount[' +  obj.electoralArea + ']';
		var ballotBoxesExpression = electoralAreaExpression + '[' + obj.ballotBoxNumber + ']';

		var newObjectArray = $.mdRemove(model.get(ballotBoxesExpression), event.eventData.objectsToDelete, "id");
		model.set(ballotBoxesExpression, newObjectArray);
			
		model.set('refreshBallotBoxCountTable', new Date().getUTCMilliseconds());		
		
	};
 
	return {
		execute : execute
	};
});