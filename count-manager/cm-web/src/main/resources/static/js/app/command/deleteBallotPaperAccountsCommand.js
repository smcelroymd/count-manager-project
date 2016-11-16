define(['app/model'], function(model){
	function execute(event) {  
		var ballotPaperAccountsExpression = 'electionData[' + event.eventData.selectedElection + '].ballotPaperAccounts';	 	 
		var newObjectArray = $.mdRemove(model.get(ballotPaperAccountsExpression), event.eventData.objectsToDelete, "id");
		model.set(ballotPaperAccountsExpression, newObjectArray);
		
		var numberReceivedExpression = 'electionData[' + event.eventData.selectedElection + '].numberReceived';
		var totalNumberReceived = model.get(numberReceivedExpression);
		model.set(numberReceivedExpression, totalNumberReceived-event.eventData.objectsToDelete.length);
		
		var numberAwaitingVerificationExpression = 'electionData[' + event.eventData.selectedElection + '].numberAwaitingVerification';
		var totalNumberAwaitingVerification = model.get(numberAwaitingVerificationExpression);
		model.set(numberAwaitingVerificationExpression, totalNumberAwaitingVerification-event.eventData.objectsToDelete.length);
 };
 
 return {
  execute : execute
 };
});