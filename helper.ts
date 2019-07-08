var shop = require ('./classes/shop.ts');
var buyer = require ('./classes/buyer.ts');
var fs = require ('fs-extra');
var mysql = require('mysql');
var Model = require('./lab03orm/models/models.ts');

interface SqlConnect {
    createTodo(body: string, res: any, req: any);
    readTodo(tablename: string, res: any, req: any);
    updTodo(body: string, res: any, req: any);
    deleteTodo(tablename: string, res: any, req: any);
}

class SqlReq implements SqlConnect {

    createTodo(body: string, res: { end: (arg0: string) => void; }) {
        let connect = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "nodejs",
            insecureAuth : true
        });

        try { 
            var text = JSON.parse(body); 
        }
        catch(e) { 
            console.log ('Error of JSON.parse. Please check the data.' + '\n' + e);
            res.end('Error of JSON.parse. Please check the data.');
            return;
        };

        connect.connect(function(err: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
        });

        var order = {'id_order': text.id_order, "order_cost": text.cost};
        connect.query('INSERT INTO orders SET ?', order, function (err: any, result: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
        });
        var shop = {'id_buyer': text.id_buyer, 'id_order': text.id_order}
        connect.query('INSERT INTO shop SET ?', shop, function (err: any, result: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
            console.log("Result: " + JSON.stringify(result));
            res.end("Result:" + '\n' + JSON.stringify(result));
            connect.end();
        });
    };

    readTodo(tablename: string, res: any) {
        let connect = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "nodejs",
            insecureAuth : true
        });
        connect.connect(function(err: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
        });
        connect.query("SELECT * FROM " + tablename, function (err: any, result: any, fields: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
            console.log(JSON.stringify(result));
            res.end("Result:" + '\n' + JSON.stringify(result));
            connect.end();
        });
    }
    updTodo(body: string, res: { end: (arg0: string) => void; }) {
        let connect = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "nodejs",
            insecureAuth : true
        });
        try { 
            var text = JSON.parse(body); 
        }
        catch(e) { 
            console.log ('Error of JSON.parse. Please check the data.' + '\n' + e);
            res.end('Error of JSON.parse. Please check the data.');
            return;
        };
        connect.connect(function(err: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
        });
        connect.query("UPDATE orders SET order_cost = " + text.cost + " WHERE id_order = " + text.id_order, function (err: any, result: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
            console.log(JSON.stringify(result));
            res.end("Result:" + '\n' + JSON.stringify(result));
            connect.end();
        });
    };
    deleteTodo(body: string, res: any) {
        let connect = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "nodejs",
            insecureAuth : true
        });
        try { 
            var text = JSON.parse(body); 
        }
        catch(e) { 
            console.log ('Error of JSON.parse. Please check the data.' + '\n' + e);
            res.end('Error of JSON.parse. Please check the data.');
            return;
        };
        connect.connect(function(err: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
        });
        //Удаляем поле
        connect.query("DELETE FROM orders WHERE id_order = " + text.id_order, function (err: any, result: any) {
            if (err) {
                console.log(err.toString());
                res.end(err.toString());
            };
            console.log(JSON.stringify(result));
            res.end("Result:" + '\n' + JSON.stringify(result));
            connect.end();
        });
    }
}

class SqlOrm implements SqlConnect {

    createTodo(res: any, req: any) {
        Model.Orders
            .create({
                id_order: req.body.id_order,
                order_cost: req.body.order_cost
            })
            .catch(e => {
                console.log(e.message);
            })
        Model.Shop
            .create({
                id_buyer: req.body.id_buyer,
                id_order: req.body.id_order,
            })
            .catch(e => {
                console.log(e.message);
            })
            .then(result => {
                res.end(JSON.stringify(result));
            });
    };

    readTodo(tablename: string, res: any, req: any) {
        if (tablename === 'orders') {
            Model.Orders
                .findAll()
                .catch(e => {
                    console.log(e.message);
                })
                .then(result => {
                    res.end(JSON.stringify(result))

                });
        } else if (tablename === 'shop') {
            Model.Shop
                .findAll()
                .catch(e => {
                    console.log(e.message);
                })
                .then(result => {
                    res.end(JSON.stringify(result));
                });
        };
    };

    updTodo(res: any, req: any) {
        Model.Orders
        .update(
            {
                order_cost: req.body.order_cost
            }, 
            {
                where: {id_order: req.body.id_order}
            }
        )
        .catch(e => {
            console.log(e.message);
        })
        .then(result => {
            res.end(JSON.stringify(result))
        });
    };

    deleteTodo(res: any, req: any, all: string) {
        if (all !== "all") {
            Model.Orders
            .destroy({
                where: {id_order: req.body.id_order,}
            })
            .catch(e => {
                console.log(e.message);
            })
            .then(result => {
                res.end(JSON.stringify(result))
            });
        } else {
            Model.Orders
            .destroy()
            .catch(e => {
                console.log(e.message);
            })
            .then(result => {
                res.end(JSON.stringify(result))
            });
        };
    };
}

function newData(res: any) {
    let order: { id_order: number, order_cost: number }[] = new Array();
    let shop: { id_buyer: number, id_order: number}[] = new Array();
    let n: number = 1000000;
    for (let i = 0; i < 500000; i++) {
        order.push({id_order: n, order_cost: Number(generateRow(5))});
        shop.push({id_buyer: Number(generateRow(6)), id_order: order[i].id_order});
        n++;
    };

    Model.Orders
    .bulkCreate(order)
    .then(()=> { console.log ('OK')})

    Model.Shop
    .bulkCreate(shop)
    .then(()=> { console.log ('OK')})
};

function generateRow(length) {
    let result           = '';
    // Не очень красиво, но зато быстро.
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 };

module.exports = {
    SqlReq, SqlOrm, newData
}