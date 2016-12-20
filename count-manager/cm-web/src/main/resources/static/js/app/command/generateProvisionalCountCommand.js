define([ 'app/model','command/findCandidatesCommand' ], function(model, findCandidatesCommands) {
	
	function execute(event) {
					
		var selectedElection = model.get('selectedElection');	
		var electionData = model.get('electionData[' + selectedElection + ']');
		var electoralArea = model.get('countElectoralArea');	
		var totalBallotPapers = model.get('totalBallotPapersInBoxes');
		var modelCandidates = $.mdGrep(electionData.candidates, {"electoralArea" : electoralArea}, "electoralArea");
		
		var candidates = [];		
		var rejectedPapers = [];
		
		$.each(modelCandidates, function( index, obj ) {
			if(obj.surname  === "REJECTED PAPERS") {
				rejectedPapers = obj.votes;
			} else {
				candidates.push({"firstName" : obj.firstName,"surname" : obj.surname,"votes" : obj.votes});				
			}
		});		
		
		var provisionalCountData = {
			"electionTitle": electionData.name,
			"electoralArea": electoralArea,
			"totalBallotPapers": totalBallotPapers,
			"totalEligibleElectors": 130,
			"candidates": candidates,
			"rejectedPapers": rejectedPapers
		}		
		
		var json = JSON.stringify(provisionalCountData);
		$('#reportForm').empty();
		$('<input type="hidden" name="provisionalResult"/>').val(json).appendTo('#reportForm');
		$("#reportForm").submit();
	}
		
	return {
		execute : execute
	};
});
