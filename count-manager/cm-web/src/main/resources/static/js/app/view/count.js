define(['jquery',
		'text!view/count.html',	
		'text!dialog/countDialog.html',	
		'util/viewResolver',
		'app/model',
		'util/eventHandler',
		'moment',
		'bootstrap',  
		'datatables.net',
		'datatables.net-bs',
		'datatables.net-responsive',
		'datatables.net-responsive-bs',
		'datatables.net-select',
		'datatables.net-buttons',
		'datatables.net-buttons-bs'
		], function ($, view, countDialog, viewResolver, model, eventHandler, moment) {
	
	var table = null;
	
	function onComplete() {
		
		createTable();
		
		model.getRactive().observe('countElectoralArea', function(newValue, oldValue, keypath){
			update();
			redrawTable();
		},{'init':false});
		
		model.getRactive().observe('refreshResultsTable', function(newValue, oldValue, keypath){
			redrawTable();
		},{'init':false});
	}
	
	function redrawTable() {
		table.destroy(true);
		createTable();		
	}
	
	function createTable() {
		
		$("<table></table").addClass("table table-striped table-bordered dt-responsive nowrap").attr({"id":"resultsTable","cellspacing":"0","width":"100%"}).appendTo("#resultsTableContainer");
		
		table = $('#resultsTable').DataTable({
			"order": [[ 0, "asc" ]],
			"lengthChange": false,
			"searching": false,
			"paging": false,
			"info": false,
			"data" : getData(), 
			"buttons": [{text: 'Add Votes/Recount', action: editAction}, {text: 'Download', action: downloadAction}],		
			"select": {style: 'single'},				
			"columnDefs" : columnDefs()
		});
		
		table.buttons().container().appendTo('#resultsTable_wrapper .col-sm-6:eq(0)');	
	}
		
	
	function columnDefs() {
		
		var columnDefs = [
			{
				'targets' : 0,
				'visible': false,
				'searchable': false,
				'data' : 'displayOrder'
			}, {
				"title": "Candidates",
				'targets' : 1,
				'width' : "40%",
				'render' : function ( data, type, obj, meta ) {
					return obj.firstName + "&nbsp;<strong>" + obj.surname + "</strong>";
				}
			}
			];
		
		var candidates = getData();						
		var numberOfCounts = candidates[0].votes.length;				
				
		for(var index = 0; index < numberOfCounts; index++) {
			columnDefs.push({
					"title": (index === 0 ? "Votes" : "Recount " + index),
					'targets' : index+2,
					'data' : 'votes',
					'render' : function ( data, type, obj, meta ) {
						return data[meta.col-2] || "";
					}
				});
		}
		
		return columnDefs;
	}	
	
	function getData() {
		var selectedElection = model.get('selectedElection');	
		var electoralArea = model.get('countElectoralArea');
		var allCandidates = model.get('electionData[' + selectedElection + '].candidates');		
		var candidates = $.mdGrep(allCandidates, {"electoralArea" : electoralArea}, "electoralArea");						
		return addTotals(candidates);			
	}	
	
	
	function addTotals(data) {	
		var result = data;
		if(data[0].votes.length > 0) {
			var totalData = getTotalData(data);
			if(totalData.votes.length > 0) {
				result = data.concat(totalData);
			}			
		}
		return result;
	}
	
	function getTotalData(candidates) {
		return {
			"displayOrder" : candidates.length+1, 
			"electoralArea" : "",
			"firstName" : "", 
			"surname" : "TOTAL", 
			"votes" : getTotals(candidates)
		};				
	}
	
	function getTotals(candidates) {
		var numCounts = candidates[0].votes.length;
		var totals = [];
		
		for(var count = 0; count < numCounts; count++) {
			var countTotal = 0;
			
			$.each(candidates, function( index, candidate ) {
				countTotal += parseInt(candidate.votes[count]);
			});
			
			totals.push(countTotal);
		}
		
		return totals;
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){	
		
		var candidates = [];
		var selectedElection = model.get('selectedElection');	
		var electoralArea = model.get('countElectoralArea');
		var allCandidates = model.get('electionData[' + selectedElection + '].candidates');		
		var modelCandidates = $.mdGrep(allCandidates, {"electoralArea" : electoralArea}, "electoralArea");
				
		$.each(modelCandidates, function( index, obj ) {
			candidates.push({
				"electoralArea" : obj.electoralArea,
				"firstName" : obj.firstName,
				"surname" : obj.surname,
				"votes" : ''
			});
		});
		
		var dialogModel  = {
				"candidates" : candidates,
				"electoralArea" : model.get('countElectoralArea'),
				"formatName" : function ( firstName, surname ) {
					return firstName + "&nbsp;<strong>" + surname + "</strong>";
				}
		}
		showDialog(dialogModel);
	}

	function downloadAction(electoralArea) {			
		eventHandler.trigger({'type' : 'generateProvisionalCountEvent', 'eventData' : {}});			
	}
	
	function showDialog(model) {
		var dialog = viewResolver.createDialog('#countDialogContainer', countDialog, model, function() {		
			
			$('#saveBtn').off('click').on('click', function() {
				eventHandler.trigger({'type' : 'saveVotesEvent', 'eventData' : model});
		    });
			
			
			$('#countDialog').modal();
		});		
	}			
	
	function update() {
		var eventData = {'electoralArea' : model.get('countElectoralArea')};		
		eventHandler.trigger({'type' : 'findTotalBallotPapersInBallotBoxesEvent', 'eventData' : eventData});		
	}
	
	function show(type) {
		update();
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});