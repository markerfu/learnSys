var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  res.render('websock', { title: 'Web sockets' });
});
router.get('/chone', function(req, res, next) {
  res.render('ch01', { title: 'Express' });
});
router.get('/chtwo', function(req, res, next) {
  res.render('ch02', { title: 'Express' });
});
module.exports = router;
