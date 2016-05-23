var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var items = [];
var selling = null;

router.get('/', function(req,res){
    console.log("Swag");
    items = [];
    var client = new pg.Client(database);
    username = localStorage.getItem("username");
    console.log("Username is: " + username);
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var query = "SELECT * FROM PURCHASED WHERE username = '%NAME%';".replace("%NAME%",username);
        client.query(query,function(error,result){
            if(error){
                console.error("Query failed");
                console.error(error);
                return;
            }
            for (var i = 0; i < result.rows.length; i++) {
                var item = {
                    uid: result.rows[i].uid,
                    image: result.rows[i].image,
                    label: result.rows[i].label,
                    description: result.rows[i].description,
                    price: result.rows[i].price,
                    sellername: result.rows[i].sellername,
                    ordernum: result.rows[i].ordernum,
                    tracking: result.rows[i].tracking
                };
                items.push(item);
            }
            selling = items;
            console.log(items);
            res.render('myOrders', { title: 'My Orders', username: username, selling: selling });
        });
    });
});

module.exports = router;