var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trendy' });
});


/*Navigate to browse page */
router.get("/browse",function(req,res){
  res.render('browse',{title: 'Browse'})
});

/*GET login page*/
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function (req,res,next) {
    console.log("Trying to log in");
    
        var USERNAME = req.body.user;
        var PASSWORD = req.body.pass;
        console.log(USERNAME + " " + PASSWORD);
        var client = new pg.Client(database);
    		pg.connect(database,function(err,client,done){
		      if(err) {
    				return console.error('could not connect to postgres', err);
  					}
  					console.log('Connected to database');
  					 var query = "SELECT * FROM Users WHERE username='%NAME%' AND password='%PASSWORD%';".replace("%NAME%", USERNAME).replace("%PASSWORD%", PASSWORD);
  					  client.query(query, function(error, result){

            console.log(result);
            console.log(error);
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
            }
            else if (result.rowCount === 0){
                res.send(false); 
                return;
            } else {
                res.send(true); 
                console.log("Query success");
                return;
            }
        })
    })
});

/*GET register page*/
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function (req,res,next) {
    console.log("Trying to log in");
    	  var NAME = req.body.name;
        var USERNAME = req.body.user;
        var PASSWORD = req.body.pass;
        console.log(USERNAME + " " + PASSWORD);
        var client = new pg.Client(database);
    		pg.connect(database,function(err,client,done){
		      if(err) {
    				return console.error('could not connect to postgres', err);
  					}
  					console.log('Connected to database');
  					 var query = "INSERT INTO Users (Username,RealName, Password) VALUES (USERNAME, NAME, PASSWORD)";
  					  client.query(query, function(error, result){

            console.log(result);
            console.log(error);
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
            }
            else{
                res.send(true); 
                return;
            } 
        })
    })
});

/*GET sell page*/
router.get('/sell', function(req, res) {
  res.render('sell', { title: 'Sell' });
});

/*GET profile page*/
router.get('/profile', function(req,res){
	res.render('profile', {title: 'Profile'});
});
module.exports = router;
