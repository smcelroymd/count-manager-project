define(['jquery','app/model','underscore'], function($, model) {
	
	function execute(event) {
		var electoralArea = event.eventData.electoralArea;
		var selectedElection = model.get('selectedElection');		
		var allCandidates = model.get('electionData[' + selectedElection + '].candidates');				
		var candidates = $.mdGrep(allCandidates, {"electoralArea" : electoralArea}, "electoralArea");
				
		$.each(event.eventData.candidates, function(index, candidateVoteObj) {
			$.each(candidates, function(index, candidateObj) {
				if((candidateVoteObj.electoralArea === candidateObj.electoralArea) &&
				   (candidateVoteObj.firstName === candidateObj.firstName) &&
				   (candidateVoteObj.surname === candidateObj.surname)) {
					candidateObj.votes.push(candidateVoteObj.votes);
				}		
			});
		});
		
		model.set('refreshResultsTable', new Date().getUTCMilliseconds());	
	};
	
	return {
		execute : execute
	};
});
