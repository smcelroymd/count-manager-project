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
					'name': 'Election 1',
					'numberOfBallotBoxes' : 100,
					'numberReceived' : 0,
					'numberInProgress' : 0,
					'numberCompleted' : 0,
					'numberAwaitingVerification' : 0,
					'statusMessage' : '',
					'textClass' : 'text-primary',
					'progressBarClass' : 'progress-bar-warning',
					'electoralAreaBoxNumbers' : [
						{
							'electoralArea' : 'Acocks Green Ward',
							'numberOfBoxes' : 23
						},
						{
							'electoralArea' : 'Aston Ward',
							'numberOfBoxes' : 47
						},
						{
							'electoralArea' : 'Bartley Green Ward',
							'numberOfBoxes' : 30
						}
					 ],					
					'electoralAreas' :[
						'Acocks Green Ward',
						'Aston Ward',
						'Bartley Green Ward'],
					'pollingStations' : {
						'Acocks Green Ward' : ['PS1','PS2'],
						'Aston Ward' : ['PS3','PS4'],
						'Bartley Green Ward' : ['PS5','PS6']						
					},
					'ballotBoxes' : [],
					'ballotPaperAccounts' : [],
					'ballotBoxCount' : [],
					'verificationData' : []	
				},
				'2' : {
					'name': 'Election 2',
					'numberOfBallotBoxes' : 200,
					'numberReceived' : 0,
					'numberInProgress' : 0,
					'numberCompleted' : 0,
					'numberAwaitingVerification' : 0,
					'statusMessage' : '',
					'textClass' : 'text-primary',
					'progressBarClass' : 'progress-bar-warning',
					'electoralAreaBoxNumbers' : [
						{
							'electoralArea' : 'Acocks Green Ward',
							'numberOfBoxes' : 34
						},
						{
							'electoralArea' : 'Aston Ward',
							'numberOfBoxes' : 20
						},
						{
							'electoralArea' : 'Bartley Green Ward',
							'numberOfBoxes' : 10
						}
					 ],					
					'electoralAreas' :[
						'Acocks Green Ward',
						'Aston Ward',
						'Bartley Green Ward'],
					'pollingStations' : {
							'Acocks Green Ward' : ['PS1','PS2'],
							'Aston Ward' : ['PS3','PS4'],
							'Bartley Green Ward' : ['PS5','PS6']						
						},						
					'ballotBoxes' : [],
					'ballotPaperAccounts' : [],
					'ballotBoxCount' : [],
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