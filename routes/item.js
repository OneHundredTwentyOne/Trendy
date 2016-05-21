var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


/*GET item page*/
router.get("/",function(req,res) {
	username = localStorage.getItem("username");
  var id = parseInt(req.query.itemid);
  console.log(id);
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock WHERE uid = " + id, function (err, result) {
        var item = {
          uid: result.rows[0].uid,
          image: result.rows[0].image,
          label: result.rows[0].label,
          description: result.rows[0].description,
          price: result.rows[0].price,
        };
    res.render('item', {title: 'Item', items: item});
  })
  });
});



module.exports = router;