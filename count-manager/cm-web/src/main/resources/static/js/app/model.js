define([], function(){

	var self = this;
	var ractive = null;
	
   	function setRactive(ractive) {
   		self.ractive = ractive;
   	}
   	
   	function getRactive() {
   		return self.ractive;
   	} 
	
   	function set(keypath, value) {
   		self.ractive.set(keypath, value);
   	}
   	
   	function get(keypath) {
   		return self.ractive.get(keypath);
   	}
   	
	return {
		'data' : {
			'message' : '',
			'selectedElection' : 1,
			'refreshBallotBoxCountTable' : 1,
			'refreshVerificationTable' : 1,
			'elections' : [
				{
					'id' : 1,
					'name' : 'Election 1'
				}, 
				{
					'id' : 2,
					'name' : 'Election 2',	
				}, 
				{
					'id' : 3,
					'name' : 'Election 3'					
				}],
			'electionData' : {
				'1' : {
					'numberOfBallotBoxes' : 100,
					'numberReceived' : 0,
					'numberInProgress' : 0,
					'numberCompleted' : 0,
					'numberAwaitingVerification' : 0,
					'electoralAreaBoxNumbers' : [
						{
							'electoralArea' : 'Aldershot',
							'numberOfBoxes' : 23
						},
						{
							'electoralArea' : 'Basingstoke',
							'numberOfBoxes' : 47
						},
						{
							'electoralArea' : 'Eastleigh',
							'numberOfBoxes' : 30
						}
					 ],					
					'electoralAreas' :[
						'Aldershot',
						'Basingstoke',
						'Eastleigh'],
					'pollingStations' : {
						'Aldershot' : ['PS1','PS2'],
						'Basingstoke' : ['PS3','PS4'],
						'Eastleigh' : ['PS5','PS6']						
					},
					'ballotPaperAccounts' : [],
					'ballotBoxCount' : {
						'Aldershot' : {},
						'Basingstoke' : {},
						'Eastleigh' : {}
					},
					'verificationData' : []	
				},
				'2' : {
					'numberOfBallotBoxes' : 200,
					'numberReceived' : 0,
					'numberInProgress' : 0,
					'numberCompleted' : 0,
					'numberAwaitingVerification' : 0,
					'electoralAreas' :[
						'Aldridge-Brownhills',
						'Edgbaston',
						'Yardley'],
					'pollingStations' : {
							'Aldershot' : ['PS1','PS2'],
							'Basingstoke' : ['PS3','PS4'],
							'Eastleigh' : ['PS5','PS6']						
						},						
					'ballotPaperAccounts' : [],
					'ballotBoxCount' : {
						'Aldridge-Brownhills' : {},
						'Edgbaston' : {},
						'Yardley' : {}
					},
					'verificationData' : []
				},
				'3' : {
					'numberOfBallotBoxes' : 300,
					'numberReceived' : 0,
					'numberInProgress' : 0,
					'numberCompleted' : 0,
					'numberAwaitingVerification' : 0,
					'electoralAreas' :[
						'Altrincham and Sale West',
						'Ashton-under-Lyne',
						'Blackley and Broughton'],
					'pollingStations' : {
							'Aldershot' : ['PS1','PS2'],
							'Basingstoke' : ['PS3','PS4'],
							'Eastleigh' : ['PS5','PS6']						
						},						
                    'ballotPaperAccounts' : [],
 					'ballotBoxCount' : {
						'Altrincham and Sale West' : {},
						'Ashton-under-Lyne' : {},
						'Blackley and Broughton' : {} 						
 					},
 					'verificationData' : []
				}
			}
		},
		'urls' : {
    		exampleControllerURL : APP_DATA.urls.baseUrl + 'test',
		},
		'setRactive' : setRactive,
		'getRactive' : getRactive,
		'set' : set,
		'get' :get
	}	
});