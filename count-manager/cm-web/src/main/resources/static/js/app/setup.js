define(['jquery',
	    'Cookies', 
		'util/router',
		'app/model',
		'util/eventHandler', 		
		'util/controller',
		'util/jquery.md.object.util',
		'bootstrap'], function ($, Cookies, router, model, eventHandler) {
	
	(function initialise() {												
		
		/**
		 * Removes 'active' class from currently selected/active item on 
		 * side menubar and adds the 'active' class to the item that
		 * has just been clicked
		 * 
		 * The 'active' class makes the text green. 
		 */
		$('.sidenav .nav-pills li').on('click', function() {		  
			if($('a',this).attr('href') !== '#') {
				$('.sidenav ul.nav-pills li.active').removeClass('active');
				$(this).addClass('active');
			}
		});
		
		/**
		 * Collapse the menu if shown and a link is clicked
		 */
		$(".nav-pills-menu li a").click(function(event) {
			if($(this).attr('href') !== '#') {
				$(".navbar-collapse").collapse('hide');
			}
		});
		
		/**
		 * If a user refreshes the browser (presses F5) remember the current page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		$( window ).on('beforeunload', function() {
			Cookies.set('mdl-register-manager-current-page', router.getRoute());
		});
		
		/**
		 * If a user refreshed the browser (presses F5) show the correct page
		 * TODO - For security reason we need to mark this cookie as secure
		 */
		var route = Cookies.get('mdl-register-manager-current-page');
		if(route !== undefined) {
			router.setRoute(route);
			Cookies.remove('mdl-register-manager-current-page');
			
			/**
			 * Highlight the correct menu option 
			 */
			$('.sidenav ul.nav-pills li.active').removeClass('active');
			$('a[href^="' + route + '"').parent().addClass('active');			
		}
		
		$('[data-toggle="tooltip"]').tooltip(); 
		
		//dont think this is needed
		$("body").on('click', "#electionDialog li", function(e) {
			model.set('selectedElection', $(e.target).closest('li').find('input').val());
			$("#electionDialog").modal("hide");
			$("#dummyAnchor").focus();
		});

		$("body").on("click", ".breadcrumb #electionMenu li", function(e) {
			model.set('selectedElection', $(e.target).closest('li').find('a').attr('data-electionId'));
		});		

		$("body").on("click", ".breadcrumb #electoralAreaMenu li", function(e) {
			model.set('countElectoralArea', $(e.target).closest('li').find('a').attr('data-electoralArea'));
		})
		
		/**
		 * Set up dummy 'used' data
		 */
		//createBallotPaperAccounts();
		//createBallotBoxCountData();
		//createVerificationData();

		/**
		 * Set up dummy 'unused' data
		 */
		//createUnusedBallotBoxCountData();
		//createUnusedVerificationData();

		//eventHandler.trigger({'type' : 'updateAnalyticValuesEvent', 'eventData' : {}});
	})();
	
	function createBallotPaperAccounts() {
		var ballotPaperAccountData1 = {'id' : 1,'update':false,'electoralArea' : 'Acocks Green Ward','pollingStation' : 'PS1','ballotBoxNumber' : '1','totalOrdinaryBallots' : '1000','nextSerialNumber' :'721','firstSerialNumber' : '1','totalOrdinarySpoiltReplacement' : '1','totalTendered' : '1','totalTenderedMarked' : '1','totalTenderedSpoilt' : '1','totalTenderedUnused' : '1','postalEarly' : '1','postalSweep' : '1','postalLate' : '1','electionData' : model.get('electionData[1]'),'selectedElection' : 1,'verified' : true};		
		var ballotPaperAccountData2 = {'id' : 2,'update':false,'electoralArea' : 'Acocks Green Ward','pollingStation' : 'PS2','ballotBoxNumber' : '2','totalOrdinaryBallots' : '1000','nextSerialNumber' :'650','firstSerialNumber' : '1','totalOrdinarySpoiltReplacement' : '0','totalTendered' : '1','totalTenderedMarked' : '1','totalTenderedSpoilt' : '1','totalTenderedUnused' : '1','postalEarly' : '1','postalSweep' : '1','postalLate' : '1','electionData' : model.get('electionData[1]'),'selectedElection' : 1,'verified' : false};		
		var ballotPaperAccountData3 = {'id' : 3,'update':false,'electoralArea' : 'Aston Ward','pollingStation' : 'PS3','ballotBoxNumber' : '3','totalOrdinaryBallots' : '1000','nextSerialNumber' :'450','firstSerialNumber' : '1','totalOrdinarySpoiltReplacement' : '0','totalTendered' : '1','totalTenderedMarked' : '1','totalTenderedSpoilt' : '1','totalTenderedUnused' : '1','postalEarly' : '1','postalSweep' : '1','postalLate' : '1','electionData' : model.get('electionData[1]'),'selectedElection' : 1,'verified' : false};		
		var ballotPaperAccountData4 = {'id' : 4,'update':false,'electoralArea' : 'Bartley Green Ward','pollingStation' : 'PS5','ballotBoxNumber' : '4','totalOrdinaryBallots' : '1000','nextSerialNumber' :'575','firstSerialNumber' : '1','totalOrdinarySpoiltReplacement' : '5','totalTendered' : '1','totalTenderedMarked' : '1','totalTenderedSpoilt' : '1','totalTenderedUnused' : '1','postalEarly' : '1','postalSweep' : '1','postalLate' : '1','electionData' : model.get('electionData[1]'),'selectedElection' : 1,'verified' : false};						
		eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : ballotPaperAccountData1});
		eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : ballotPaperAccountData2});
		eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : ballotPaperAccountData3});
		eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : ballotPaperAccountData4});
		 var electionData = model.get('electionData[1]');
		 var a =1;
	} 
	
	function createBallotBoxCountData() {		
		var ballotBoxCountData1 = {'id' : 1,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '1','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '719','matchesBpa' : false,'sentForVerification' : true,'verified' : true,'countType' : "used"};
		var ballotBoxCountData2 = {'id' : 2,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '1','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '720','matchesBpa' : false,'sentForVerification' : false,'verified' : false,'countType' : "used"};
		var ballotBoxCountData3 = {'id' : 3,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '1','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '721','matchesBpa' : false,'sentForVerification' : false,'verified' : false,'countType' : "used"};
		var ballotBoxCountData4 = {'id' : 4,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '2','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '649','matchesBpa' : false,'sentForVerification' : true,'verified' : false,'countType' : "used"};
		var ballotBoxCountData5 = {'id' : 5,'update' : false,'electoralArea' : 'Aston Ward','ballotBoxNumber' : '3','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '449','matchesBpa' : false,'sentForVerification' : true,'verified' : false,'countType' : "used"};
		var ballotBoxCountData6 = {'id' : 6,'update' : false,'electoralArea' : 'Bartley Green Ward','ballotBoxNumber' : '4','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '569','matchesBpa' : false,'sentForVerification' : false,'verified' : false,'countType' : "used"};
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData1});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData2});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData3});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData4});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData5});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData6});
		
		var verificationData1 = {"id" : 1, "count" : 719, "electoralArea" : "Acocks Green Ward", "ballotBoxNumber" : 1,"countType" : "used"};				
		var verificationData2 = {"id" : 2, "count" : 649, "electoralArea" : "Acocks Green Ward", "ballotBoxNumber" : 2,"countType" : "used"};				
		var verificationData3 = {"id" : 3, "count" : 449, "electoralArea" : "Aston Ward", "ballotBoxNumber" : 3,"countType" : "used"};				
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData1});
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData2});
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData3});
		
//		selectedObject.sentForVerification = true;
//		var eventData = {
//				"count" : selectedObject.count,
//				"electoralArea" : selectedObject.electoralArea,
//				"ballotBoxNumber" : selectedObject.ballotBoxNumber,
//				"countType" : countType					
//		};				
//		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : eventData});
	}
	
	function createVerificationData() {		
		var verificationData1 = {"id" : 1, "pollingStation" : 'PS1', "ballotBoxNumber" : 1, "electoralArea" :"Acocks Green Ward", "bpaCount" : 719, "bpaUnusedCount" : 280, "count" : 719,"verified" : true,"countType" : "used"};
		eventHandler.trigger({'type' : 'verifyCountEvent', 'eventData' : verificationData1});			
	}
	
	function createUnusedBallotBoxCountData() {
		var ballotBoxCountData1 = {'id' : 7,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '1','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '280','matchesBpa' : false,'sentForVerification' : true,'verified' : false,'countType' : "unused"};
		var ballotBoxCountData2 = {'id' : 8,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '1','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '281','matchesBpa' : false,'sentForVerification' : false,'verified' : false,'countType' : "unused"};
		var ballotBoxCountData3 = {'id' : 9,'update' : false,'electoralArea' : 'Acocks Green Ward','ballotBoxNumber' : '2','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '351','matchesBpa' : false,'sentForVerification' : true,'verified' : false,'countType' : "unused"};
		var ballotBoxCountData4 = {'id' : 10,'update' : false,'electoralArea' : 'Aston Ward','ballotBoxNumber' : '3','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '551','matchesBpa' : false,'sentForVerification' : true,'verified' : false,'countType' : "unused"};
		var ballotBoxCountData5 = {'id' : 11,'update' : false,'electoralArea' : 'Bartley Green Ward','ballotBoxNumber' : '4','selectedElection' : 1, 'electionData' : model.get('electionData[1]'),'count' : '426','matchesBpa' : false,'sentForVerification' : false,'verified' : false,'countType' : "unused"};
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData1});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData2});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData3});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData4});
		eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : ballotBoxCountData5});
		
		var verificationData1 = {"id" : 4, "count" : 280, "electoralArea" : "Acocks Green Ward", "ballotBoxNumber" : 1,"countType" : "unused"};				
		var verificationData2 = {"id" : 5, "count" : 351, "electoralArea" : "Acocks Green Ward", "ballotBoxNumber" : 2,"countType" : "unused"};				
		var verificationData3 = {"id" : 6, "count" : 551, "electoralArea" : "Aston Ward", "ballotBoxNumber" : 3,"countType" : "unused"};				
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData1});
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData2});
		eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : verificationData3});		
	}
	
	function createUnusedVerificationData() {
		var verificationData1 = {"id" : 4, "pollingStation" : 'PS1', "ballotBoxNumber" : 1, "electoralArea" :"Acocks Green Ward", "bpaCount" : 280, "bpaUnusedCount" : 280, "count" : 280,"verified" : true,"countType" : "unused"};
		eventHandler.trigger({'type' : 'verifyCountEvent', 'eventData' : verificationData1});
	}
});