var loopback = require('loopback');

module.exports = function(Customer) {
	Customer.check = function(data, cb) {
		var ctx = loopback.getCurrentContext();
		ctx.set('tenantid', 'ev');
		console.log('current Context Before Rest :', ctx);
		Customer.callRest(function(err, response) {
			console.log('current Context After Rest :', ctx);
			console.log("response is :", response);
			cb(null, response);
		});
	}

	//define the remote method
	Customer.remoteMethod(
		'check', {
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
				path: '/check',
				verb: 'post'

			}
		}
	);
};