var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');

router.get('/', function(req, res, next) {
  var sqlcon = new helper.SqlOrm();
  sqlcon.readTodo('shop', res, req);
});

module.exports = router;
