
const exp = require ('express');
const pug = require('pug');
const bdPars = require('body-parser'); //body parser
const methodOverride = require('method-override'); //method override
const pgp = require('pg-promise')();
const db = pgp('postgres://lesliebehum@localhost:5432/proj2_users_db');
const app = exp();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

//configure express and related packages
// app.engine('html', mstE());
app.set('view engine', 'pug');
// app.set('view engine','html');
app.set('views',__dirname + '/views');
app.locals.pretty = true
app.use('/', exp.static(__dirname + '/public'));
app.use(methodOverride('_method')) //method override
app.use(bdPars.urlencoded({ extended: false })); //body parser
app.use(bdPars.json()); //body parser

//start the server
app.listen(8080, function(){
  console.log('im aliiiive!! on 8080');
});

app.get('/', function(req, res) {
  res.render('index');
});



