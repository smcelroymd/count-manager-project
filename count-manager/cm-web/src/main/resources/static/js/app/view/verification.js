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
	
	function onComplete(){	
		var selectedElection = model.get('selectedElection');	
		var table = $('#verificationTbl').DataTable({
			"lengthChange" : false,
			"select": {
			     style: 'single'
			},
			"data": model.get('electionData[' + selectedElection + '].verificationData'),
			"buttons" : [
				 {text: 'Edit', action: editAction}
			],
			columnDefs : [
				{
					'targets' : 0,
					'data' : 'pollingStation'
				},
				{
					'targets' : 1,
					'data' : 'ballotBoxNumber'
				},
				{
					'targets' : 2,
					'data' : 'bpaCount'
				},
				{
					'targets' : 3,
					'data' : 'count'
				},
				{
					'targets' : 4,
					'className': "text-center",
					'render' : function ( data, type, row, meta ) {
						return (row.bpaCount - row.count);
					}
				},
				{
					'targets' : 5,
					'data' : 'verified',
					'className': "text-center",
					'render' : function ( data, type, row, meta ) {
						return (data === true ? "<span class='glyphicon glyphicon-ok'/>" : "<span class='glyphicon glyphicon-remove'/>");
					}
				}				
			]			
		});
		
		table.buttons().container().appendTo( '#verificationTbl_wrapper .col-sm-6:eq(0)' );
		
		$( "#electionSelect" ).change(function() {
			updateTable(table);	
		});
		
		model.getRactive().observe('refreshVerificationTable', function(newValue, oldValue, keypath){
			updateTable(table);	
		},{'init':false});
	}	
	
	function updateTable(table) {
		var selectedElection = model.get('selectedElection');	
		table.clear();
		table.rows.add(model.get('electionData[' + selectedElection + '].verificationData'));
		table.rows().invalidate().draw();	
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){
		var model = datatable.row( { selected: true } ).data();		
		showDialog(model);
	}
		
	function showDialog(model){
		var dialog = viewResolver.createDialog('#verificationDialogContainer', verificationDialog, model, function() {
			
			$('#saveBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'verifyCountEvent', 'eventData' : model});
			});

			/**
		     * Tear down the view once hidden
		     */
		    $('#verificationDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
		    /**
		     * Show the dialog
		     */
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