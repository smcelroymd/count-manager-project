define(['jquery',
		'text!view/verification.html',
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
		'datatables.net-buttons-bs'], function ($, view, viewResolver, model, eventHandler) {
	
	var table = null;
	
	function onComplete(){		
		table = $('#verificationTable').DataTable();
	}
	
	function newAction() {
	}
	
	function editAction(event, datatable, buttonClicked, buttonConfig){		
	}
	
	function showDialog(model) {
	}		
	
	function show() {
		viewResolver.show(view, onComplete);
	}
	
	return {
		show : show
	};
});