var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  
  //res.send("hello")
  if(req.query.name == null){
  res.send("Hello anonymous")
  }
  else{
  res.send("Hello " +req.query.name)
  }
});

module.exports = router;
