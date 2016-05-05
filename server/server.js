var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});



var expApp = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

expApp.use(bodyParser.json()); // for parsing application/json
expApp.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

expApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

expApp.post('/profile', upload.array(), function(req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
expApp.put('/profile', upload.array(), function(req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

expApp.listen(3001, function() {
  console.log('Ready at 3001');
});