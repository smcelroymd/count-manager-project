define(['jquery','app/model','underscore'], function($, model) {

	//count object
//	'update' : false,
//	'electoralArea' : model.get('ballotBoxCountScreenElectoralArea'),
//	'ballotBoxNumber' : model.get('ballotBoxCountScreenBallotBoxNumber'),
//	'selectedElection' : model.get('selectedElection'),
//	'count' : '',
//	'matchesBpa' : false,
//	'sentForVerification' : false,
//	'verified' : false
	
//verification object
	
//	var verificationObj = {
//			"id" : new Date().getUTCMilliseconds(),
//			"pollingStation" : ballotPaperAccount.pollingStation,
//			"ballotBoxNumber" : obj.ballotBoxNumber,
//			"electoralArea" : ballotPaperAccount.electoralArea,
//			"bpaCount" : totalBallotPapersIssuedAndNotSpoilt(obj, ballotPaperAccount),
//			"count" : obj.count,
//			"verified" : false
//	}
	
	
	function execute(param) {
		var selectedElection = model.get('selectedElection');
		
		var result = false;
		
		$.each(model.get('electionData'), function(electionId, electionDataObj) {			
			$.each(electionDataObj.verificationData, function(index, obj) {
				if((param.electoralArea === obj.electoralArea) && (param.ballotBoxNumber === obj.ballotBoxNumber) && (obj.verified === true)) {
					result = true;
					return false;
				}
			});
		});
		
		return result;
	};
	
	return {
		execute : execute
	};
});
