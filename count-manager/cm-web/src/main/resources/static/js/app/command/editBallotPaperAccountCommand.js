define(['app/model'], function(model){
	function execute(event) {     
		var ballotPaperAccountsExpression = 'electionData[' + event.eventData.selectedElection + '].ballotPaperAccounts';
		var objIndex = $.mdInArray(event.eventData, model.get(ballotPaperAccountsExpression), "id");
		
		if(objIndex !== -1) {  
			ballotPaperAccountsExpression = 'electionData[' + event.eventData.selectedElection + '].ballotPaperAccounts[' + objIndex + ']';
			model.set(ballotPaperAccountsExpression, event.eventData);
		}
	};
	
	return {
		execute : execute
	};
});