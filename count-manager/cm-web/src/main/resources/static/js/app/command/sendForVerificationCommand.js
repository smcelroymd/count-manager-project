define([ 'app/model','command/findBallotPaperAccountCommand' ], function(model, findBallotPaperAccountCommand) {
	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var obj = event.eventData;
		
		var verificationObj = {
				"pollingStation" : "dummy",
				"ballotBoxNumber" : obj.ballotBoxNumber,
				"bpaCount" : totalBallotPapersIssuedAndNotSpoilt(obj),
				"count" : obj.count,
				"verified" : false
		}
		
		model.getRactive().push('electionData[' + selectedElection +  '].verificationData', verificationObj);
	}

	function totalBallotPapersIssuedAndNotSpoilt(obj) {
		var ballotPaperAccount = findBallotPaperAccountCommand.execute({'electoralArea': obj.electoralArea, 'ballotBoxNumber' : obj.ballotBoxNumber});		
		return ((ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber) - ballotPaperAccount.totalOrdinarySpoiltReplacement);
	} 

	return {
		execute : execute
	};
});