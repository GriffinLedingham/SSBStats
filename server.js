/**************************************
	Requiring like it's nobody's
	business
***************************************/

var options = require("nomnom")
    .option('prod', {
        flag: true,
        default: false,
        help: 'Build for the Development Environment'
    })
    .parse();

var IS_DEVELOPMENT = !options.dev;

var crypto = require('crypto');
var fs = require('fs')
var http = require('http');
var express = require('express');
var app = express();
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});
app.post('/recent', function(req, res){
	// res.send({a:1, b:2});
	getRecentGames(req.body.token, req.body.start, req.body.limit, function(data){
		res.send(data);
	});
});
app.post('/mygames', function(req, res){
	// res.send({a:1, b:2});
	getMyGames(req.body.token, req.body.start, req.body.limit, function(data){
		res.send(data);
	});
});
app.post('/score', function(req, res){
	submitScore(req.body.token,
				req.body.p1_char, req.body.p1_score,
				req.body.p2_char, req.body.p2_score,
				req.body.p3_char, req.body.p3_score,
				req.body.p4_char, req.body.p4_score,
				req.body.winner,
				function(response){
					res.send(response);
					res.end();
				});
});
app.post('/account',function(req,res){
	createUser(req.body.username,req.body.password, req.body.email,function(response){
		res.send(response);
		res.end();
	});
});
app.post('/loginrequest',function(req,res){
	// console.log('hi');
	loginUser(req.body.username,req.body.password,function(response,token){
		if(response === true)
		{
			if(typeof token !== 'undefined' && token !== null)
			{
				if(IS_DEVELOPMENT === true)
				{
					res.cookie('access_token', token, { domain: null, maxAge: 90000000000});
				}
				else
				{
					res.cookie('access_token', token, { domain: '.ssbstats.com', maxAge: 90000000000});
				}
				res.send(response);
				res.end();
			}
		}
		else
		{
			res.send(response);
			res.end();
		}
	});
});
var server = http.createServer(app);
var mysql = require('mysql');
var config = require('./js/config');
server.listen(3000);  
var db = mysql.createConnection({
    host: config.host_name,
    user: config.user,
    password : config.password,
    database : config.database
}); 

/**************************************
	Whew, done setting globals
***************************************/

function submitScore(token, p1_char, p1_score, p2_char, p2_score, p3_char, p3_score, p4_char, p4_score, winner, fn)
{
	var query = db.query("SELECT u_id, token FROM users WHERE token='"+token+"'", function(err,info){
	
		if(err === null && info.length !== 0)
		{
			var score_object = {p1: null, p2: null, p3: null,p4: null,
				k1: null,k2: null,k3: null,k4: null, win: null};

			score_object.u_id = info[0].u_id;

			if(p1_char != '' && p1_char != '-1' && isNumber(parseInt(p1_char)) &&
				p1_score != '' && isNumber(parseInt(p1_score)))
			{
				score_object.p1 = p1_char;
				score_object.k1 = p1_score;
			}

			if(p2_char != '' && p2_char != '-1' && isNumber(parseInt(p2_char)) &&
				p2_score != '' && isNumber(parseInt(p2_score)))
			{
				score_object.p2 = p2_char;
				score_object.k2 = p2_score;
			}

			if(p3_char != '' && p3_char != '-1' && isNumber(parseInt(p3_char)) &&
				p3_score != '' && isNumber(parseInt(p3_score)))
			{
				score_object.p3 = p3_char;
				score_object.k3 = p3_score;
			}

			if(p4_char != '' && p4_char != '-1' && isNumber(parseInt(p4_char)) &&
				p4_score != '' && isNumber(parseInt(p4_score)))
			{
				score_object.p4 = p4_char;
				score_object.k4 = p4_score;
			}

			if(winner != '' && winner != '-1' && isNumber(parseInt(winner)))
			{
				score_object.win = winner;
			}

			var query = db.query('INSERT INTO games SET ?', score_object, function(err,result){
				if(err === null)
				{
					fn(true);
				}
				else
				{
					fn(err);
				}
			});
		}
	});
}

function getRecentGames(token, start, limit, fn)
{
	limit = parseInt(limit) + 1;
	var query = db.query("SELECT u_id, token FROM users WHERE token='"+token+"'", function(err,info){
	
		if(err === null && info.length !== 0)
		{
			var query = db.query("SELECT id,p1,p2,p3,p4,k1,k2,k3,k4,win FROM games ORDER BY id DESC LIMIT "+start+", "+limit, function(err,info){
				fn(info);
			});
		}
	});
}

function getMyGames(token, start, limit, fn)
{
	limit = parseInt(limit) + 1;
	var query = db.query("SELECT u_id, token FROM users WHERE token='"+token+"'", function(err,info){
	
		if(err === null && info.length !== 0)
		{
			var query = db.query("SELECT id,p1,p2,p3,p4,k1,k2,k3,k4,win FROM games WHERE u_id='"+info[0].u_id+"' ORDER BY id DESC LIMIT "+start+", "+limit, function(err,info){
				fn(info);
			});
		}
	});
}

function createUser(username,password,email,fn)
{
	var pass_crypt = crypto.createHash('sha256').update(password).digest("hex");
	var user_object = {uname: username, password: pass_crypt, token:guid(), email:email};
	var query = db.query('INSERT INTO users SET ?', user_object, function(err,result){
		if(err === null)
		{
			fn(true);
		}
		else
		{
			fn(err);
		}
	});
}

function loginUser(username,password,fn)
{
	// console.log(crypto.createHash('sha256').update(password).digest("hex"));
	var query = db.query("SELECT uname, password, token, email FROM users WHERE uname='"+username+"'", function(err,info){
		// console.log(info);
		if(err === null && info.length !== 0)
		{
			var pass_key = info[0].password;
			var pass_in = crypto.createHash('sha256').update(password).digest("hex");
			if(pass_key === pass_in)
			{
				//Good to go
				fn(true,info[0].token);
			}
			else
			{
				fn({code:'WRONG_PASSWORD'});
			}
		}
		else if(err !== null)
		{
			fn(err);
		}
		else
		{
			fn({code:'NO_USR_ENTRY'});
		}
	});
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
	.toString(16)
	.substring(1);
};

function guid() {
	return s4() + s4() + s4() + s4()+
	s4() + s4() + s4() + s4();
}

function mysql_real_escape_string (str) {
	return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
		switch (char) {
			case "\0":
			return "\\0";
			case "\x08":
			return "\\b";
			case "\x09":
			return "\\t";
			case "\x1a":
			return "\\z";
			case "\n":
			return "\\n";
			case "\r":
			return "\\r";
			case "\"":
			case "'":
			case "\\":
			case "%":
                return "\\"+char; 
              }
                              });
}

function asyncLoop(iterations, func, callback) {
	var index = 0;
	var done = false;
	var loop = {
		next: function() {
			if (done) {
				return;
			}
			if (index < iterations) {
				index++;
				func(loop);
			} 
			else {
				done = true;
				callback();
			}
		},
		iteration: function() {
			return index - 1;
		},
		break: function() {
			done = true;
			callback();
		}
	};
	loop.next();
	return loop;
}

function getDate(ts){
	var a = new Date(ts);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = ('0' + a.getHours()).slice(-2);
	var min = ('0' + a.getMinutes()).slice(-2);
	var sec = ('0' + a.getSeconds()).slice(-2);
	var time = month+' '+date+', ' +year+', '+hour+':'+min ;
	return time;
}

function isNumber(o) {
    return typeof o === 'number' && isFinite(o);
}