define([ 'app/model','command/findBallotPaperAccountCommand'], function(model, findBallotPaperAccountCommand) {

	function execute(event) {

		var selectedElection = model.get('selectedElection');
		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);

		var ballotBoxesExpression = "electionData[" + obj.selectedElection + "].ballotBoxes";		
		model.getRactive().push(ballotBoxesExpression, obj);		
		
		/**
		 * Update number received
		 */
		var numberReceivedExpression = 'electionData[' + selectedElection + '].numberReceived';
		var totalNumberReceived = model.get(numberReceivedExpression);
		model.set(numberReceivedExpression, totalNumberReceived+1);					
		
		model.set('refreshBallotBoxTable', new Date().getUTCMilliseconds());
	};

	return {
		execute : execute
	};
});
