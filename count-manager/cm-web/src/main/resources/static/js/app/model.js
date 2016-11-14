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
			},
			'ballotPaperAccount':{
				'data':[],
				'electoralArea': [
					{'area':'Belfast','value':'1'},
					{'area':'Derry','value':'2'},
					{'area':'Mexico','value':'3'}],
					'selectedElectoralArea': '0'
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