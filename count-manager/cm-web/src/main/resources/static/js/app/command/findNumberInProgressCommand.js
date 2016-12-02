define(['jquery','app/model', 'command/isVerifiedCommand', 'underscore'], function($, model, isVerifiedCommand) {

	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var boxesInProgress = [];

		var electionDataObj = model.get('electionData[' + selectedElection + "]");
		var ballotBoxNumbers = []; 
		$.each(electionDataObj.ballotBoxCount, function(index, countObj) {//countobjct array	
			if((!isVerifiedCommand.execute(countObj)) && (countObj.countType === "used")) {
				ballotBoxNumbers.push(countObj.electoralArea + "_" + countObj.ballotBoxNumber);							
			}
		})
		$.merge(boxesInProgress, _.uniq(ballotBoxNumbers));
		
		return boxesInProgress.length;
	};
	
	return {
		execute : execute
	};
});
