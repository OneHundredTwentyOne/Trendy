var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var userName = null;

/*Navigate to browse page */
// router.get("/",function(req,res){
//   res.render('browse', { title: 'Browse', username: userName });
// });

router.get("/",function(req,res) {
  var items = [];
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock", function (err, result) {
      console.log("fuckboi");
      // For each item
      for (i = 0; i < result.rows.length; i++) {
        // Add item
        var item = {
          uid: result.rows[i].uid,
          label: result.rows[i].label,
          summary: result.rows[i].summary,
          price: result.rows[i].price,
        };
        items.push(item);
        console.log(items);
      }
    });

    query.on('end', function () {
      res.render('browse', {title: "Browse", items: items});
      done();
    })
  })
});

module.exports = router;