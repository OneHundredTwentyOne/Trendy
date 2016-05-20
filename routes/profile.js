var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var userName = null;
var buy = null;

/*GET profile page*/
router.get('/', function(req,res){
    var client = new pg.Client(database);
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var query = "SELECT * FROM stock";
        client.query(query, function(error, result){
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
            }
            buy = result;
        })
    })
    res.render('profile', { title: 'Profile', username: userName });
});


module.exports = router;