const express = require('express');
const path = require('path');
const cookieParser =require('cookie-parser');
const veri = require('../../public/javascripts/codeGenerator.js');
const { duplicate } =require('../SDP.js');
const mailer = require('express-mailer');
const router = express.Router();
require('dotenv').config();
// const bcrypt = require('bcrypt');

const app = express();
app.set('views', path.join('/Users/seonghyuneom/dev/userMangement/', 'views'));
app.set('view engine', 'pug');


mailer.extend(app, {
  
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAILAR_ID,
    pass: process.env.MAILAR_PASS
  }
});

router.post('/' ,function(req, res, next) {
  let id = req.body.id;
  let firstName =req.body.firstName;
  let lastName =req.body.lastName;
  let password =req.body.password;
  let address =req.body.address;
  let phone =req.body.phone;
  let tempCode = new veri();
  let verificationCode =  tempCode.getVerificationCode();

  req.session.signup={
    id: id,
    firstName: firstName,
    lastName: lastName, 
    phone:phone,
    address: address, 
    password: password,
    tempCode:verificationCode
}
  console.log(process.env.MAILAR_ID);
  
  app.mailer.send('email', {
    to: id, 
    from: '"no-reply" <no-reply@example.com>',
    subject: '회원가입 인증코드',
    tempCode:verificationCode,
   }, function (err) {
    if (err) {
     // handle errorconsole.log(err);
     res.send(err);
     return;
    }
    res.render('form', { title: '확인',
                        id: id,
                        firstName: firstName,
                        phoneNumber:phone,
                        lastName: lastName, 
                        address: address, 
                        password: password,
                        tempCode:verificationCode
                         });
   });
   

});

router.post('/verification', function(req, res, next) {
  let temp = req.body.num;
  let confirm = req.session.signup.tempCode;
  if(temp == confirm){
      // duplicate
      // storeSessioninfo(req.session.signup.id,)  
      req.session.destroy(
         (err) =>{
            if (err) {
                console.log('세션 삭제시 에러');
                return;
            }
            
            console.log('세션 삭제 성공');
            res.redirect('/');
        }
        
    ); 

  }else{
     res.send('인증번호가 틀립니다. 다시확인해 주세요');
    
    }
});

module.exports = router;
