define(['jquery','app/model','command/findNumberInProgressCommand'], function($, model, findNumberInProgressCommand) {

	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var selectElectionExpression = 'electionData[' + selectedElection + ']';
		
		var numberInProgress = findNumberInProgressCommand.execute();
		
		var numberInProgressExpression = selectElectionExpression + '.numberInProgress';
		model.set(numberInProgressExpression, numberInProgress);				
	};
	
	return {
		execute : execute
	};
});
