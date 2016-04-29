var controller;

module.exports = function(app) {
  app.controller(ctrl).remoteMethod('speak', {
    http: { path: '/', verb: 'get' },
    returns: { arg: 'msg', type: 'string', root: true },
  });
};

function ctrl(app, ctx) {
  this.name = 'TestName';
  this.app = app;
  this.ctx = ctx;
};

ctrl.speak = function(cb) {
  cb(null, Boolean(this.ctx).toString());
};
