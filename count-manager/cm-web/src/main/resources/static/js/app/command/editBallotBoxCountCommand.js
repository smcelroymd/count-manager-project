define(['app/model','command/findBallotPaperAccountCommand'], function(model, findBallotPaperAccountCommand){
	function execute(event) {     

		var obj = event.eventData;
		obj.matchesBpa = matchesBpa(obj);
		
		var electoralAreaExpression = 'electionData[' + obj.selectedElection + '].ballotBoxCount[' +  obj.electoralArea + ']';
		var ballotBoxesExpression = electoralAreaExpression + '[' + obj.ballotBoxNumber + ']';

		var objIndex = $.mdInArray(event.eventData, model.get(ballotBoxesExpression), "id");
		
		if(objIndex !== -1) {  
			ballotBoxExpression = ballotBoxesExpression + '[' + objIndex + ']';
			model.set(ballotBoxExpression, event.eventData);
		}	
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