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
	
	var countType = "used";
	
	function onComplete(){	
		
		var selectedElection = model.get('selectedElection');	
		var table = $('#verificationTbl').DataTable({
			"lengthChange" : false,
		    "language": {
		        "search": "_INPUT_",
		        "searchPlaceholder": "Search..."
		    },						
			"select": {
			     style: 'single'
			},
			"data": getData(),//model.get('electionData[' + selectedElection + '].verificationData'),
			"buttons" : [
				{text: 'Verify', action: verifyAction},
				{
		            extend: 'collection',
		            text: 'Download',
		            buttons: [
		                {
		                	text: 'Acocks Green Ward',
		                	action: function () {
		                		downloadAction('Acocks Green Ward');
		                	} 
		                },
		                {
		                	text: 'Aston Ward',
		                	action: function () {
		                		downloadAction('Aston Ward');
		                	} 
		                },
		                {
		                	text: 'Bartley Green Ward',
		                	action: function () {
		                		downloadAction('Bartley Green Ward');
		                	} 
		                }
		            ],
		            fade: true,
		            autoClose: true
		        }
			],
			columnDefs : [
				{
					'targets' : 0,
					'data' : 'electoralArea'
				},
				{
					'targets' : 1,
					'data' : 'ballotBoxNumber'
				},				
				{
					'targets' : 2,
					'data' : 'pollingStation'
				},
				{
					'targets' : 3,
					'data' : (countType === "used"  ? 'bpaCount' : "bpaUnusedCount")
				},
				{
					'targets' : 5,
					'className': "text-center",
					'render' : function ( data, type, row, meta ) {
						var difference = 0;
						if(countType === "used") {
							difference = (row.count - row.bpaCount);
						} else {
							difference = (row.count - row.bpaUnusedCount);
						}				
						return difference;
					}
				},
				{
					'targets' : 4,
					'data' : 'count'
				},				
				{
					'targets' : 6,
					'data' : 'verified',
					'className': "text-center",
					'render' : function ( data, type, row, meta ) {
						return (data === true ? "<span class='glyphicon glyphicon-ok'/>" : "<span class='glyphicon glyphicon-remove'/>");
					}
				}				
			]			
		});
		
		model.getRactive().observe('selectedElection', function(newValue, oldValue, keypath){
			updateTable(table);
		},{'init':false});
		
		model.getRactive().observe('refreshVerificationTable', function(newValue, oldValue, keypath){
			updateTable(table);	
		},{'init':false});
		table.buttons().container().appendTo( '#verificationTbl_wrapper .col-sm-6:eq(0)' );
	}	
	
	function downloadAction(electoralArea) {			
		eventHandler.trigger({'type' : 'generateFormAReportEvent', 'eventData' : {"electoralArea":electoralArea}});			
	}
	
	function updateTable(table) {
		table.clear();
		table.rows.add(getData());
		table.rows().invalidate().draw();	
	}
	
	function getData() {			
		var selectedElection = model.get('selectedElection');		
		var verificationObjs = model.get('electionData[' + selectedElection + '].verificationData')
		
		var tableData = $.grep(verificationObjs, function(verificationObj) {
			return (verificationObj.countType === countType);
		});
		
		return (tableData || [] );
	}
	
	function verifyAction(event, datatable, buttonClicked, buttonConfig){
		var model = datatable.row( { selected: true } ).data();		
		if(model !== undefined) {
			showDialog(model);			
		}
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

	function show(type) {
		countType = type;
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});