var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');
var bodyParser = require("body-parser");

router.post('/newbuyer', function(req, res, next) {
    var sqlcon = new helper.SqlOrm();
    sqlcon.createTodo('orders', res, req);
});

router.delete('/cancord', function(req, res, next) {
    var sqlcon = new helper.SqlOrm();
    sqlcon.deleteTodo(res, req);
});

router.delete('/', function(req, res, next) {
    var sqlcon = new helper.SqlOrm();
    sqlcon.deleteTodo(res, req, "all");
});

router.put('/neworders', function(req, res, next) {
    var sqlcon = new helper.SqlOrm();
    sqlcon.updTodo(res, req);
});

router.get('/newdata', function(req, res, next) {
    helper.newData(res);
});

module.exports = router;