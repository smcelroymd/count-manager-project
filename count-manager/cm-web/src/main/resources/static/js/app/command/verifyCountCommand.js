define([ 'app/model' ], function(model) {
	
	function execute(event) {
		var selectedElection = model.get('selectedElection');
		var countExpression = 'electionData[' + selectedElection +  '].verificationData';
		var objIndex = $.mdInArray(event.eventData, model.get(countExpression), "id");
		
		if(objIndex !== -1) {  
			countExpression = 'electionData[' + selectedElection +  '].verificationData[' + objIndex + ']';
			model.set(countExpression, event.eventData);
		}
						
		model.set('refreshVerificationTable', new Date().getUTCMilliseconds());		
		
		if(event.eventData.countType === "used") {
			/**
			 * Update number awaiting verification
			 */
			var numberAwaitingVerificationExpression = 'electionData[' + selectedElection + '].numberAwaitingVerification';
			var totalNumberAwaitingVerification = model.get(numberAwaitingVerificationExpression);
			model.set(numberAwaitingVerificationExpression, totalNumberAwaitingVerification-1);		
			
			/**
			 * Update number complete
			 */
			var numberInProgressExpression = 'electionData[' + selectedElection + '].numberCompleted';
			var totalNumberInProgress = model.get(numberInProgressExpression);
			model.set(numberInProgressExpression, totalNumberInProgress+1);
		}
	}
		
	return {
		execute : execute
	};
});