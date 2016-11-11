define([ 'app/model' ], function(model) {
	function execute(event) {
		event.eventData["id"]=new Date().getUTCMilliseconds();
		model.getRactive().push('ballotPaperAccount.data',event.eventData);
			
	}

	return {
		execute : execute
	};
});