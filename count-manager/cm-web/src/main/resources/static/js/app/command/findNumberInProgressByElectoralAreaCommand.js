define(['jquery','app/model', 'command/isVerifiedCommand', 'underscore'], function($, model, isVerifiedCommand) {

	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var tmp = [];
		var result = []; //{electoralArea, numberOfBoxes}
		var boxesInProgress = [];
		
		var electionDataObj = model.get('electionData[' + selectedElection + "]");
		
		$.each(electionDataObj.ballotBoxCount, function(index, countObj) {
			
			var isVerified = isVerifiedCommand.execute(countObj);
							
			if(isVerified === false) {					
				var boxIdentifier = countObj.electoralArea + "_" + countObj.ballotBoxNumber;
						
				if($.inArray(boxIdentifier, tmp) === -1) {
					tmp.push(boxIdentifier);
					
					var objArray = $.grep(result, function(obj, index) {
						return (obj.electoralArea == countObj.electoralArea);
					});
					
					if(objArray.length === 0) {
						result.push({'electoralArea' : countObj.electoralArea, 'numberOfBoxes' : 1});
					} else {
						objArray[0].numberOfBoxes++;	
					}						
				} 					
			}			
		})		
		
		return result;
	};
	
	return {
		execute : execute
	};
});
