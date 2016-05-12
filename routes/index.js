var express = require('express');
var router = express.Router();

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

/*GET register page*/
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

/*GET sell page*/
router.get('/sell', function(req, res) {
  res.render('sell', { title: 'Sell' });
});
module.exports = router;
