define(['jquery',
	    'util/eventHandler',
        'command/exampleCommand',
	    'command/addVerificationCountCommand',
	    'command/editVerificationCountCommand',
	    'command/deleteVerificationCountCommand'], function($, eventHandler, exampleCommand, addVerificationCountCommand, editVerificationCountCommand, deleteVerificationCountCommand) {	
			(function initialise() {
				eventHandler.bind('exampleEvent', function() {
					exampleCommand.execute().fail(function(jqXHR, textStatus, errorThrown) {
						var errors = JSON.parse(jqXHR.responseText);
						alert('ajax call failed');
					});
				});
				eventHandler.bind('addVerificationCount', function(){
					addVerificationCountCommand.execute();
				});
				eventHandler.bind('editVerificationCount', function(){
					editVerificationCountCommand.execute();
					console.log("Calling edit Command");
				});
				eventHandler.bind('deleteVerificationCount', function(){
					deleteVerificationCountCommand.execute();
					console.log("Calling delete Command");
				});
			})(); 
		}
);