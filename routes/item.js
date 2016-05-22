var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var sellername = "";
var image = "";
var label = "";
var price = 0;
var size = "";

/*GET item page*/
router.get("/",function(req,res) {
	username = localStorage.getItem("username");
  var id = parseInt(req.query.itemid);
  console.log(id);
  pg.connect(database, function (err, client, done) {
    // Query items
    var query = client.query("SELECT * FROM Stock WHERE uid = " + id, function (err, result) {
        var item = {
          uid: result.rows[0].uid,
          image: result.rows[0].image,
          label: result.rows[0].label,
          description: result.rows[0].description,
          price: result.rows[0].price,
          size: result.rows[0].size,
          sellername: result.rows[0].sellername
        };
      image=result.rows[0].image;
      label= result.rows[0].label;
      price= result.rows[0].price;
      size= result.rows[0].size;
      sellername= result.rows[0].sellername;
    res.render('item', {title: 'Item', items: item});
  })
  });
});

router.post('/', function (req,res,next) {
  console.log("Adding to cart");
  var client = new pg.Client(database);
  pg.connect(database,function(err,client,done){
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    console.log('Connected to database');
    var query = ("INSERT INTO Cart (sellername,image,label,size,price) VALUES ($1, $2, $3, $4, $5)");
    client.query(query,[sellername,image,label,size,price], function(error, result){
      console.log(sellername);
      console.log(error);
      if(error) {
        console.error('Query failed');
        console.error(error);
        return;
      }
      else{
        localStorage.setItem("username",username);
        res.render('item', { title:  'Item', items:item });
        return;
      }
    })
  })
});


module.exports = router;