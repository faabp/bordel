const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const userRouter = require('./user')


// Create Redis Client
const client = require('./dbClient')

client.on('connect', function(){
  console.log('Connected to Redis...');
});

// Init app
const app = express();

// Set Port
const port = process.env.PORT || 3000

client.on("error", (err) => {
  console.error(err)
})

// View Engine\
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// Search Page
app.get('/', function(req, res, next){
  res.render('searchusers');
});

// Search processing
app.post('/user/search', function(req, res, next){
  let id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;
  console.log(id + " " + first_name + " " + last_name+ " " + email + " "+ phone);

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.render('searchusers', {
        error: 'User does not exist'
      });
    } else {
      obj.id = id;
      res.render('details', {
        user: obj
      });
    }
  });
});

// Add Delete User Page
app.get('/delete', function(req, res, next){
  res.render('deleteuser');
});

// Add User Page
app.get('/user/add', function(req, res, next){
  res.render('adduser');
});

// Process Add User Page
app.post('/user/add', function(req, res, next){
  let id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;
  console.log(id + " " + first_name + " " + last_name+ " " + email + " "+ phone);
  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], function(err, reply){
    if(err){
      console.log(err);
	  respObj = {
        status: "error",
        msg: err.message
      }
	  return res.status(400).json(respObj)
    }
    console.log(reply);
    res.redirect('/');
  });
});

// Search processing
app.post('/delete', function(req, res, next){
  let id = req.body.id;

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.render('deleteuser', {
        error: 'User does not exist'
      });
    } else {
	obj.id = id;
    client.del(obj.id);
	res.redirect('/');
    }
  });
});

const server = app.listen(port, function(){
  console.log('Server started on port '+port);
});

module.exports = server
