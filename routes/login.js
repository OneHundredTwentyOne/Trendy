var express = require('express');
var router = express.Router();
var pg = require('pg').native;

var database = "postgres://Trendy:test@depot:5432/trendyDatabase";

router.post('/login', function (req,res,next) {
	pg.connect(database, function(err, client, done){
		var uName = req.query.user;
		var pass = req.query.pass;
		console.log(uName + " " + pass);
		var QUERY = "SELECT * FROM Users WHERE username='%NAME%' AND password='%PASSWORD%';".replace("%NAME%", uName).replace("%PASSWORD%", pass);
	        if(err){
            console.error('Could not connect to the database');
            console.error(err);
            return;
        }
        console.log("Connected to db");
	}
	
	client.query(QUERY, function(err, res){
		if(res.rowCount === 0){
				res.send(false);
				return;	
			}
		else{
			res.send(true);
			return;		
		}
		})
	});
