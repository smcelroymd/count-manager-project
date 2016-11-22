define(['jquery','app/model', 'command/isVerifiedCommand', 'underscore'], function($, model, isVerifiedCommand) {

	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var tmp = [];
		var result = []; //{electoralArea, numberOfBoxes}
		var boxesInProgress = [];
		
		$.each(model.get('electionData'), function(electionId, electionDataObj) {
			$.each(electionDataObj.ballotBoxCount, function(electoralArea, ballotBoxArray) {//countobjct array
				$.each(ballotBoxArray, function(ballotBoxNumber, countObjArray) {
					var isVerified = false;
					var electoralArea = null;

					$.each(countObjArray, function(index, countObj) {
						isVerified = isVerifiedCommand.execute(countObj);
						electoralArea = countObj.electoralArea;
						
						if(isVerified === true) {
							//break out of the loop
							return false;
						}
					});
					
					if(isVerified === false) {
						if($.inArray(electoralArea, tmp) === -1) {
							tmp.push(electoralArea);
							result.push({'electoralArea' : electoralArea, 'numberOfBoxes' : 1,});
						} else {
							var obj = $.grep(result, function(obj, index) {
								return (obj.electoralArea == electoralArea);
							});
							obj[0].numberOfBoxes++;
						}					
					}					
				});				
			})
		});
		
		return result;
	};
	
	return {
		execute : execute
	};
});
