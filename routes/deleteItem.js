var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var totalPrice = 0;


router.get('/', function(req, res, next) {
    username = localStorage.getItem("username");
    res.render('deleteItem', {title: 'Delete Account'});
});

router.post('/', function(req, res) {
    pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("DELETE FROM users WHERE username='"+ username + "'", function (err, result) {
	 username = null;
    localStorage.clear();
    res.render('deletedConfirm', { title: 'Account Deleted!' , username: username});
  })
});
})

module.exports = router;