define([ 'app/model' ], function(model) {
	function execute(event) {
		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);
		/**
		 * Add row to table
		 */
		var ballotPaperAccountsExpression = 'electionData[' + obj.selectedElection + '].ballotPaperAccounts';
		model.getRactive().push(ballotPaperAccountsExpression, obj);	

		/**
		 * Update number received
		 */
//		var numberReceivedExpression = 'electionData[' + event.eventData.selectedElection + '].numberReceived';
//		var totalNumberReceived = model.get(numberReceivedExpression);
//		model.set(numberReceivedExpression, totalNumberReceived+1);					
	}

	return {
		execute : execute
	};
});