define([ 'app/model','command/findBallotPaperAccountCommand' ], function(model, findBallotPaperAccountCommand) {
	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var obj = event.eventData;
		var ballotPaperAccount = findBallotPaperAccountCommand.execute({'electoralArea': obj.electoralArea, 'ballotBoxNumber' : obj.ballotBoxNumber});	
		
		var verificationObj = {
				"id" : new Date().getUTCMilliseconds(),
				"pollingStation" : ballotPaperAccount.pollingStation,
				"ballotBoxNumber" : obj.ballotBoxNumber,
				"electoralArea" : ballotPaperAccount.electoralArea,
				"bpaCount" : totalBallotPapersIssuedAndNotSpoilt(obj, ballotPaperAccount),
				"bpaUnusedCount" : totalBallotPapersUnused(ballotPaperAccount),
				"count" : obj.count,
				"verified" : false,
				"countType" : obj.countType
		}
		
		model.getRactive().push('electionData[' + selectedElection +  '].verificationData', verificationObj);
				
		/**
		 * Update number awaiting verification
		 */
		if(verificationObj.countType === "used") {
			var numberAwaitingVerificationExpression = 'electionData[' + selectedElection + '].numberAwaitingVerification';
			var totalNumberAwaitingVerification = model.get(numberAwaitingVerificationExpression);
			model.set(numberAwaitingVerificationExpression, totalNumberAwaitingVerification+1);				
		}
	}

	function totalBallotPapersIssuedAndNotSpoilt(obj, ballotPaperAccount) {
		return ((ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber) - ballotPaperAccount.totalOrdinarySpoiltReplacement);
	} 

	function totalBallotPapersUnused(ballotPaperAccount) {
		return (ballotPaperAccount.totalOrdinaryBallots - (ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber));
	}
	
	return {
		execute : execute
	};
});