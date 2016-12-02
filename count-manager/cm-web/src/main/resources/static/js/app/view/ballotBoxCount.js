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
	var countType = "used";
	
	function onComplete(){
		
		table = $('#ballotBoxCountTable').DataTable({
			lengthChange: false,
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
				{text: 'Delete', action: deleteAction},
				{text : 'Send for Verification', action : sendForVerificationAction}
				],
				columnDefs : [
					{
						'targets' : 0,
						'data' : 'electoralArea',
						'width' : "20%"
					},
					{
						'targets' : 1,
						'data' : 'ballotBoxNumber',
						'width' : "20%"
					},
					{
						'targets' : 2,
						'data' : 'count',
						'width' : "20%"
					},
					{
						'targets' : 3,
						'data' : (countType === "used" ? 'matchesBpa' : "unusedMatchesBpa"),
						'width' : "20%",
						'className': "text-center",
						'render' : function ( data, type, row, meta ) {
							return (data === true ? "<span class='glyphicon glyphicon-ok'/>" : "<span class='glyphicon glyphicon-remove'/>");
						}
					},
					{
						'targets' : 4,
						'data' : 'sentForVerification',
						'width' : "20%",
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
		
		
		model.getRactive().observe('selectedElection', function(newValue, oldValue, keypath){
			updateBallotBoxSelect();	
		},{'init':false});
		
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
		var selectedElection = model.get('selectedElection');		
		var ballotCounts = model.get("electionData[" + model.get('selectedElection') + "].ballotBoxCount");
		
		var tableData = $.grep(ballotCounts, function(countObj) {
			return (countObj.countType === countType);
		});
		
		return (tableData || [] );
		
//		var ballotBoxCountExpression = "electionData[" + model.get('selectedElection') + "].ballotBoxCount";
//		var data = model.get(ballotBoxCountExpression);
//		return (data || [] );
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
			selectedObject.sentForVerification = true;
			var eventData = {
					"count" : selectedObject.count,
					"electoralArea" : selectedObject.electoralArea,
					"ballotBoxNumber" : selectedObject.ballotBoxNumber,
					"countType" : countType					
			};				
			eventHandler.trigger({'type' : 'sendForVerificationEvent', 'eventData' : eventData});
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
		
		var selectedElection = model.get('selectedElection');
		var electionDataExpression = 'electionData[' + selectedElection + ']';
		
		var dialogModel = {
			'update' : false,
			'electoralArea' : '',
			'ballotBoxNumber' : '',
			'selectedElection' : selectedElection,
			'electionData' : model.get(electionDataExpression), //check if this is needed			
			'count' : '',
			'matchesBpa' : false,
			'sentForVerification' : false,
			'verified' : false,
			'countType' : countType
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
	
	function show(type) {
		countType = type;
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});