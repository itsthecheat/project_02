const dotenv = require('dotenv').config({path: 'keys.env'});
const exp = require('express');
const pug = require('pug');
const bdPars = require('body-parser'); //body parser
const methodOverride = require('method-override'); //method override
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://lesliebehum@localhost:5432/proj2_users_db');
const app = exp();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const session = require('express-session');
const PORT = process.env.PORT || 8080;
const fetchUrl = require('fetch').fetchUrl;
const request = require('request');

//KEYS
var NEWS_KEY = process.env.NEWS_KEY
var WU_KEY = process.env.WU_KEY
var RIJK_KEY = process.env.RIJK_KEY

//configure express and related packages
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.pretty = true
app.use('/', exp.static(__dirname + '/public'));
app.use(methodOverride('_method')) //method override
app.use(bdPars.urlencoded({
  extended: false
})); //body parser
app.use(bdPars.json()); //body parser

//start the server
app.listen(8080, function() {
  console.log('im aliiiive!! on 8080');
});
//start sessions
app.use(session({
    secret: 'blarghblahbleckblah',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  }))

//start routes
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/login', function(req, res) {
  res.render('sign_in/login');
});
app.get('/create', function(req, res) {
  res.render('sign_in/create');
});
app.get('/news', function(req, res){
  res.render('happy');
})
app.get('/museum', function(req, res){
  res.render('art');
})

//NEWS API
app.get('/article', function(req, res){
  var api = 'https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey='+NEWS_KEY;
  request(api, function(err, resp, body) {
  body = JSON.parse(body);
  // pass back the results to client side
  news = body.articles[0]
  res.send(news);
   // console.log(data)
  });
});

//RIJKS API
app.get('/rijks', function(req, res){
  var val = req.query.search;
  var api = 'https://www.rijksmuseum.nl/api/en/collection?q='+val+'&key='+RIJK_KEY+'&format=json';
  request(api, function(err, resp, body) {
  body = JSON.parse(body);
  // pass back the results to client side
  res.send(body);
  });
});

//check session
app.get('/', function(req, res) {
  var logged_in;
  var email;
  var data = {
    "logged_in": logged_in,
    "email": email
  }
  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
    res.redirect('/login', data);
  } else {
    res.redirect('/');
  }
});

//create new user
app.post('/create', function(req, res) {
    var data = req.body;
    bcrypt.hash(data.password, 10, function(err, hash) {
      db.none(
        "INSERT INTO users (email, password) VALUES ($1, $2)", [data.email, hash]
      ).then(function() {
        res.redirect('/login')
      })
    });
});

//user login
app.post('/', function(req, res) {
  var data = req.body;
  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function(err) {
    res.render('sign_in/error')
  }).then(function(user) {
    bcrypt.compare(data.password, user.password, function(err, cmp) {
      if (cmp) {
        req.session.user = user;
        app.locals.user = user.email;
        res.redirect('/login');
      } else {
        res.render('sign_in/error')
      }
    });
  });
});

//user logout
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.render('sign_in/logout');
});
