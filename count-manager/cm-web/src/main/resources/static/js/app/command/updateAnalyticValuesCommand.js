define(['jquery',
	    'app/model',
	    'command/findNumberInProgressCommand',
	    'command/findNumberReceivedByElectoralAreaCommand',
	    'command/findNumberInProgressByElectoralAreaCommand'], function($, model, findNumberInProgressCommand, findNumberReceivedByElectoralAreaCommand, findNumberInProgressByElectoralAreaCommand) {

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
	};
	
	return {
		execute : execute
	};
});
