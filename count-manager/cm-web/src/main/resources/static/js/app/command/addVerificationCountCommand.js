define(['app/model'], function(model, ajaxService){
	function execute(event) {
		
		var row = $.extend({"id" : new Date().getUTCMilliseconds()}, event.eventData);
		
//		var countValue = event.eventData.countValue;
//		var bpaValue = event.eventData.bpaValue;
//		var countID = event.eventData.countID;
//		var status = (countValue == bpaValue);
//		event.eventData["id"]=new Date().getUTCMilliseconds();		
		
		model.getRactive().push('verificationCount.tableData',row);
//		model.getRactive().push('verificationCount.tableData',{'countID' : ++countID, 'countValue' : countValue, 'status' : status});
		//model.set({'verificationCount.countID' : countID, 'verificationCount.countValue' : '', 'verificationCount.status' : status});
	};
	
	return {
		execute : execute
	};
});