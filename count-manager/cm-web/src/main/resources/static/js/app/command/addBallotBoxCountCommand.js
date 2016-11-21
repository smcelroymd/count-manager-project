define([ 'app/model','command/findBallotPaperAccountCommand'], function(model, findBallotPaperAccountCommand) {

	function execute(event) {

		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);
		obj.matchesBpa = matchesBpa(obj);
		
		var electoralAreaExpression = "electionData[" + obj.selectedElection + "].ballotBoxCount." + obj.electoralArea;
		var selectBoxExpression = electoralAreaExpression + "." + obj.ballotBoxNumber;
		
		if(model.get(selectBoxExpression) === undefined) {
			var electoralArea = model.get(electoralAreaExpression);
			electoralArea[obj.ballotBoxNumber] = [];
			model.set(electoralAreaExpression, electoralArea);
		}
		
		model.getRactive().push(selectBoxExpression, obj);		
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
