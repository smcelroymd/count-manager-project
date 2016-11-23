define(['jquery',
	    'app/model',
	    'command/findNumberInProgressCommand',
	    'command/findNumberReceivedByElectoralAreaCommand',
	    'command/findNumberInProgressByElectoralAreaCommand',
	    'command/findNumberAwaitingVerificationByElectoralAreaCommand',
	    'command/findNumberCompletedByElectoralAreaCommand'], function($, model, findNumberInProgressCommand, findNumberReceivedByElectoralAreaCommand, findNumberInProgressByElectoralAreaCommand, findNumberAwaitingVerificationByElectoralAreaCommand, findNumberCompletedByElectoralAreaCommand) {

	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var selectElectionExpression = 'electionData[' + selectedElection + ']';
		
		var numberInProgress = findNumberInProgressCommand.execute();		
		var numberInProgressExpression = selectElectionExpression + '.numberInProgress';
		model.set(numberInProgressExpression, numberInProgress);			
		
		var numberReceivedByElectoralArea = findNumberReceivedByElectoralAreaCommand.execute();
		var numberReceivedByElectoralAreaExpression = selectElectionExpression + '.numberReceivedByElectoralArea';
		model.set(numberReceivedByElectoralAreaExpression, numberReceivedByElectoralArea);
		
		var numberInProgressByElectoralArea = findNumberInProgressByElectoralAreaCommand.execute();
		var numberInProgressByElectoralAreaExpression = selectElectionExpression + '.numberInProgressByElectoralArea';
		model.set(numberInProgressByElectoralAreaExpression, numberInProgressByElectoralArea);
		
		var numberAwaitingVerificationByElectoralArea = findNumberAwaitingVerificationByElectoralAreaCommand.execute();
		var numberAwaitingVerificationByElectoralAreaExpression = selectElectionExpression + '.numberAwaitingVerificationByElectoralArea';
		model.set(numberAwaitingVerificationByElectoralAreaExpression, numberAwaitingVerificationByElectoralArea);

		var numberCompletedByElectoralArea = findNumberCompletedByElectoralAreaCommand.execute();
		var numberCompletedByElectoralAreaExpression = selectElectionExpression + '.numberCompletedByElectoralArea';
		model.set(numberCompletedByElectoralAreaExpression, numberCompletedByElectoralArea);

	};
	
	return {
		execute : execute
	};
});
