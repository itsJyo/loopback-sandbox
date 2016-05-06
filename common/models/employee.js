module.exports = function(Employee) {
var loopback = require('loopback');

 Employee.createEmployee = function(data, cb) {
 //get the loopback current context
		var ctx = loopback.getCurrentContext();
		//setting some dummy value
		ctx.set('tenantid', 'ev');
		//logging the current context before rest call
		console.log('current Context Before Create :', ctx);
		var data={"empName": "John","designation": "developer"}
		Employee.create(data,function(err,repsonse){
		console.log('current Context after create :', ctx);
		if(err){
		cb(err);
		}
		cb(null, 'success... ' ,data);
		});
      
    }

Employee.remoteMethod(
    'createEmployee', 
    {
       accepts: {arg: 'data', type: 'object'},
       returns: {arg: 'status', type: 'boolean'},
       http: {path: '/createEmployee', verb: 'get'}
     }
);
};
