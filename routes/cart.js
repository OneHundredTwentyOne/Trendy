var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var totalPrice = 0;
var items = [];

/*GET profile page*/
router.get('/', function(req,res){
    totalPrice  = 0;
    items = [];
    username = localStorage.getItem("username");
    pg.connect(database, function (err, client, done) {
        var query = client.query("SELECT * FROM CART WHERE USERNAME = '%username%';".replace('%username%',username), function (err, result) {
            for (var i = 0; i < result.rows.length; i++) {
                var item = {
                    uid: result.rows[i].uid,
                    image: result.rows[i].image,
                    label: result.rows[i].label,
                    size: result.rows[i].size,
                    summary: result.rows[i].summary,
                    price: result.rows[i].price,
                    sellername: result.rows[i].sellername,
                    description: result.rows[i].description
                };
                totalPrice = +totalPrice + +result.rows[i].price;
                items.push(item);
            }
            res.render('cart', { title: 'Cart', username: username, items: items, totalPrice: totalPrice });
        })
    });
});

router.post('/', function (req,res,next) {
    var client = new pg.Client(database);
    username = localStorage.getItem("username");
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var ordernum = Math.floor(Math.random() * 1000000000);
        var tracking = Math.floor(Math.random() * 1000000000);
        for(var i = 0; i<items.length;i++){
        console.log("Adding to purchased");
        var itemToAdd = items[i];
        var query = ("INSERT INTO Purchased (sellername,image,label,size,price, ordernum, tracking, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)");
        client.query(query,[itemToAdd.sellername,itemToAdd.image,itemToAdd.label,itemToAdd.size,itemToAdd.price,ordernum, tracking, username], function(error, result){
            console.log(error);
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
                }
            else{
                localStorage.setItem("username",username);
                res.render('purchase', { title:  'Order Confirmed'});
                return true;
                }
            })
        }
    })
});

module.exports = router;