var express = require('express');
var router = express.Router();
var pg = require('pg').native;
var database =  "postgres://mxoilrnicwhdji:OhBRE_r8LgodxHHZ_ROjGFukd4@ec2-54-163-248-14.compute-1.amazonaws.com:5432/d8dqj27651vg99";
var username = null;
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


router.get('/', function(req,res){
    var client = new pg.Client(database);
    var users = [];
    username = localStorage.getItem("username");
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var query = "SELECT * FROM USERS WHERE username = '%NAME%';".replace("%NAME%", username);
        console.log("Username is: " + username);
        client.query(query, function(error, result){
            if(error) {
                console.error('Query failed');
                console.error(error);
                return;
            }
            for (var i = 0; i < result.rows.length; i++) {
                var user = {
                    username: result.rows[i].username,
                    realname: result.rows[i].realname,
                    email: result.rows[i].email,
                    address: result.rows[i].address
                };
                users.push(user);
            }
            console.log(users);
            res.render('editDetails', { title: 'My Account', users: users, username: username });
        })
    })
});

router.post('/', function(req,res){
    var client = new pg.Client(database);
    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    var user;
    var users =[];
    pg.connect(database,function(err,client,done){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('Connected to database');
        var query = "SELECT * FROM USERS WHERE username = '%NAME%';".replace("%NAME%", username);
        console.log("Username is: " + username);
        client.query(query, function(error, result){
            for (var i = 0; i < result.rows.length; i++) {
                user = {
                    username: result.rows[i].username,
                    realname: result.rows[i].realname,
                    email: result.rows[i].email,
                    address: result.rows[i].address
                };
                users.push(user);
            }
            if(name!=user.realname && name!=null && name!=""){
                console.log("New name is: " +name);
                query = "UPDATE USERS SET REALNAME = '%NAME%' WHERE USERNAME = '%USERNAME%';".replace('%NAME%',name).replace('%USERNAME%', username);
                client.query(query, function(error,result){
                    console.log("Reaching new query");
                });
            }
            if(email!=user.email && email!=null && email!=""){
                console.log("New email is: " +email && email!="");
                query = "UPDATE USERS SET EMAIL = '%EMAIL%' WHERE USERNAME = '%USERNAME%';".replace('%EMAIL%',email).replace('%USERNAME%', username);
                client.query(query, function(error,result){
                    console.log("Reaching new query");
                });
            }
            if(address!=user.address && address!=null && address!=""){
                console.log("New address is: " +address);
                query = "UPDATE USERS SET ADDRESS = '%ADDRESS%' WHERE USERNAME = '%USERNAME%';".replace('%ADDRESS%',address).replace('%USERNAME%', username);
                client.query(query, function(error,result){
                    console.log("Reaching new query");
                });
            }
            res.render('accountDetails', { title: 'My Account', username: username, users: users });
        });
    });
});

module.exports = router;
