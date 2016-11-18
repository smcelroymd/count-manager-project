define(['jquery',
		'text!view/ballotBoxCount.html',
		'text!dialog/ballotBoxCountDialog.html',
		'util/viewResolver',
		'app/model',
		'util/eventHandler',
		'bootstrap',  
		'datatables.net',
		'datatables.net-bs',
		'datatables.net-responsive',
		'datatables.net-responsive-bs',
		'datatables.net-select',
		'datatables.net-buttons',
		'datatables.net-buttons-bs'
		], function ($, view, ballotBoxCountDialog, viewResolver, model, eventHandler) {
	
	var table = null;
	
	function onComplete(){
		
		table = $('#ballotBoxCountTable').DataTable({
			lengthChange: false,
			data : getData(), 
			select: {
				style: 'single'
			},
			buttons: [
				{
					text: 'New',
					action: newAction
				},
				{
					text: 'Edit',
					action: editAction
				},
				{
					text: 'Delete',
					action: deleteAction
				},
				{
					text : 'Send for Verification',
					action : sendForVerificationAction
				}],
				columnDefs : [
					{
						'targets' : 0,
						'data' : 'count',
						'width' : "80%"
					},
					{
						'targets' : 1,
						'data' : 'matchesBpa',
						'width' : "10%",
						'className': "text-center",
						'render' : function ( data, type, row, meta ) {
							return (data === true ? "<span class='glyphicon glyphicon-ok'/>" : "<span class='glyphicon glyphicon-remove'/>");
						}
					},
					{
						'targets' : 2,
						'data' : 'sentForVerification',
						'width' : "10%",
						'className': "text-center",
						'render' : function ( data, type, row, meta ) {
							return (data === true ? "<span class='glyphicon glyphicon-ok'/>" : "<span class='glyphicon glyphicon-remove'/>");
						}
					}
				]
		});
		
		table.buttons().container().appendTo('#ballotBoxCountTable_wrapper .col-sm-6:eq(0)');
		
		model.getRactive().observe('refreshBallotBoxCountTable', function(newValue, oldValue, keypath){
			updateTable();
		},{'init':false});
		
		
		$( "#electionSelect" ).change(function() {
			updateBallotBoxSelect();					
		});
		
		$( "#electoralAreaSelect" ).change(function(event) {
			updateBallotBoxSelect();		
		});
		
		$('#ballotBoxSelect').change(function(event) {
			updateTable();
		});
		
		updateBallotBoxSelect();
	}
	
	function updateTable() {
		table.clear();
		table.rows.add(getData());
		table.rows().invalidate().draw();		
	}
	
	function getData() {
		var ballotBoxCountElectoralAreaExpression = 'electionData[' + model.get('selectedElection') + '].ballotBoxCount[' +  model.get('ballotBoxCountScreenElectoralArea') + ']';
		var ballotBoxCountBallotBoxExpression = ballotBoxCountElectoralAreaExpression + '[' + model.get('ballotBoxCountScreenBallotBoxNumber') + ']';		
		var myData = model.get(ballotBoxCountBallotBoxExpression);
		return (model.get(ballotBoxCountBallotBoxExpression) || [] );
	}
	
	function updateBallotBoxSelect() {
		
		/**
		 * Reset ballot box select
		 */
		$('#ballotBoxSelect').html('');
		
		var selectedElection = model.get('selectedElection');
		var selectedElectoralArea = model.get('ballotBoxCountScreenElectoralArea'); //set in ballotBoxCount.html
		var ballotPaperAccounts = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');
		
		var ballotPaperAccountsRequiringValidation = $.grep(ballotPaperAccounts, function(ballotPaperAccount, index) {
			return ((ballotPaperAccount.electoralArea == selectedElectoralArea) && !ballotPaperAccount.verified);
		});
		
		$.each(ballotPaperAccountsRequiringValidation, function(index, obj) { 
			model.getRactive().push('ballotBoxCountScreenBallotBoxes', obj.ballotBoxNumber); 
		});				
		
		updateTable();
	}
	
	function sendForVerificationAction(event, datatable, buttonClicked, buttonConfig) {
		var selectedObject = datatable.row( { selected: true } ).data();
		if(selectedObject !== undefined) {
			var eventData = {
					"count" : selectedObject.count,
					"electoralArea" : model.get('ballotBoxCountScreenElectoralArea'),
					"ballotBoxNumber" : model.get('ballotBoxCountScreenBallotBoxNumber')
			};				
			eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : eventData});
			selectedObject.sentForVerification = true;
			updateTable();
		}
	}
	
	function deleteAction(event, datatable, buttonClicked, buttonConfig) {
		var objectsToDelete = datatable.rows( { selected: true } ).data();
		
		if((objectsToDelete !== undefined) && (objectsToDelete.length > 0)) {			
			var eventData = {
					"selectedElection": model.get('selectedElection'),
					"objectsToDelete" : objectsToDelete,
					"electoralArea" : model.get('ballotBoxCountScreenElectoralArea'),
					"ballotBoxNumber" : model.get('ballotBoxCountScreenBallotBoxNumber')
			};
			eventHandler.trigger({'type' : 'deleteBallotBoxCountEvent', 'eventData' : eventData});			
		}
	}
	
	function newAction() {
		var dialogModel = {
			'update' : false,
			'electoralArea' : model.get('ballotBoxCountScreenElectoralArea'),
			'ballotBoxNumber' : model.get('ballotBoxCountScreenBallotBoxNumber'),
			'selectedElection' : model.get('selectedElection'),
			'count' : '',
			'matchesBpa' : false,
			'sentForVerification' : false
		};
		
		showDialog(dialogModel);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
		var model = datatable.row( { selected: true } ).data();
		if(model !== undefined) {
			model.update = "true";			
			showDialog(model);			
		}
	}		
	
	function showDialog(model) {
		var dialog = viewResolver.createDialog('#ballotBoxCountDialogContainer', ballotBoxCountDialog, model, function(){

			$('#ballotBoxCountEditBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'editBallotBoxCountEvent', 'eventData' : model});
		    });

			$('#ballotBoxCountAddBtn, #ballotBoxCountAddAndCloseBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'addBallotBoxCountEvent', 'eventData' : model});
		    });

			/**
		     * Tear down the view once hidden
		     */
		    $('#ballotBoxCountDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
			$('#ballotBoxCountDialog').modal();
		});		
	}		
	
	function show() {
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});