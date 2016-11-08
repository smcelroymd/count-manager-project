define(['Ractive',
	    'app/model'], function (Ractive, model) {
	
	function show(view,onComplete) {
		
		if (model.getRactive() != null) {
			model.getRactive().teardown();
		}
		
		model.setRactive(new Ractive({
			el : '#main-panel-content',
			template : view,
			oncomplete: onComplete,
			data : model.data
		}));
	}
	
	return {
		show : show
	};
});
