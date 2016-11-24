define(['text!view/analytics3.html',
		'text!dialog/electoralAreaDataDialog.html',
		'util/viewResolver',
		'util/eventHandler',
		'app/model',
		'googlecharts'], function (view, electoralAreaDataDialog, viewResolver, eventHandler, model) {
		
	var dialogConfigurations = {
			"numberOfBallotBoxes" : {
				"dataTableFunction" : getNumberOfBallotBoxesTableData,
				"chartFunction" : getNumberOfBallotBoxesChartData,
				"model" : {
					"title" : "Total Number of Ballot Boxes"					
				}
			},
			"numberReceived" : {
				"dataTableFunction" : getNumberReceivedTableData,
				"chartFunction" : getNumberReceivedChartData,
				"model" : {
					"title" : "Number Received"
				}
			},
			"numberInProgress" : {
				"dataTableFunction" :  getNumberInProgressTableData,
				"chartFunction" : getNumberInProgressChartData,
				"model" : {
					"title" : "Number In Progress"
				}
			},
			"numberCompleted" : {
				"dataTableFunction" :  getNumberCompletedTableData,
				"chartFunction" : getNumberCompletedChartData,
				"model" : {
					"title" : "Number Completed"
				}
			},
			"numberAwaitingVerification" : {
				"dataTableFunction" : getNumberAwaitingVerificationTableData,
				"chartFunction" : getNumberAwaitingVerificationChartData,
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
			
			initialiseCharts(dialogConfig);
			
			/**
		     * Tear down the view once hidden
		     */
		    $('#electoralAreaDataDialog').on('hidden.bs.modal', function (e) {
		    	dialog.teardown();
		    });
		    
			$('#electoralAreaDataDialog').modal();
		});			
	}
	
	function initialiseCharts(dialogConfig) {
		$('#electoralAreaDataDialogTabs a').on('shown.bs.tab', function(event){
			var id = $(event.target).attr("id"); 
			if(id === "summaryChartAnchor") {
				drawChart(dialogConfig);					
			}
	    });			
		  
	  	$(window).resize(function(){
	  		drawChart(dialogConfig);
	  	});		
	}
	
	function drawChart(dialogConfig) {
	      google.charts.load('current');   // Don't need to specify chart libraries!
	      google.charts.setOnLoadCallback(drawVisualization);
	      
	      function drawVisualization() {
	    	  var wrapper = new google.visualization.ChartWrapper({
	    		  chartType: 'PieChart',
	    		  dataTable: dialogConfig.chartFunction(),
	              options: { 
	            	  'pieHole': 0.4,
	            	  'tooltip' : { trigger: 'none' },
	            	  'chartArea': {'height': '80%', 'left': "0" },
	            	  'pieSliceText' : 'value'
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
		return data.electoralAreaBoxNumbers;
	}

	function getNumberOfBallotBoxesChartData() {
		return [['Electoral Area', 'Number of Boxes'],['Aldershot', 23],['Basingstoke', 47],['Eastleigh',  30]];
	}
	
	function getNumberReceivedTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberReceivedTableData;
	}

	function getNumberInProgressTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberInProgressTableData;
	}
	
	function getNumberCompletedTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberCompletedTableData;
	}
	
	function getNumberAwaitingVerificationTableData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberAwaitingVerificationTableData;
	}	
	
	function getNumberReceivedChartData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberReceivedChartData;
	}
	
	function getNumberInProgressChartData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberInProgressChartData;
	}
	
	function getNumberCompletedChartData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberCompletedChartData;
	}
	
	function getNumberAwaitingVerificationChartData() {
		var selectedElection = model.get('selectedElection');
		var data = model.get("electionData[" + selectedElection + "]"); 		
		return data.numberAwaitingVerificationChartData;
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
