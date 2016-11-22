define(['jquery','app/model', 'command/isVerifiedCommand', 'underscore'], function($, model, isVerifiedCommand) {

	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var boxesInProgress = [];
		
//		var electoralAreaExpression = "electionData[" + obj.selectedElection + "].ballotBoxCount." + obj.electoralArea;
//		var selectBoxExpression = electoralAreaExpression + "." + obj.ballotBoxNumber;
		
		$.each(model.get('electionData'), function(electionId, electionDataObj) {
			$.each(electionDataObj.ballotBoxCount, function(electoralArea, ballotBoxArray) {//countobjct array
				var ballotBoxNumbers = []; 
				$.each(ballotBoxArray, function(ballotBoxNumber, countObjArray) {
					$.each(countObjArray, function(index, countObj) {
						if(!isVerifiedCommand.execute(countObj)) {
							ballotBoxNumbers.push(countObj.ballotBoxNumber);							
						}
					});
				});				
				$.merge(boxesInProgress, _.uniq(ballotBoxNumbers));
			})
		});
		
		return boxesInProgress.length;
	};
	
	return {
		execute : execute
	};
});
