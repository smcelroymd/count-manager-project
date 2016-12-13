define([ 'jquery', 'app/model' ], function($, model) {
	function execute(param) {
		
		var tmp = [];
		var result = [];		
		var selectedElection = model.get('selectedElection');
		
		var ballotBoxes = model.get('electionData[' + selectedElection + '].ballotBoxes');		
		
		$.each(ballotBoxes, function(index, ballotBox) {
			if($.inArray(ballotBox.electoralArea, tmp) === -1) {
				tmp.push(ballotBox.electoralArea);
				result.push({'electoralArea' : ballotBox.electoralArea, 'numberOfBoxes' : 1,});
			} else {
				var obj = $.grep(result, function(obj, index) {
					return (obj.electoralArea == ballotBox.electoralArea);
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