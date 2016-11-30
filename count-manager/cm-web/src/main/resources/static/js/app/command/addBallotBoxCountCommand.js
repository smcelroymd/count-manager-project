define([ 'app/model','command/findBallotPaperAccountCommand'], function(model, findBallotPaperAccountCommand) {

	function execute(event) {

		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);
		obj.matchesBpa = matchesBpa(obj);
		
		var ballotBoxCountExpression = "electionData[" + obj.selectedElection + "].ballotBoxCount";		
		model.getRactive().push(ballotBoxCountExpression, obj);		
		model.set('refreshBallotBoxCountTable', new Date().getUTCMilliseconds());
	};
	
	function matchesBpa(obj) {
		var ballotPaperAccount = findBallotPaperAccountCommand.execute({'electoralArea': obj.electoralArea, 'ballotBoxNumber' : obj.ballotBoxNumber});
		return (parseInt(obj.count) === parseInt(totalBallotPapersIssuedAndNotSpoilt(ballotPaperAccount)));
	}
	
	function totalBallotPapersIssuedAndNotSpoilt(ballotPaperAccount) {
		return ((ballotPaperAccount.nextSerialNumber - ballotPaperAccount.firstSerialNumber) - ballotPaperAccount.totalOrdinarySpoiltReplacement);
	} 
	
	return {
		execute : execute
	};
});
