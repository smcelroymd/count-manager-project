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
	}
		
	return {
		execute : execute
	};
});