var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var userName = null;

/*Navigate to browse page */
router.get("/",function(req,res){
  res.render('browse', { title: 'Browse', username: userName });
});


module.exports = router;