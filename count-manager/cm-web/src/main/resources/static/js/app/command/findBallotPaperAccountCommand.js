define([ 'app/model' ], function(model) {
	function execute(param) {
		var electoralArea = param.electoralArea;
		var ballotBoxNumber = param.ballotBoxNumber;
		var selectedElection = model.get('selectedElection');
		
		var ballotPaperAccounts = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');		
		
		var ballotPaperAccounts = $.grep(ballotPaperAccounts, function(ballotPaperAccount, index) {
			return ((ballotPaperAccount.electoralArea == electoralArea) && (ballotPaperAccount.ballotBoxNumber == ballotBoxNumber));
		});

		return ballotPaperAccounts[0];
	}

	return {
		execute : execute
	};
});