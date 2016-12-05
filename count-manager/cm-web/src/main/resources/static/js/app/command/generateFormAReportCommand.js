define([ 'app/model' ], function(model) {
	
	function execute(event) {
			
		var selectedElection = model.get('selectedElection');		
		var verificationData = model.get('electionData[' + selectedElection + '].verificationData');	
		var ballotPaperAccounts = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');	
		
		var formAData = {
				"name" : event.eventData.electoralArea,
				"ballotBoxes" : [{
					"number" : "Postal 1",
					"pollingStation" : "",
					"ballotPaperAccountValue" : 0,
					"boxValue" : 0					
				},{
					"number" : "Postal 2",
					"pollingStation" : "",
					"ballotPaperAccountValue" : 0,
					"boxValue" : 0					
				},{
					"number" : "Postal 3",
					"pollingStation" : "",
					"ballotPaperAccountValue" : 0,
					"boxValue" : 0					
				}]
		};
		
		$.each(verificationData, function(index, verificationObj) {

			if((verificationObj.electoralArea === event.eventData.electoralArea) && (verificationObj.verified === true)) {
				var ballotBox = {
						"number" : verificationObj.ballotBoxNumber,
						"pollingStation" : verificationObj.pollingStation,
						"ballotPaperAccountValue" : verificationObj.countType === "used"  ? verificationObj.bpaCount : verificationObj.bpaUnusedCount,
						"boxValue" : verificationObj.count
				};

				formAData.ballotBoxes.push(ballotBox);
			}
		});
		
		var json = JSON.stringify(formAData);
		$('#reportForm').empty();
		$('<input type="hidden" name="electoralArea"/>').val(json).appendTo('#reportForm');
		$("#reportForm").submit();
	}
		
	return {
		execute : execute
	};
});
