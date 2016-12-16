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
			'totalBallotPapersInBoxes' : 0,
			'countElectoralArea' : 'Acocks Green Ward',
			'elections' : [
				{
					'id' : 1,
					'name' : 'Election 1'
				}, 
				{
					'id' : 2,
					'name' : 'Election 2',	
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
					'candidates' : [
 						{
 							"displayOrder" : 0,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Joshua",
							"surname" : "Martin",
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 1,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Carlos",
							"surname" : "McCoy",
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 2,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Roger",
							"surname" : "Jacobs",
							"votes" : []
						}, 
						{
 							"displayOrder" : 3,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Alan",
							"surname" : "Lawson",
							"votes" : []
						}, 
						{
 							"displayOrder" : 4,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Frank",
							"surname" : "Wright",
							"votes" : []
						}, 
						{
 							"displayOrder" : 5,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "Ralph",
							"surname" : "Gonzalez",
							"votes" : []
						},
						{
 							"displayOrder" : 6,
							"electoralArea" : "Acocks Green Ward",
							"firstName" : "",
							"surname" : "REJECTED PAPERS",							
							"votes" : []
						},												
 						{
 							"displayOrder" : 0,
							"electoralArea" : "Aston Ward",
							"firstName" : "Eric",
							"surname" : "Gonzales",
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 1,
							"electoralArea" : "Aston Ward",
							"firstName" : "Arthur",
							"surname" : "Rice",
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 2,
							"electoralArea" : "Aston Ward",
							"firstName" : "Brian",
							"surname" : "Owens",
							"votes" : []
						}, 
						{
 							"displayOrder" : 3,
							"electoralArea" : "Aston Ward",
							"firstName" : "Antonio",
							"surname" : "Jenkins",
							"votes" : []
						}, 
						{
 							"displayOrder" : 4,
							"electoralArea" : "Aston Ward",
							"firstName" : "Richard",
							"surname" : "Stevens",
							"votes" : []
						}, 
						{
 							"displayOrder" : 5,
							"electoralArea" : "Aston Ward",
							"firstName" : "Carlos",
							"surname" : "Warren",
							"votes" : []
						}, 
						{
 							"displayOrder" : 6,
							"electoralArea" : "Aston Ward",
							"firstName" : "",
							"surname" : "REJECTED PAPERS",							
							"votes" : []
						},											
 						{
 							"displayOrder" : 0,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Carlos",
							"surname" : "Kim",							
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 1,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Philip",
							"surname" : "Stanley",							
							"votes" : []
 						}, 
 						{
 							"displayOrder" : 2,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Scott",
							"surname" : "Jackson",							
							"votes" : []
						}, 
						{
 							"displayOrder" : 3,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Eric",
							"surname" : "Phillips",							
							"votes" : []
						}, 
						{
 							"displayOrder" : 4,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Alan",
							"surname" : "Carroll",	
							"votes" : []
						}, 
						{
 							"displayOrder" : 5,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "Michael",
							"surname" : "Hansen",							
							"votes" : []
						}, 
						{
 							"displayOrder" : 6,
							"electoralArea" : "Bartley Green Ward",
							"firstName" : "",
							"surname" : "REJECTED PAPERS",							
							"votes" : []
						}  												
					],
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