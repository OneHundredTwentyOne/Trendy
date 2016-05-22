var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

router.get('/', function(req, res) {
	var search = req.query.search;
	// If no search 
	if(search == undefined){
		var cat = req.query.typeid;
		var gen = req.query.gender;
		//If no categories and no search
		if(cat == undefined && gen == undefined){
		  var items = [];
		  username = localStorage.getItem("username");
  		  pg.connect(database, function (err, client, done) {
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
        });
        //if no search and categories
      }else if(gen == undefined){
  		 	cat = "'" + req.query.typeid + "'";
  			//if no search and categories and gender
			if(cat.localeCompare('clothes')| cat.localeCompare('shoes')| cat.localeCompare('accessories')| cat.localeCompare('swimwear')){
  				pg.connect(database, function (err, client, done) {
    			var category =[];
    			username = localStorage.getItem("username");
    			var query = client.query("SELECT * FROM Stock WHERE category =" +cat, function (err, result) {
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
  				//if no search and categories are products
  			}else if(cat == undefined){
  				pg.connect(database, function (err, client, done) {
    			// Query items
    			var gender =[];
    			username = localStorage.getItem("username");
    			var query = client.query("SELECT * FROM Stock WHERE gender =" +gen, function (err, result) {
    	
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
        		var str = "All "+ cat;
    			res.render('browse', {title: str, items: gender});
  				})
  				});
  			}}
  	//if search		
	}else {
		var items = [];
		  username = localStorage.getItem("username");
  		  pg.connect(database, function (err, client, done) {
        var query = client.query("SELECT * FROM Stock WHERE LOWER(label) LIKE '%" + search +"%'", function (err, result) {
        	console.log(query);
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
         var str = items.length + " results from search: " + search + "";
    		res.render('browse', {title: str, items: items});
        });
	})
	}
});

module.exports = router;