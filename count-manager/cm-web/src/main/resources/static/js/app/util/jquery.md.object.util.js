define(['jquery'], function($) {
	(function ($) {
	  
	  /**
	   * Returns array index or -1 when it doesn't find a match
	   */
	     $.mdInArray = function (objectToFind, objectArray, property) {
	    	 
	    	 var result = -1;
	    	 
	    	 $.each(objectArray, function(index, objInArray) {
	    		 if(objectToFind[property] === objInArray[property]) {
	    			 result = index;     
	    			 return false;
	    		 }
	    	 });
	    	 
	    	 return result;
	     };  
	  
	     /**
	      * Returns a new array that contains all objects in arrayToRemoveFrom
	      * that are not in arrayOfObjectsToRemove
	      */
	     $.mdRemove = function (arrayToRemoveFrom, arrayOfObjectsToRemove, property) {      
	    	 return $.grep(arrayToRemoveFrom, function(targetObject, index) { 
	    		 var ojectIndex = $.mdInArray(targetObject, arrayOfObjectsToRemove, property);
			       /**
			        * If targetObject is not in arrayOfObjectsToRemove then we
			        * need to return true as we want to keep it in the 
			        * returned array
			        */
			    return (ojectIndex === -1);
	    	 });          
	     };              
	 
	})($);
});