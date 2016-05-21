var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


/*GET login page*/
router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});


router.post('/', function (req,res,next) {
		  console.log("Trying to log in");
    		
        var USERNAME = req.body.user;
        var PASSWORD = req.body.pass;
        username = req.body.user;
        var fail = "Failed to login. Please try again.";
        console.log(fail);
        console.log(USERNAME + " " + PASSWORD);
        var client = new pg.Client(database);
    		pg.connect(database,function(err,client,done){
		      if(err) {
    				return console.error('could not connect to postgres', err);
  					}
  					console.log('Connected to database');
  					 var query = "SELECT * FROM Users WHERE username='%NAME%' AND password='%PASSWORD%';".replace("%NAME%", USERNAME).replace("%PASSWORD%", PASSWORD);
  					  client.query(query, function(error, result){
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
            }
            else if (result.rowCount === 0){
                res.render('login', { title: 'Login', username: username, failed: fail });
                return;
            } else {
                localStorage.setItem("username",username);
            	 res.render('profile', { title:  'Profile', username: username });
                console.log("Query success");
                return;
            }
        })
    })
});

module.exports = router;