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
					'electoralAreas' :[
						'Aldershot',
						'Basingstoke',
						'Eastleigh'],
					'ballotPaperAccounts' : []	
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
					'ballotPaperAccounts' : []
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
                     'ballotPaperAccounts' : []
				}
			},
			'verificationCount' : {
				'ballots': [
		            { 'id': '123'},
		            { 'id': '456'},
		            { 'id': '987'},
		            { 'id': '123'}],
				'electoralArea': [
			        { 'area': 'Belfast'},
			        { 'area': 'Derry'},
			        { 'area': 'Dublin'},
			        { 'area': 'Mexico'}],	
			    'tableData': [
			    	]
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