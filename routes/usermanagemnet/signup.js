const express = require('express');
const path = require('path');
const cookieParser =require('cookie-parser');
const veri = require('../../public/javascripts/codeGenerator.js');
const { duplicate,singupStore } =require('../SDP.js');
const mailer = require('express-mailer');
const router = express.Router();
const hash = new require('../../public/javascripts/hashPassword.js');
require('dotenv').config();
// const bcrypt = require('bcrypt');

let hashPassword = new hash();


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
  let birth =req.body.birth;
  let tempCode = new veri();
  let verificationCode =  tempCode.getVerificationCode();
  
 if(duplicate(id)==0){
 
  req.session.signup={
    id: id,
    firstName: firstName,
    lastName: lastName, 
    phone:phone,
    address: address, 
    password: password,
    tempCode:verificationCode,
    birth: birth
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
  }else{
    alert('id가 중복입니다.');
    res.redirect('/');
  }

});

router.post('/verification', function(req, res, next) {
  let SIS = req.session.signup;
  let temp = req.body.num;
  let confirm = SIS.tempCode;
   
  if(temp == confirm){

      if(duplicate(id) == 0){
        SIS.password = hashPassword.get_hashed_password(SIS.password).then(
        sotreResult =  singupStore(SIS.firstName, SIS.lastName, SIS.address, SIS.phone, SIS.id,SIS.password,SIS.birth))    
          if(singupStore()==0){
            req.session.destroy(
              (err) =>{
                 if (err) {
                     console.log('세션 삭제시 에러');
                     return;
                 }
                 req.session.signup;
                 console.log('세션 삭제 성공');
                 res.redirect('/');
             });
          }
      }else{
        console.error("아이디가 중복입니다. 처음부터 다시 회원가입 해 주세요");
        
      }
    
      
  }else{
     res.send('인증번호가 틀립니다. 다시확인해 주세요');
    
    }
});


module.exports = router;
