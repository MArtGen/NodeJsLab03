var shop = require ('./classes/shop.ts');
var buyer = require ('./classes/buyer.ts');
var fs = require ('fs-extra');
var mysql = require('mysql');

interface SqlConnect {
    createTodo(body: string, res: any);
    readTodo(tablename: string, res: any);
    updTodo(body: string, res: any);
    deleteTodo(tablename: string, res: any);
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
        //Удаляем поле(я)
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
    createTodo(body: string, res: any) {
        throw new Error("Method not implemented.");
    }    
    readTodo(tablename: string, res: any) {
        throw new Error("Method not implemented.");
    }
    updTodo(body: string, res: any) {
        throw new Error("Method not implemented.");
    }
    deleteTodo(tablename: string, res: any) {
        throw new Error("Method not implemented.");
    }
}

function newData(res) {
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

    var order: {'id_order': number, "order_cost": number}[] = new Array();
    connect.query('INSERT INTO orders VALUES ?', order, function (err: any, result: any) {
        if (err) {
            console.log(err.toString());
            res.end(err.toString());
        };
    });
    var shop: {'id_buyer': number, 'id_order': number}[] = new Array();
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

module.exports = {
    SqlReq, SqlOrm, newData
}