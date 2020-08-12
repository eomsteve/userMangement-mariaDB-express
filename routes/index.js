var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.signin.wnsc == 0){
  res.render('index', { title: "Express!" });
  }else{
    res.render('index',{ title:req.session.signin.usn});
  }
});

module.exports = router;
