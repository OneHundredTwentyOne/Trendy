var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var orders = null;
var selling = null;


/*GET profile page*/
router.get('/', function(req,res){
    var items = [];
    var client = new pg.Client(database);
    username = localStorage.getItem("username");
    console.log("Username is: " + username);
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var query = "SELECT * FROM STOCK WHERE sellername = '%NAME%';".replace("%NAME%",username);
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
                    summary: result.rows[i].summary,
                    price: result.rows[i].price
                };
                items.push(item);
            }
            selling = items;
            console.log(items);
            res.render('myProducts', { title: 'My Products', username: username, selling: selling });
        });
    });
});

module.exports = router;