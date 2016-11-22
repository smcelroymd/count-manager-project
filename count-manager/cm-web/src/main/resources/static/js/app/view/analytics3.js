define(['text!view/analytics3.html',
		'text!dialog/electoralAreaDataDialog.html',
		'util/viewResolver',
		'util/eventHandler',
		'app/model',
		'googlecharts'], function (view, electoralAreaDataDialog, viewResolver, eventHandler, model) {
		
	var dialogConfigurations = {
			"numberOfBallotBoxes" : {
				"dataTableFunction" : getNumberOfBallotBoxesTableData,
				"model" : {
					"title" : "Total Number of Ballot Boxes"					
				}
			},
			"numberReceived" : {
				"dataTableFunction" : getNumberReceivedTableData,
				"model" : {
					"title" : "Number Received"
				}
			},
			"numberInProgress" : {
				"dataTableFunction" :  getNumberInProgressTableData,
				"model" : {
					"title" : "Number In Progress"
				}
			},
			"numberCompleted" : {
				"dataTableFunction" :  getNumberCompletedTableData,
				"model" : {
					"title" : "Number Completed"
				}
			},
			"numberAwaitingVerification" : {
				"dataTableFunction" : getNumberAwaitingVerificationTableData,
				"model" : {
					"title" : "Number Received"
				}
			}
	};
	
	function onComplete() {
		
		$('.clickable').off('click').on('click', function(e) {
			var dialogConfigName = $( e.target ).closest( ".clickable" ).attr('data-dialog');
			showDialog(dialogConfigurations[dialogConfigName]);
		});
								
		/**
		 * 
		 */
		eventHandler.trigger({'type' : 'updateAnalyticValuesEvent', 'eventData' : {}});	
				
	}
	
	
	function showDialog(dialogConfig) {
		
		var dialog = viewResolver.createDialog('#electoralAreaDataDialogContainer', electoralAreaDataDialog, dialogConfig.model, function(){

			drawTable(dialogConfig);

//			$('#electoralAreaDataDialogTabs a').on('shown.bs.tab', function(event){
//				var id = $(event.target).attr("id"); 
//				if(id === "summaryChartAnchor") {
//					drawChart();					
//				}
//		    });			
//			  
//  		  	$(window).resize(function(){
//  		  		drawChart();
//  		  	});
			
			/**
		     * Tear down the view once hidden
		     */
		    $('#electoralAreaDataDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
			$('#electoralAreaDataDialog').modal();
		});			
	}
	
	function drawChart() {
	      google.charts.load('current');   // Don't need to specify chart libraries!
	      google.charts.setOnLoadCallback(drawVisualization);
	      
	      function drawVisualization() {
	    	  var wrapper = new google.visualization.ChartWrapper({
	    		  chartType: 'PieChart',
	    		  dataTable: [['Electoral Area Ballot Boxes', 'Number of Boxes'],
	              ['Aldershot', 23],
	              ['Basingstoke', 47],
	              ['Eastleigh',  30]],
	              options: { 
	            	  'pieHole': 0.4,
	            	  'tooltip' : { trigger: 'none' },
	            	  'chartArea': {'height': '80%', 'left': "0" },
	            	  'pieSliceText' : 'value'
	            	  //'colors' :['#337ab7', '#dff0d8', '#d9edf7', '#fcf8e3', '#f2dede']
	              },
	              containerId: 'summaryChart'
	    	  });
	          wrapper.draw();
	      }
	}
	
	function drawTable(dialogConfig) {
		$('#summaryTable').DataTable({
			"lengthChange": false,
			"bFilter" : false,
			"paging":   false,
			 "info": false,
			"data" : dialogConfig.dataTableFunction(),
			"columnDefs" : [
				{
					'targets' : 0,
					'data' : 'electoralArea',
					'width' : "80%"
				},
				{
					'targets' : 1,
					'data' : 'numberOfBoxes',
					'width' : "20%"
				}
			]

		});
	}
	
	function getNumberOfBallotBoxesTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 
		return data.electoralAreaBoxNumbers
	}
	
	function getNumberReceivedTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberReceivedByElectoralArea;
	}

	function getNumberInProgressTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberInProgressByElectoralArea;
	}
	
	function getNumberCompletedTableData() {
		return {};
	}
	
	function getNumberAwaitingVerificationTableData() {
		return {};
	}
	
	function show() {
				
		/**
		 * Show the view
		 */				
		viewResolver.show(view, onComplete);	
	}
		
	return {
		show : show
	};
});
