define([ 'app/model','command/findBallotPaperAccountCommand'], function(model, findBallotPaperAccountCommand) {

	function execute(event) {

		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);

		var ballotPaperAccount = findBallotPaperAccountCommand.execute({'electoralArea': obj.electoralArea, 'ballotBoxNumber' : obj.ballotBoxNumber});
		obj.matchesBpa = matchesBpa(ballotPaperAccount, obj);
		obj.unusedMatchesBpa = unusedMatchesBpa(ballotPaperAccount, obj);
		
		var ballotBoxCountExpression = "electionData[" + obj.selectedElection + "].ballotBoxCount";		
		model.getRactive().push(ballotBoxCountExpression, obj);		
		model.set('refreshBallotBoxCountTable', new Date().getUTCMilliseconds());
	};
	
	function matchesBpa(ballotPaperAccount, obj) {
		return (parseInt(obj.count) === parseInt(totalBallotPapersIssuedAndNotSpoilt(ballotPaperAccount)));
	}
	
	function totalBallotPapersIssuedAndNotSpoilt(ballotPaperAccount) {
		return ((ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber) - ballotPaperAccount.totalOrdinarySpoiltReplacement);
	} 
		
	function unusedMatchesBpa(ballotPaperAccount, obj) {
		return (parseInt(obj.count) === parseInt(totalBallotPapersUnused(ballotPaperAccount)));
	}
	
	function totalBallotPapersUnused(ballotPaperAccount) {
		return (ballotPaperAccount.totalOrdinaryBallots - (ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber));
	} 
	
	return {
		execute : execute
	};
});
