define(['app/model'], function(model, ajaxService){
	function execute(event) {
		var countValue = model.get('verificationCount.countValue');
		var bpaValue = model.get('verificationCount.bpaValue');
		var count = model.get('verificationCount.countID');
		var status = false;
		
		if(countValue == bpaValue){status = true;}
		
		model.getRactive().push('verificationCount.tableData',{'countID' : count, 'countValue' : countValue, 'status' : status});
		model.set({'verificationCount.countID' : ++count, 'verificationCount.countValue' : '', 'verificationCount.status' : status});
	};
	
	return {
		execute : execute
	};
});