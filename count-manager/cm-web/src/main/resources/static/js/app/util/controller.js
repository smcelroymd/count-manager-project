define(['jquery',
	    'util/eventHandler',
        'command/exampleCommand',
        'command/addBallotPaperAccountCommand',
        'command/editBallotPaperAccountCommand',
        'command/deleteBallotPaperAccountsCommand'], function($, eventHandler, exampleCommand, addBallotPaperAccountCommand, editBallotPaperAccountCommand, deleteBallotPaperAccountsCommand) {	
			(function initialise() {
				
				eventHandler.bind('exampleEvent', function() {
					exampleCommand.execute().fail(function(jqXHR, textStatus, errorThrown) {
						var errors = JSON.parse(jqXHR.responseText);
						alert('ajax call failed');
					});
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