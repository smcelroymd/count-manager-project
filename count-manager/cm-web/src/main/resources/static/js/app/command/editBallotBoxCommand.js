define(['app/model'], function(model){
	function execute(event) {  

		var obj = event.eventData;
		var ballotBoxExpression = "electionData[" + obj.selectedElection + "].ballotBoxes";		
		
		var selectedObjects = $.mdGrep(model.get(ballotBoxExpression), obj, "id");
		
		if(selectedObjects.length > 0) {
			var ballotBox = selectedObjects[0];
			ballotBox.ballotBoxNumber = obj.ballotBoxNumber;
			ballotBox.electoralArea = obj.electoralArea;
			ballotBox.dateReceived = obj.dateReceived;
		}

		model.set('refreshBallotBoxTable', new Date().getUTCMilliseconds());		
		
	};
 
	return {
		execute : execute
	};
});