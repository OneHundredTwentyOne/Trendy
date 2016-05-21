var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/', function(req, res, next) {
    username = localStorage.getItem("username");
     var items = [];
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock", function (err, result) {
      for (var i = 0; i < 6; i++) {
        var item = {
          uid: result.rows[i].uid,
          image: result.rows[i].image,
          label: result.rows[i].label,
          summary: result.rows[i].summary,
          price: result.rows[i].price
        };
        items.push(item);
      }
    res.render('index', {title: 'Home', items: items});
  })
});
});

module.exports = router;
