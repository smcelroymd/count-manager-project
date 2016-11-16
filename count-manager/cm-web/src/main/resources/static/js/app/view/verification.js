define(['jquery',
		'text!view/verification.html',
		'text!dialog/verificationDialog.html',
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
		'datatables.net-buttons-bs'], function ($, view, verificationDialog, viewResolver, model, eventHandler) {
	
	var table = null;
	
	function onComplete(){
		
		table = $('#verificationCountTable').DataTable({
			lengthChange: false,
			data : getData(), 
			select: {
				style: 'multi'
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
		
		table.buttons().container().appendTo('#verificationCountTable_wrapper .col-sm-6:eq(0)');
		
		model.getRactive().observe('refreshVerificationCountTable', function(newValue, oldValue, keypath){
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
		var verificationCountElectoralAreaExpression = 'electionData[' + model.get('selectedElection') + '].verificationCount[' +  model.get('verificationScreenElectoralArea') + ']';
		var verificationCountBallotBoxExpression = verificationCountElectoralAreaExpression + '[' + model.get('verificationScreenBallotBoxNumber') + ']';		
		return (model.get(verificationCountBallotBoxExpression) || [] );
	}
	
	function updateBallotBoxSelect() {
		
		/**
		 * Reset ballot box select
		 */
		$('#ballotBoxSelect').html('');
		
		var selectedElection = model.get('selectedElection');
		var selectedElectoralArea = model.get('verificationScreenElectoralArea'); //set in verification.html
		var ballotPaperAccounts = model.get('electionData[' + selectedElection + '].ballotPaperAccounts');
		
		var ballotPaperAccountsRequiringValidation = $.grep(ballotPaperAccounts, function(ballotPaperAccount, index) {
			return ((ballotPaperAccount.electoralArea == selectedElectoralArea) && !ballotPaperAccount.verified);
		});
		
		$.each(ballotPaperAccountsRequiringValidation, function(index, obj) { 
			model.getRactive().push('verificationScreenBallotBoxes', obj.ballotBoxNumber); 
		});				
		
		updateTable();
	}
	
	function newAction() {
		var dialogModel = {
			'update' : false,
			'electoralArea' : model.get('verificationScreenElectoralArea'),
			'ballotBoxNumber' : model.get('verificationScreenBallotBoxNumber'),
			'selectedElection' : model.get('selectedElection'),
			'count' : '',
			'matchesBpa' : false
		};
		
		showDialog(dialogModel);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){				
	}
	
	function showDialog(model) {
		var dialog = viewResolver.createDialog('#verificationDialogContainer', verificationDialog, model, function(){
		
			/**
			 * 
			 */
			$('#verificationCountEditBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'editVerificationCount', 'eventData' : model});
		    });

			$('#verificationCountAddBtn, #verificationCountBtnAddAndCloseBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'addVerificationCount', 'eventData' : model});
		    });

			/**
		     * Tear down the view once hidden
		     */
		    $('#verificationDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
			$('#verificationDialog').modal();
		});		
	}		
	
	function show() {
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});