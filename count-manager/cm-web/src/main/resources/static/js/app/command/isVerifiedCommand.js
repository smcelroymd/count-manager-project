define(['jquery','app/model','underscore'], function($, model) {
	
	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var result = false;
		
		$.each(model.get('electionData'), function(electionId, electionDataObj) {			
			$.each(electionDataObj.verificationData, function(index, obj) {
				if((param.electoralArea === obj.electoralArea) && (param.ballotBoxNumber === obj.ballotBoxNumber) && (obj.verified === true)) {
					result = true;
					return false;
				}
			});
		});
		
		return result;
	};
	
	return {
		execute : execute
	};
});
