var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

router.get('/', function(req, res) {
	var search = req.query.search;
	// If no search then display everything
	if(search == undefined){
		var cat = req.query.typeid;
		if(cat == undefined){
		  var items = [];
		  username = localStorage.getItem("username");
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock", function (err, result) {
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
        items.push(item);
      }
      var str = "All Products";
    res.render('browse', {title: str, items: items});
  })
  });}else if(cat != 'women' | cat != 'men'){
  	var cat2 = "'" + req.query.typeid + "'";
  	pg.connect(database, function (err, client, done) {
    // Query items
    var category =[];
    username = localStorage.getItem("username");
    var query = client.query("SELECT * FROM Stock WHERE category =" +cat2, function (err, result) {
    	console.log("CAT3:" + cat2);
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
        category.push(item);
        }
        var str = "All "+ cat;
    res.render('browse', {title: str, items: category});
  })
  });
  }else if(cat == 'women' | cat == 'men'){
  	var cat3 = "'" + req.query.typeid + "'";
  	pg.connect(database, function (err, client, done) {
    // Query items
    var gender =[];
    username = localStorage.getItem("username");
    var query = client.query("SELECT * FROM Stock WHERE gender =" +cat3, function (err, result) {
    	
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
        gender.push(item);
        }
        var str = "All "+ cat3;
    res.render('browse', {title: str, items: gender});
  })
  });
  }
	} else {
		var searchA = [];
		username = localStorage.getItem("username");
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
          price: result.rows[i].price,
          sellername: result.rows[i].sellername,
			description: result.rows[i].description
        };
					searchA.push(item);
				}
			});

			query.on('end', function(){
				var str = "- " + searchA.length + " Results from search '" + search + "'";
				res.render('browse', {title: str, items: searchA});
				done();
			});
		});
	}

});

module.exports = router;
