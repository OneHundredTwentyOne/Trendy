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

module.exports = router;
