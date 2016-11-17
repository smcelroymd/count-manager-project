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
		'datatables.net-buttons-bs'], function ($, view, ballotBoxCountDialog, viewResolver, model, eventHandler) {
	
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
					extend : 'selectAll',
					text : 'Select All'
				},
				{
					extend : 'selectNone',
					text : 'Select None',
					enabled : true
				},
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
					action: function (e, dt, node, config){
						$("#deleteCountValueModal").modal()
					}
				}],
				columnDefs : [
					{
						'targets' : 0,
						'data' : 'count',
						'width' : "90%"
					},
					{
						'targets' : 1,
						'data' : 'matchesBpa',
						'width' : "10%",
						'className': "text-center",
						'render' : function ( data, type, full, meta ) {
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
	
	function newAction() {
		var dialogModel = {
			'update' : false,
			'electoralArea' : model.get('ballotBoxCountScreenElectoralArea'),
			'ballotBoxNumber' : model.get('ballotBoxCountScreenBallotBoxNumber'),
			'selectedElection' : model.get('selectedElection'),
			'count' : '',
			'matchesBpa' : false
		};
		
		showDialog(dialogModel);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
		var model = datatable.row( { selected: true } ).data();
		model.update = "true";
		
		showDialog(model);
	}
	
	function showDialog(model) {
		var dialog = viewResolver.createDialog('#ballotBoxCountDialogContainer', ballotBoxCountDialog, model, function(){
		
			/**
			 * 
			 */
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