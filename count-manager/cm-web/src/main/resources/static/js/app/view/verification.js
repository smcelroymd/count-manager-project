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
	
	
	function getReportJson() {
		
	    var box1 = {"number" : "Postal 1", "pollingStation" : "", "ballotPaperAccountValue" : "1181", "boxValue" : "1181"};
	    var box2 = {"number" : "Postal 2", "pollingStation" : "", "ballotPaperAccountValue" : "34", "boxValue" : "34"};
	    var box3 = {"number" : "Postal 3", "pollingStation" : "", "ballotPaperAccountValue" : "21", "boxValue" : "21"};
	    var box4 = {"number" : "64/CFA", "pollingStation" : "St. Francis Church, Linden Road", "ballotPaperAccountValue" : "709", "boxValue" : "709"};
	    var box5 = {"number" : "65/CFB", "pollingStation" : "Kings Norton Girls school, Selly Oak Road", "ballotPaperAccountValue" : "708", "boxValue" : "708"};
	    var box6 = {"number" : "66/CFC", "pollingStation" : "Village Hall, Woodlands Park Road", "ballotPaperAccountValue" : "530", "boxValue" : "530"};
	    var box7 = {"number" : "67/CFD", "pollingStation" : "Masefield Hall, Masefield Square", "ballotPaperAccountValue" : "349", "boxValue" : "349"};
	    var box8 = {"number" : "68/CFE", "pollingStation" : "St. Jospeh and St. Helen Parish Hall, 84 Northfield Road", "ballotPaperAccountValue" : "757", "boxValue" : "757"};
	    var box9 = {"number" : "69/CFF", "pollingStation" : "Friends Meeting House, 23A Watford Road", "ballotPaperAccountValue" : "613", "boxValue" : "613"};
	    var box10 = {"number" : "70/CFG", "pollingStation" : "Cotteridge Junior and Infant School, Breedon Road", "ballotPaperAccountValue" : "445", "boxValue" : "445"};
	    var box11 = {"number" : "61/CFH", "pollingStation" : "Stirchley Primary School, Pershore Road", "ballotPaperAccountValue" : "607", "boxValue" : "606"};
	    var box12 = {"number" : "71/CFH", "pollingStation" : "CFI Community Centre, 171 Pineapple Road", "ballotPaperAccountValue" : "511", "boxValue" : "512"};
	    var box13 = {"number" : "72/CFI", "pollingStation" : "The Ascension Church Hall, Pineapple Grove", "ballotPaperAccountValue" : "506", "boxValue" : "506"};
	    var box14 = {"number" : "73/CFJ", "pollingStation" : "Hub Hazelwell, adj. Hazelwell Church, 318 Vicarage Road", "ballotPaperAccountValue" : "442", "boxValue" : "442"};
	    var box15 = {"number" : "75/CFL", "pollingStation" : "Methodist Church Hall, Cob Lane", "ballotPaperAccountValue" : "535", "boxValue" : "535"};

	    return { 
	    		"name" : "Bournville",
	    		"ballotBoxes" : [box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15 ]
	    };
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