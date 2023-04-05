var express = require('express');
var router = express.Router();
const fs = require('fs');



router.get('/', function(req, res, next) {
    const aboutJson = require('../content/about.json')
    res.send(aboutJson)
});

module.exports = router;
