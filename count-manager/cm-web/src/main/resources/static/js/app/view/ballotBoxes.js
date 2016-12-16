define(['jquery',
		'text!view/ballotBoxes.html',
		'text!dialog/ballotBoxDialog.html',		
		'util/viewResolver',
		'app/model',
		'util/eventHandler',
		'moment',
		'bootstrap',  
		'datatables.net',
		'datatables.net-bs',
		'datatables.net-responsive',
		'datatables.net-responsive-bs',
		'datatables.net-select',
		'datatables.net-buttons',
		'datatables.net-buttons-bs'
		], function ($, view, ballotBoxDialog, viewResolver, model, eventHandler, moment) {
	
	var table = null;
	var countType = "used";
	
	function onComplete(){
		
		table = $('#ballotBoxesTable').DataTable({
			"lengthChange": false,
		    "language": {
		        "search": "_INPUT_",
		        "searchPlaceholder": "Search..."
		    },			
			data : getData(), 
			select: {
				style: 'single'
			},
			buttons: [
				{text: 'New', action: newAction},
				{text: 'Edit', action: editAction},
				{text: 'Delete', action: deleteAction}
				],
				columnDefs : [
					{
						'targets' : 0,
						'data' : 'electoralArea',
						'width' : "50%"
					},
					{
						'targets' : 1,
						'data' : 'ballotBoxNumber',
						'width' : "25%"
					},
					{
						'targets' : 2,
						'data' : 'dateReceived',
						'width' : "25%",
						'render' : function ( data, type, row, meta ) {
								return data.format('MMMM Do YYYY, h:mm:ss a');
						}
					}
				]
		});
		
		table.buttons().container().appendTo('#ballotBoxesTable_wrapper .col-sm-6:eq(0)');
		
		model.getRactive().observe('refreshBallotBoxTable', function(newValue, oldValue, keypath){
			updateTable();
		},{'init':false});
		
		
		model.getRactive().observe('selectedElection', function(newValue, oldValue, keypath){
			updateTable();			
		},{'init':false});		
	}
	
	function updateTable() {				
		table.clear();
		table.rows.add(getData());
		table.rows().invalidate().draw();		
	}
	
	function getData() {			
		var selectedElection = model.get('selectedElection');		
		var ballotBoxes = model.get("electionData[" + model.get('selectedElection') + "].ballotBoxes");		
		return (ballotBoxes || [] );
	}
	
	
	function deleteAction(event, datatable, buttonClicked, buttonConfig) {
		var objectsToDelete = datatable.rows( { selected: true } ).data();
		
		if((objectsToDelete !== undefined) && (objectsToDelete.length > 0)) {			
			var eventData = {
					"selectedElection": model.get('selectedElection'),
					"objectsToDelete" : objectsToDelete
			};
			eventHandler.trigger({'type' : 'deleteBallotBoxEvent', 'eventData' : eventData});			
		}		
	}
	
	function newAction() {
		var selectedElection = model.get('selectedElection');
		var electionDataExpression = 'electionData[' + selectedElection + ']';

		var dialogModel = {
				'selectedElection' : selectedElection,
				'electionData' : model.get(electionDataExpression), 		
				'dateReceived' : moment(),
				'format' : function ( moment ) {
					return moment.format('MMMM Do YYYY, h:mm:ss a');
				}
		};
		
		showDialog(dialogModel);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
		var dialogModel = datatable.row( { selected: true } ).data();
		if(dialogModel !== undefined) {		
			var selectedElection = model.get('selectedElection');
			var electionDataExpression = 'electionData[' + selectedElection + ']';
			dialogModel.selectedElection = selectedElection;
			dialogModel.electionData = model.get(electionDataExpression); 
			dialogModel.update = true;
			dialogModel.format = function ( moment ) {
				return moment.format('MMMM Do YYYY, h:mm:ss a');
			}
			showDialog(dialogModel);			
		}
	}		

	function showDialog(model) {
		var dialog = viewResolver.createDialog('#ballotBoxDialogContainer', ballotBoxDialog, model, function(){

			$('#ballotBoxEditBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'editBallotBoxEvent', 'eventData' : model});
		    });

			$('#ballotBoxAddBtn, #ballotBoxAddAndCloseBtn').off('click').on('click', function() {
				var rowModel = {
						'id' : model.id,
						'ballotBoxNumber' : model.ballotBoxNumber,
						'selectedElection' : model.selectedElection,
						'electoralArea' :  model.electoralArea,
						'dateReceived' : model.dateReceived				
				};
				eventHandler.trigger({'type' : 'addBallotBoxEvent', 'eventData' : rowModel});
		    });
			
			
			/**
		     * Tear down the view once hidden
		     */
		    $('#ballotBoxDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
			$('#ballotBoxDialog').modal();
		});		
	}			
	
	function show(type) {
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});