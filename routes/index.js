var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var userName = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trendy' });
});


router.get('/browse', function(req, res) {
	var search = req.query.search;
	// If no search then display everything
	if(search == undefined){
		  var items = [];
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock", function (err, result) {
      for (var i = 0; i < result.rows.length; i++) {
        var item = {
          uid: result.rows[i].uid,
          image: result.rows[i].image,
          label: result.rows[i].label,
          summary: result.rows[i].summary,
          price: result.rows[i].price
        };
        items.push(item);
        console.log(item.image);
      }
    res.render('browse', {title: 'Browse', items: items});
  })
  });
	} else {
		var items = [];
		pg.connect(database, function(err, client, done){
			// Query items
			var query = client.query("SELECT * FROM Stock WHERE LOWER(label) LIKE LOWER('%"+search+"%')", function(err, result) {
				// For each item
				console.log(result);
				for (i = 0; i < result.rows.length; i++) {
					// Add item
					var item = {
          uid: result.rows[i].uid,
          image: result.rows[i].image,
          label: result.rows[i].label,
          summary: result.rows[i].summary,
          price: result.rows[i].price
        };
					items.push(item);
				}
			});

			query.on('end', function(){
				var str = "- " + items.length + " Results from search '" + search + "'";
				res.render('browse', {title: str, items: items});
				done();
			});
		});
	}

});

module.exports = router;
