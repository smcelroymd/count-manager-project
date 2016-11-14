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
				
		$('#deleteCountRowModal').off('click').on('click', '#deletebtn', function (e){
			eventHandler.trigger({'type' : 'deleteVerificationCount'})
			console.log("Delete triggered");
		});
	}
	
	function newAction() {
		var model = {
			'update' : false,
			"derry" : {
				'123' : {
					'countID': '1',
		    		'bpaValue': '200',
		    		'countValue': '',
		    		'status': 'false'
				}
			}
		};
		
		showDialog({'update' : false,
	    			'countID': '1',
	    			'bpaValue': '200',
	    			'countValue': '',
	    			'status': 'false'});
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){				
		var model = datatable.row( { selected: true } ).data();
		model["update"] = true;
		showDialog(model);
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