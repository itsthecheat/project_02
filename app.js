const exp = require('express');
const pug = require('pug');
const bdPars = require('body-parser'); //body parser
const methodOverride = require('method-override'); //method override
const pgp = require('pg-promise')();
const db = pgp('postgres://lesliebehum@localhost:5432/proj2_users_db');
const app = exp();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const session = require('express-session');

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
app.get('/', function(req, res) { //check session
  var logged_in;
  var email;

  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }
  res.render('sign_in/login', data);
});
//create new user
app.get('/create', function(req, res) {
  res.render('sign_in/create');
});
app.post('/create', function(req, res) {
    var data = req.body;

    bcrypt.hash(data.password, 10, function(err, hash) {
      db.none(
        "INSERT INTO users (email, password) VALUES ($1, $2)", [data.email, hash]
      ).then(function() {
        res.render('sign_in/create_success');
      })
    });
  })
  //login
app.post('/login', function(req, res) {
  var data = req.body;

  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function() {
    res.render('sign_in/error')
  }).then(function(user) {
    bcrypt.compare(data.password, user.password, function(err, cmp) {
      if (cmp) {
        req.session.user = user;
        res.render('sign_in/login');
      } else {
        res.render('sign_in/error')
      }
    });
  });
});
//logout
app.get('/logout', function(req, res) {
  req.session.destroy();
      res.render('sign_in/logout');
  });
