define([ 'jquery', 
		'text!view/ballotPaperAccount.html', 
		'text!dialog/ballotPaperAccountDialog.html',
		'util/viewResolver',
		'app/model', 
		'util/eventHandler', 
		'bootstrap', 
		'jquery-validate',
		'datatables.net',
		'datatables.net-bs', 
		'datatables.net-responsive',
		'datatables.net-responsive-bs',
		'datatables.net-select',
		'datatables.net-buttons',
		'datatables.net-buttons-bs'], function($, view, ballotPaperAccountDialog, viewResolver, model, eventHandler) {
	
	function onComplete() {
						
		var table = populateTable();			
		
		model.getRactive().observe('electionData[1].ballotPaperAccounts', function(newValue, oldValue, keypath) {
		    table.clear();
		    table.rows.add(newValue);
		    table.rows().invalidate().draw();
		   }, {'init':false});

		model.getRactive().observe('electionData[2].ballotPaperAccounts', function(newValue, oldValue, keypath) {
		    table.clear();
		    table.rows.add(newValue);
		    table.rows().invalidate().draw();
		   }, {'init':false});

		model.getRactive().observe('electionData[3].ballotPaperAccounts', function(newValue, oldValue, keypath) {
		    table.clear();
		    table.rows.add(newValue);
		    table.rows().invalidate().draw();
		   }, {'init':false});
		
		model.getRactive().observe('selectedElection', function(newValue, oldValue, keypath){
			var selectedElection = model.get('selectedElection');	
			var newData = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');
		    table.clear();
		    table.rows.add(newData);
		    table.rows().invalidate().draw();	
		},{'init':false});
		
	}
	
	function populateTable() {
		var selectedElection = model.get('selectedElection');	
		var table = $('#ballotPaperAccountTbl').DataTable({
			"lengthChange" : false,
		    "language": {
		        "search": "_INPUT_",
		        "searchPlaceholder": "Search..."
		    },			
			"select": {
			     style: 'single'
		    },
			"data": model.get('electionData[' + selectedElection + '].ballotPaperAccounts'),
			"buttons" : [
				 {text: 'New', action: newAction},
				 {text: 'Edit', action: editAction},
				 {text: 'Delete', action: deleteAction}
			],
			"columnDefs" : [
				{'targets' : 0,'data' : 'electoralArea'},
				{'targets' : 1,'data' : 'pollingStation'},
				{'targets' : 2,'data' : 'ballotBoxNumber'},
				{'targets' : 3,'data' : 'totalOrdinaryBallots'},
				{'targets' : 4,'data' : 'nextSerialNumber'},
				{'targets' : 5,'data' : 'firstSerialNumber'},
				{'targets' : 6,'data' : null, //'totalOrdinaryIssued', 
					"render" : function ( data, type, obj, meta ) {
						return (obj.nextSerialNumber - obj.firstSerialNumber);
					}
				},
				{'targets' : 7,'data' : 'totalOrdinarySpoiltReplacement'},
				{'targets' : 8,'data' : null, //'totalOrdinaryIssuedNotSpoilt',
					"render" : function ( data, type, obj, meta ) {
						return ((obj.nextSerialNumber - obj.firstSerialNumber) - obj.totalOrdinarySpoiltReplacement);
					}									
				},
				{'targets' : 9,'data' : null, //'totalOrdinaryUnused',
					"render" : function ( data, type, obj, meta ) {
						return (obj.totalOrdinaryBallots - (obj.nextSerialNumber - obj.firstSerialNumber));
					}					
				},
				{'targets' : 10,'data' : 'totalTendered'},
				{'targets' : 11,'data' : 'totalTenderedMarked'},
				{'targets' : 12,'data' : 'totalTenderedSpoilt'},
				{'targets' : 13,'data' : 'totalTenderedUnused'},
				{'targets' : 14,'data' : 'postalEarly'},
				{'targets' : 15,'data' : 'postalSweep'},
				{'targets' : 16,'data' : 'postalLate'}
				]
		});	
		
		table.buttons().container().appendTo( '#ballotPaperAccountTbl_wrapper .col-sm-6:eq(0)' );

		return table;
	}
	
	function newAction(){
		var selectedElection = model.get('selectedElection');
		var electionDataExpression = 'electionData[' + selectedElection + ']';
		var dialogModel = {'update':false,
				'electoralArea' : '',
				'pollingStation' : '',
				'ballotBoxNumber' : '',
				'totalOrdinaryBallots' : '',
				'nextSerialNumber' :'',
				'firstSerialNumber' : '',
				'totalOrdinarySpoiltReplacement' : '',
				'totalTendered' : '',
				'totalTenderedMarked' : '',
				'totalTenderedSpoilt' : '',
				'totalTenderedUnused' : '',
				'postalEarly' : '',
				'postalSweep' : '',
				'postalLate' : '',
				'electionData' : model.get(electionDataExpression), //check if this is needed
				'selectedElection' : selectedElection,
				'verified' : false};
		showDialog(dialogModel);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
		var model = datatable.row( { selected: true } ).data();
		if(model !== undefined) {
			model.update = "true";			
			showDialog(model);			
		}
	}
	
	function deleteAction(event, datatable, buttonClicked, buttonConfig ) {
		var objectsToDelete = datatable.rows( { selected: true } ).data();
		var eventData = {
				"selectedElection": model.get('selectedElection'),
				"objectsToDelete" : objectsToDelete
		};
		eventHandler.trigger({'type' : 'deleteBallotPaperAccountsEvent', 'eventData' : eventData});
	}
	
	function showDialog(dialogModel){
		var dialog = viewResolver.createDialog('#ballotPaperAccountDialogContainer', ballotPaperAccountDialog, dialogModel, function() {
			
			$('#addBallotPaperAccountBtn, #addAndCloseBallotPaperAccountBtn').off('click').on('click', function() {	
				eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : dialogModel});					
			});
			    
			$('#editBallotPaperAccountBtn').off('click').on('click', function (e) {
				eventHandler.trigger({'type' : 'editBallotPaperAccountEvent', 'eventData' : dialogModel});
			});
									
			dialog.observe('electoralArea', function(newValue, oldValue, keypath) {
				var pollingStationsExpression = 'electionData[' + dialogModel.selectedElection + '].pollingStations.' + newValue;
			    var pollingStations = model.get(pollingStationsExpression);			    
			    dialog.set("pollingStations", model.get(pollingStationsExpression));
			}, {'init':false});
			
			/**
		     * Tear down the view once hidden
		     */
		    $('#ballotPaperAccountDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
		    $('.nav-pills a').on('hide.bs.tab', function(event){		    	
		    	var formId = $(event.target).attr("href") + "Form";		    	
		    	if(!$(formId).valid()) {
		    		event.preventDefault();
		    	}		    		
		    });
		    
		    /**
		     * Show the dialog
		     */
			$('#ballotPaperAccountDialog').modal();
			
			setUpValidation();
		});
	}

	function setUpValidation() {				
		var boxInformationFormValidator = $( "#boxInformationForm" ).validate({
			"errorClass": "invalid",
			"rules": {
				"ballotBoxNumber" : {required: true, number: true },
				"pollingStationSelect" : {required: true },
				"electoralAreaSelect" : {required: true}
			 },
		     "highlight": function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		      },
		      "unhighlight": function(element) {
		    	  $(element).closest('.form-group').removeClass('has-error');
		      }
		});	
		
		var ordinaryBallotsFormValidator = $( "#ordinaryBallotsForm" ).validate({
			"errorClass": "invalid",
			"rules": {
				"totalOrdinaryBallots" : {required: true, number: true },
				"nextSerialNumber" : {required: true, number: true },
				"firstSerialNumber" : {required: true, number: true },
				"totalOrdinarySpoiltReplacement" : {required: true, number: true }
			 },
		     "highlight": function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		      },
		      "unhighlight": function(element) {
		    	  $(element).closest('.form-group').removeClass('has-error');
		      }
		});		
		
		var tenderedBallotsFormValidator = $( "#tenderedBallotsForm" ).validate({
			"errorClass": "invalid",
			"rules": {
				"totalTendered" : {required: true, number: true },
				"totalTenderedMarked" : {required: true, number: true },
				"totalTenderedSpoilt" : {required: true, number: true },
				"totalTenderedUnused" : {required: true, number: true }
			 },
		     "highlight": function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		      },
		      "unhighlight": function(element) {
		    	  $(element).closest('.form-group').removeClass('has-error');
		      }
		});		

		var postalVotesFormValidator = $( "#postalVotesForm" ).validate({
			"errorClass": "invalid",
			"rules": {
				"postalEarly" : {required: true, number: true },
				"postalSweep" : {required: true, number: true },
				"postalLate" : {required: true, number: true }
			 },
		     "highlight": function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		      },
		      "unhighlight": function(element) {
		    	  $(element).closest('.form-group').removeClass('has-error');
		      }
		});
	}
	
	function show() {
		viewResolver.show(view, onComplete);
	}

	return {
		show : show
	};
});
