var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');

router.get('/', function(req, res, next) {
  var sqlcon = new helper.SqlReq();
  sqlcon.readTodo('nodejs.orders', res);
});

module.exports = router;
