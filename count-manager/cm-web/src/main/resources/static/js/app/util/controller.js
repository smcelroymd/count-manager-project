define(['jquery',
	    'util/eventHandler',
        'command/exampleCommand',
	    'command/addVerificationCountCommand',
	    'command/editVerificationCountCommand',
	    'command/deleteVerificationCountCommand',
        'command/addBallotPaperAccountCommand',
        'command/editBallotPaperAccountCommand',
        'command/deleteBallotPaperAccountsCommand'], function($, eventHandler, exampleCommand, addVerificationCountCommand, editVerificationCountCommand, deleteVerificationCountCommand, addBallotPaperAccountCommand, editBallotPaperAccountCommand, deleteBallotPaperAccountsCommand) {	
			(function initialise() {
				
				eventHandler.bind('exampleEvent', function() {
					exampleCommand.execute().fail(function(jqXHR, textStatus, errorThrown) {
						var errors = JSON.parse(jqXHR.responseText);
						alert('ajax call failed');
					});
				});
				
				eventHandler.bind('addVerificationCount', function(event){
					addVerificationCountCommand.execute(event);
				});
				
				eventHandler.bind('editVerificationCount', function(event){
					editVerificationCountCommand.execute(event);
					console.log("Calling edit Command");
				});
				
				eventHandler.bind('deleteVerificationCount', function(){
					deleteVerificationCountCommand.execute();
					console.log("Calling delete Command");
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
			})();
		}
);