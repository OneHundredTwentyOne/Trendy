var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var userName = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

/*GET register page*/
router.get('/', function(req, res) {
  res.render('register', { title: 'Register' });
});
router.post('/', function (req,res,next) {
    console.log("Trying to log in");
    	  var NAME = req.body.realname;
        var USERNAME = req.body.user;
        var PASSWORD = req.body.pass;
        console.log(USERNAME + " " + PASSWORD);
        var client = new pg.Client(database);
    		pg.connect(database,function(err,client,done){
		      if(err) {
    				return console.error('could not connect to postgres', err);
  					}
  					console.log('Connected to database');
  					 var query = ("INSERT INTO Users (Username, RealName, Password) VALUES ($1, $2, $3)");
  					  client.query(query,[USERNAME, NAME, PASSWORD], function(error, result){

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

module.exports = router;