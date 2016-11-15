define([ 'app/model' ], function(model) {
	function execute(event) {
		event.eventData["id"]=new Date().getUTCMilliseconds();
		var ballotPaperAccountsExpression = 'electionData[' + event.eventData.selectedElection + '].ballotPaperAccounts';
		model.getRactive().push(ballotPaperAccountsExpression, event.eventData);	

		var numberReceivedExpression = 'electionData[' + event.eventData.selectedElection + '].numberReceived';
		var totalNumberReceived = model.get(numberReceivedExpression);
		model.set(numberReceivedExpression, totalNumberReceived+1);
	}

	return {
		execute : execute
	};
});