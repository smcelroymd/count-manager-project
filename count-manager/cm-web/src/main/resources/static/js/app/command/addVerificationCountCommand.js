define(['app/model'], function(model, ajaxService){
	function execute(event) {

		var obj = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);
		
		var electoralAreaExpression = 'electionData[' + obj.selectedElection + '].verificationCount[' +  obj.electoralArea + ']';
		var selectBoxExpression = electoralAreaExpression + '[' + obj.ballotBoxNumber + ']';
		
		if(model.get(selectBoxExpression) === undefined) {
			model.set(selectBoxExpression, []);
		}
				
		model.getRactive().push(selectBoxExpression, obj);		
		model.set('refreshVerificationCountTable', new Date().getUTCMilliseconds());
				
		var ballotPaperAccountsExpression = 'electionData[' + obj.slectedElection + '].ballotPaperAccounts';
		model.get();
	};
	
	return {
		execute : execute
	};
});
