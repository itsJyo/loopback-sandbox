var loopback = require('loopback');

module.exports = function(Customer) {
	Customer.getRemoteCustomer = function(data, cb) {
		//get the loopback current context
		var ctx = loopback.getCurrentContext();
		//setting some dummy value
		ctx.set('tenantid', 'ev');

		//logging the current context before rest call
		console.log('current Context Before Rest :', ctx);
		Customer.callRest(function(err, response) {
			//logging the current context after rest call where the active object is becoming null.
			console.log('current Context After Rest :', ctx);
			cb(null, response);
		});
	}

	//define the remote method
	Customer.remoteMethod(
		'getRemoteCustomer', {
			accepts: {
				arg: 'data',
				type: 'object',
				http: {
					source: 'body'
				}
			},
			returns: {
				type: 'object',
				root: true,
				description: 'return value'
			},
			http: {
				path: '/getRemoteCustomer',
				verb: 'post'

			}
		}
	);
};