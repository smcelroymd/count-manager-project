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
		
		var numberReceivedTableData = findNumberReceivedByElectoralAreaCommand.execute();
		var numberReceivedTableDataExpression = selectElectionExpression + '.numberReceivedTableData';
		var numberReceivedChartDataExpression = selectElectionExpression + '.numberReceivedChartData';
		model.set(numberReceivedTableDataExpression, numberReceivedTableData);
		model.set(numberReceivedChartDataExpression, getAsArray(numberReceivedTableData));			
		
		var numberInProgressTableData = findNumberInProgressByElectoralAreaCommand.execute();
		var numberInProgressTableDataExpression = selectElectionExpression + '.numberInProgressTableData';
		var numberInProgressChartDataExpression = selectElectionExpression + '.numberInProgressChartData';
		model.set(numberInProgressTableDataExpression, numberInProgressTableData);
		model.set(numberInProgressChartDataExpression, getAsArray(numberInProgressTableData));			
		
		var numberAwaitingVerificationTableData = findNumberAwaitingVerificationByElectoralAreaCommand.execute();
		var numberAwaitingVerificationTableDataExpression = selectElectionExpression + '.numberAwaitingVerificationTableData';
		var numberAwaitingVerificationChartDataExpression = selectElectionExpression + '.numberAwaitingVerificationChartData';
		model.set(numberAwaitingVerificationTableDataExpression, numberAwaitingVerificationTableData);
		model.set(numberAwaitingVerificationChartDataExpression, getAsArray(numberAwaitingVerificationTableData));			

		var numberCompletedTableData = findNumberCompletedByElectoralAreaCommand.execute();
		var numberCompletedTableDataExpression = selectElectionExpression + '.numberCompletedTableData';
		var numberCompletedChartDataExpression = selectElectionExpression + '.numberCompletedChartData';
		model.set(numberCompletedTableDataExpression, numberCompletedTableData);
		model.set(numberCompletedChartDataExpression, getAsArray(numberCompletedTableData));			
	};
	
	/**
	 * Converts datatables json objects to a two-dimensional array for use in
	 * google charts
	 */
	function getAsArray(objList) {		
		var dataTable = [['Electoral Area', 'Number of Boxes']];
		$.each(objList, function(index, obj) {
			var row = [
				obj.electoralArea,
				obj.numberOfBoxes
			];
			
			dataTable.push(row);
		}); 
		
		return dataTable;
	}
	
	return {
		execute : execute
	};
});
