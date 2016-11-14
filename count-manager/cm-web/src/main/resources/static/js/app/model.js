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
			    	],
			    	'countID': '1',
			    	'bpaValue': '200',
			    	'countValue': '',
			    	'status': 'false',
			}
		},
		'urls' : {
    		exampleControllerURL : APP_DATA.urls.baseUrl + 'test',
		},
		'setRactive' : setRactive,
		'getRactive' : getRactive,
		'set' : set,
		'get' : get
	};
	
});