define([ 'app/model' ], function(model) {
	function execute(param) {
		var electoralArea = param.electoralArea;
		var selectedElection = model.get('selectedElection');		
		var allCandidates = model.get('electionData[' + selectedElection + '].candidates');				
		return $.mdGrep(allCandidates, {"electoralArea" : electoralArea}, "electoralArea");
	}

	return {
		execute : execute
	};
});