var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');
var bodyParser = require("body-parser");

router.post('/neworder', function(req, res, next) {
    var sqlcon = new helper.SqlReq();
    sqlcon.createTodo(JSON.stringify(req.body), res);
});

router.post('/cancord', function(req, res, next) {
    var sqlcon = new helper.SqlReq();
    sqlcon.deleteTodo(JSON.stringify(req.body), res);
});

router.put('/newcost', function(req, res, next) {
    var sqlcon = new helper.SqlReq();
    sqlcon.updTodo(JSON.stringify(req.body), res);
});

router.get('/newdata', function(req, res, next) {
    helper.newData(res);
});

module.exports = router;