require.config({
	paths: {
		'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min',
		//'bootstrap' : 'lib/bootstrap.min',
		'bootstrap' : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',		
		'Ractive': 'http://cdn.ractivejs.org/latest/ractive',
		'bootstrapwizard' : 'lib/jquery.bootstrap.wizard.min',
		'jquery-validate' : 'lib/jquery.validate.min',
		'crossroads' : 'lib/crossroads.min',
		'hasher' : 'lib/hasher.min',
		'signals' : 'lib/signals.min',
		'Cookies' : 'lib/js.cookie',	
		'underscore' : 'lib/underscore-min',
		'moment' : 'lib/moment.min',
		'util' : 'app/util',
		'view' : 'app/view',
		'dialog' : 'app/view/dialog',
		'command' : 'app/command',
		'service' : 'app/service',
		'datatables.net' : 'https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min',
		'datatables.net-bs' : 'https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min',  
		'datatables.net-responsive' : 'https://cdn.datatables.net/responsive/2.1.0/js/dataTables.responsive.min',
		'datatables.net-responsive-bs' : 'https://cdn.datatables.net/responsive/2.1.0/js/responsive.bootstrap.min',
		'datatables.net-select' : 'https://cdn.datatables.net/select/1.2.0/js/dataTables.select.min',
		'datatables.net-buttons' :'https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min',
		'datatables.net-buttons-bs' : 'https://cdn.datatables.net/buttons/1.2.2/js/buttons.bootstrap.min',
		'datatables.net-sum' : 'https://cdn.datatables.net/plug-ins/1.10.13/api/sum().js',
		'googlecharts' : 'https://www.gstatic.com/charts/loader',
	},
	shim: {
        'bootstrap' : {
            deps : [ 'jquery'],
            exports: 'Bootstrap'
        },
        'googlecharts' : {
        	exports : 'googlecharts'
        }
   }	
});

require([ 'app/setup' ]);