define([ 'app/model' ], function(model) {
	
	function execute(event) {
			
		var selectedElection = model.get('selectedElection');		
		var verificationData = model.get('electionData[' + selectedElection + '].verificationData');	

		var total = 0;
		$.each(verificationData, function(index, verificationObj) {
			if((verificationObj.electoralArea === event.eventData.electoralArea) && (verificationObj.verified === true)) {
				if( verificationObj.countType === "used" ) {
					total += verificationObj.bpaCount;
				}
			}
		});
		
		model.set('totalBallotPapersInBoxes',total);
	}
		
	return {
		execute : execute
	};
});
