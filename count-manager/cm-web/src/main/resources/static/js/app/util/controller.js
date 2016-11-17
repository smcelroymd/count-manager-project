define(['jquery',
	    'util/eventHandler',
        'command/exampleCommand',
	    'command/addBallotBoxCountCommand',
	    'command/editBallotBoxCountCommand',
	    'command/deleteBallotBoxCountCommand',
        'command/addBallotPaperAccountCommand',
        'command/editBallotPaperAccountCommand',
        'command/deleteBallotPaperAccountsCommand'], function($, eventHandler, exampleCommand, addBallotBoxCountCommand, editBallotBoxCountCommand, deleteBallotBoxCountCommand, addBallotPaperAccountCommand, editBallotPaperAccountCommand, deleteBallotPaperAccountsCommand) {	
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
					console.log("Calling edit Command");
				});
				
				eventHandler.bind('deleteBallotBoxCountEvent', function(){
					deleteBallotBoxCountCommand.execute();
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