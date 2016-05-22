var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var totalPrice = 0;

/*GET profile page*/
router.get('/', function(req,res){
    totalPrice  = 0;
    var items = [];
    username = localStorage.getItem("username");
    pg.connect(database, function (err, client, done) {
        var query = client.query("SELECT * FROM CART WHERE USERNAME = '%username%';".replace('%username%',username), function (err, result) {
            for (var i = 0; i < result.rows.length; i++) {
                var item = {
                    uid: result.rows[i].uid,
                    image: result.rows[i].image,
                    label: result.rows[i].label,
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


module.exports = router;