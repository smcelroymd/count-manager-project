define([ 'app/model' ], function(model) {
	function execute(event) {
		/**
		 * Add row to table
		 */
		event.eventData["id"]=new Date().getUTCMilliseconds();
		var ballotPaperAccountsExpression = 'electionData[' + event.eventData.selectedElection + '].ballotPaperAccounts';
		model.getRactive().push(ballotPaperAccountsExpression, event.eventData);	

		/**
		 * Update number received
		 */
		var numberReceivedExpression = 'electionData[' + event.eventData.selectedElection + '].numberReceived';
		var totalNumberReceived = model.get(numberReceivedExpression);
		model.set(numberReceivedExpression, totalNumberReceived+1);
		
		/**
		 * Update number awaiting verification
		 */
		var numberAwaitingVerificationExpression = 'electionData[' + event.eventData.selectedElection + '].numberAwaitingVerification';
		var totalNumberAwaitingVerification = model.get(numberAwaitingVerificationExpression);
		model.set(numberAwaitingVerificationExpression, totalNumberAwaitingVerification+1);				
	}

	return {
		execute : execute
	};
});