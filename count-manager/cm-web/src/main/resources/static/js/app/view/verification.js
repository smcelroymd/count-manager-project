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
		var table = $('#verificationCountTable').DataTable({
			lengthChange: false,
			data : model.get('verificationCount.tableData'),
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
						console.log("Opening Delete modal");
					}
				}],
				columnDefs : [
					{
						'targets' : 0,
						'data' : "countID",
						'width' : "30%"
					},
					{
						'targets' : 1,
						'data' : 'countValue',
						'width' : "50%"
					},
					{
						'targets' : 2,
						'data' : 'status',
						'width' : "20%"
					}
				]
		});
		
		table.buttons().container().appendTo('#verificationCountTable_wrapper .col-sm-6:eq(0)');
		
		model.getRactive().observe('verificationCount.tableData', function(newValue, oldValue, keypath){
			table.clear();
			table.rows.add(newValue);
			table.rows().invalidate().draw();
		},{'init':false});
		
		$('#addCountValueModal').off('click').on('click', '#addBtn', '#addAndCloseBtn', function (e) {
			//eventHandler.trigger({'type' : 'addVerificationCount'});
			//$('#countValue').focus();
		});
		
		$('#editCountValueModal').off('click').on('click', '#editbtn', function (e){
			//eventHandler.trigger({'type' : 'editVerificationCount'});
			//console.log("Edit triggered");
		});
		
		$('#deleteCountRowModal').off('click').on('click', '#deletebtn', function (e){
			eventHandler.trigger({'type' : 'deleteVerificationCount'})
			console.log("Delete triggered");
		});
	}
	
	function newAction() {
		showDialog({});
	}
	
	function editAction() {
		showDialog({});
	}
	
	function showDialog(model) {
		var dialog = viewResolver.createDialog('#verificationDialogContainer', verificationDialog, model, function(){
		
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