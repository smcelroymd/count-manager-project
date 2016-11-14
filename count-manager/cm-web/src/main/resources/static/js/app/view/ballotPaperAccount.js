define([ 'jquery', 
		'text!view/ballotPaperAccount.html', 
		'text!dialog/ballotPaperAccountDialog.html',
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
		'datatables.net-buttons-bs' ], function($, view, ballotPaperAccountDialog, viewResolver, model, eventHandler) {

	function onComplete() {
		
		var table = $('#ballotPaperAccountTbl').DataTable({
			lengthChange : false,
			select: {
			     style: 'multi'
			    },
			data: model.get('ballotPaperAccount.data'),
				buttons: [
				 {extend : 'selectAll',text : 'Select All'},
				 {extend : 'selectNone', text : 'Select None'},
				 {text: 'New', action: newAction},
				 {text: 'Edit', action: editAction},
				 {text: 'Delete', action: deleteAction}
			],
			columnDefs : [
				{'targets' : 0,'data' : 'totalReceived'},
				{'targets' : 1,'data' : 'nextSerialNumber'},
				{'targets' : 2,'data' : 'serialCorresponding'},
				{'targets' : 3,'data' : 'totalBallotsIssued'},
				{'targets' : 4,'data' : 'spoiltReplacement'},
				{'targets' : 5,'data' : 'issuedNotSpoilt'},
				{'targets' : 6,'data' : 'totalUnusedBallot'},
				{'targets' : 7,'data' : 'tenderedTotalReceived'},
				{'targets' : 8,'data' : 'totalMarkedPlaced'},
				{'targets' : 9,'data' : 'totalSpoiltPlaced'},
				{'targets' : 10,'data' : 'totalUnusedPlaced'},
				{'targets' : 11,'data' : 'postalEarlyTotal'},
				{'targets' : 12,'data' : 'postalSweepTotal'}
				]
			   });
		
		table.buttons().container().appendTo( '#ballotPaperAccountTbl_wrapper .col-sm-6:eq(0)' );
		
		model.getRactive().observe('ballotPaperAccount.data', function(newValue, oldValue, keypath) {
		    table.clear();
		    table.rows.add(newValue);
		    table.rows().invalidate().draw();
		   }, {'init':false});

	}
	
	function newAction(){
		var model = {'update':false,
				'totalReceived' : '',
				'nextSerialNumber' :'',
				'serialCorresponding' : '',
				'totalBallotsIssued' : '',
				'spoiltReplacement' : '',
				'issuedNotSpoilt' : '',
				'totalUnusedBallot' : '',
				'tenderedTotalReceived' : '',
				'totalMarkedPlaced' : '',
				'totalSpoiltPlaced' : '',
				'totalUnusedPlaced' : '',
				'postalEarlyTotal' : '',
				'postalSweepTotal' : '',
				'postalLateTotal' : ''};
		showDialog(model);
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
		
		var model = datatable.row( { selected: true } ).data();
		model.update = "true";
		
		showDialog(model);
	}
	
	function deleteAction(event, datatable, buttonClicked, buttonConfig ) {
		  var objectsToDelete = datatable.rows( { selected: true } ).data();
		  eventHandler.trigger({'type' : 'deleteBallotPaperAccountsEvent', 'objectsToDelete' : objectsToDelete});
		 }
	
	function showDialog(model){
		var dialog = viewResolver.createDialog('#ballotPaperAccountDialogContainer', ballotPaperAccountDialog, model, function(){
				$('#addBallotPaperAccountBtn').off('click').on('click', function() {
					eventHandler.trigger({'type' : 'addBallotPaperAccountEvent', 'eventData' : model});
			    });
			    
			    $('#editBallotPaperAccountBtn').off('click').on('click', function (e) {
			    	eventHandler.trigger({'type' : 'editBallotPaperAccountEvent', 'eventData' : model});
			    });
			
			/**
		     * Tear down the view once hidden
		     */
		    $('#ballotPaperAccountDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
			$('#ballotPaperAccountDialog').modal();
		});
	}

	function show() {
		viewResolver.show(view, onComplete);
	}

	return {
		show : show
	};
});
