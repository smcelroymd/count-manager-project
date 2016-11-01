define(['text!view/home.html',
		'util/viewResolver'], function (view, viewResolver) {
	
	function show() {
		viewResolver.show(view);			
	}
	
	return {
		show : show
	};
});