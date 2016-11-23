define([ 'jquery', 'app/model' ], function($, model) {
	function execute(param) {
		
		var tmp = [];
		var result = [];		
		var selectedElection = model.get('selectedElection');
		
		var verificationData = model.get('electionData[' + selectedElection + '].verificationData');		
		
		$.each(verificationData, function(index, verificationObj) {
			if(verificationObj.verified === false) {
				if($.inArray(verificationObj.electoralArea, tmp) === -1) {
					tmp.push(verificationObj.electoralArea);
					result.push({'electoralArea' : verificationObj.electoralArea, 'numberOfBoxes' : 1,});
				} else {
					var obj = $.grep(result, function(obj, index) {
						return (obj.electoralArea == verificationObj.electoralArea);
					});
					obj[0].numberOfBoxes++;
				}				
			}
		});

		return result;
	}

	return {
		execute : execute
	};
});