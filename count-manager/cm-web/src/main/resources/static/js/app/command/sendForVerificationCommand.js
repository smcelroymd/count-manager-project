define([ 'app/model','command/findBallotPaperAccountCommand' ], function(model, findBallotPaperAccountCommand) {
	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var obj = event.eventData;
		var ballotPaperAccount = findBallotPaperAccountCommand.execute({'electoralArea': obj.electoralArea, 'ballotBoxNumber' : obj.ballotBoxNumber});	
		
		var verificationObj = {
				"id" : new Date().getUTCMilliseconds(),
				"pollingStation" : ballotPaperAccount.pollingStation,
				"ballotBoxNumber" : obj.ballotBoxNumber,
				"bpaCount" : totalBallotPapersIssuedAndNotSpoilt(obj, ballotPaperAccount),
				"count" : obj.count,
				"verified" : false
		}
		
		model.getRactive().push('electionData[' + selectedElection +  '].verificationData', verificationObj);
	}

	function totalBallotPapersIssuedAndNotSpoilt(obj, ballotPaperAccount) {
		return ((ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber) - ballotPaperAccount.totalOrdinarySpoiltReplacement);
	} 

	return {
		execute : execute
	};
});