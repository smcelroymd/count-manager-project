define(['jquery',
	    'util/eventHandler',
        'command/exampleCommand',
	    'command/addBallotBoxCountCommand',
	    'command/editBallotBoxCountCommand',
	    'command/deleteBallotBoxCountCommand',
        'command/addBallotPaperAccountCommand',
        'command/editBallotPaperAccountCommand',
        'command/deleteBallotPaperAccountsCommand',
        'command/sendForVerificationCommand',
        'command/verifyCountCommand',
        'command/updateAnalyticValuesCommand',
        'command/generateFormAReportCommand',
        'command/addBallotBoxCommand',
        'command/deleteBallotBoxCommand',
        'command/editBallotBoxCommand'], function($, eventHandler, exampleCommand, addBallotBoxCountCommand, editBallotBoxCountCommand, deleteBallotBoxCountCommand, addBallotPaperAccountCommand, editBallotPaperAccountCommand, deleteBallotPaperAccountsCommand, sendForVerificationCommand, verifyCountCommand, updateAnalyticValuesCommand, generateFormAReportCommand, addBallotBoxCommand, deleteBallotBoxCommand, editBallotBoxCommand) {	
			(function initialise() {
				
				eventHandler.bind('exampleEvent', function() {
					exampleCommand.execute().fail(function(jqXHR, textStatus, errorThrown) {
						var errors = JSON.parse(jqXHR.responseText);
						alert('ajax call failed');
					});
				});
				
				eventHandler.bind('addBallotBoxCountEvent', function(event){
					addBallotBoxCountCommand.execute(event);
				});
				
				eventHandler.bind('editBallotBoxCountEvent', function(event){
					editBallotBoxCountCommand.execute(event);
				});
				
				eventHandler.bind('deleteBallotBoxCountEvent', function(event){
					deleteBallotBoxCountCommand.execute(event);
				});
				
				eventHandler.bind('addBallotPaperAccountEvent', function(event){
					addBallotPaperAccountCommand.execute(event);
				});
				
				eventHandler.bind('editBallotPaperAccountEvent', function(event){
					editBallotPaperAccountCommand.execute(event);
				});
				
				eventHandler.bind('deleteBallotPaperAccountsEvent', function(event){
					deleteBallotPaperAccountsCommand.execute(event);
				});

				eventHandler.bind('sendForVerificationEvent', function(event){
					sendForVerificationCommand.execute(event);
				});		
				
				eventHandler.bind('verifyCountEvent', function(event) {
					verifyCountCommand.execute(event);
				});
				
				eventHandler.bind('updateAnalyticValuesEvent', function(event) {
					updateAnalyticValuesCommand.execute(event);
				});
				
				eventHandler.bind('generateFormAReportEvent', function(event) {
					generateFormAReportCommand.execute(event);
				});
				
				eventHandler.bind('addBallotBoxEvent', function(event) {
					addBallotBoxCommand.execute(event);
				});
				
				eventHandler.bind('deleteBallotBoxEvent', function(event) {
					deleteBallotBoxCommand.execute(event);
				});
				
				eventHandler.bind('editBallotBoxEvent', function(event) {
					editBallotBoxCommand.execute(event);
				});
			})();
		}
);