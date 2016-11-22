define([ 'jquery', 'app/model' ], function($, model) {
	function execute(param) {
		
		var tmp = [];
		var result = [];		
		var selectedElection = model.get('selectedElection');
		
		var ballotPaperAccounts = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');		
		
		$.each(ballotPaperAccounts, function(index, ballotPaperAccount) {
			if($.inArray(ballotPaperAccount.electoralArea, tmp) === -1) {
				tmp.push(ballotPaperAccount.electoralArea);
				result.push({'electoralArea' : ballotPaperAccount.electoralArea, 'numberOfBoxes' : 1,});
			} else {
				var obj = $.grep(result, function(obj, index) {
					return (obj.electoralArea == ballotPaperAccount.electoralArea);
				});
				obj[0].numberOfBoxes++;
			}
		});

		return result;
	}

	return {
		execute : execute
	};
});