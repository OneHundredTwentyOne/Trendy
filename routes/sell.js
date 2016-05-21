var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var fileName = "";
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });
router.use(upload.single('file'));

/*GET sell page*/
router.post('/',upload.single('file'), function(req, res) {
  username = localStorage.getItem("username");
  var FILE = req.body.file;
  console.log(FILE);
  var LABEL = req.body.label;
  var SIZE = req.body.size;
  var PRICE = req.body.price;
  var DESCRIPTION = req.body.description;
  var SELLERNAME = username;
  var CATEGORY = req.body.category;
  var CONDITION = req.body.condition;
  var client = new pg.Client(database);
  pg.connect(database, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }
    console.log('Connected to database');
    var query = ("INSERT INTO Stock (image, label, size, price, description, sellername, category, condition) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)");
    client.query(query, [FILE, LABEL, SIZE, PRICE, DESCRIPTION, SELLERNAME, CATEGORY, CONDITION], function (error, result) {
      console.log(result);
      console.log(error);
      if (error) {
        console.error('Query failed');
        console.error(error);
        return;
      }
      else {
        res.render('profile',{title: 'Profile', username: username});
        return;
      }
    })
  });
});

router.get("/", function(req,res){
  username = localStorage.getItem("username");
  res.render('sell', {title: 'Sell', username: username});
});

module.exports = router;