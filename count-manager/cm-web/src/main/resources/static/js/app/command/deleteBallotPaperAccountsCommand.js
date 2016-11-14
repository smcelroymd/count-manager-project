define(['app/model'], function(model){
 function execute(event) {  
  var newObjectArray = $.mdRemove(model.get('ballotPaperAccount.data'), event.objectsToDelete, "id");
  model.set('ballotPaperAccount.data', newObjectArray);
 };
 
 return {
  execute : execute
 };
});