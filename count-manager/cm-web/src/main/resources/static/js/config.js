require.config({
	paths: {
		jquery : 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min',
		bootstrap : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',
		Ractive: 'http://cdn.ractivejs.org/latest/ractive',
		crossroads : 'lib/crossroads.min',
		hasher : 'lib/hasher.min',
		signals : 'lib/signals.min',
		Cookies : 'lib/js.cookie',		
		util : 'app/util',
		view : 'app/view',
		command : 'app/command',
		service : 'app/service'
	},
	shim: {
        bootstrap : {
            deps : [ 'jquery'],
            exports: 'Bootstrap'
        }
   }	
});

require(['app/setup']);