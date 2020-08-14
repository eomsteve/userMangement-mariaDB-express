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

router.post('/' ,async function(req, res, next){
  let id = req.body.id;
  let duplicateResult = await duplicate(id);
  let firstName =req.body.firstName;
  let lastName =req.body.lastName;
  let password =req.body.password;
  let address =req.body.address;
  let phone =req.body.phone;
  let birth =req.body.birth;
  let tempCode = new veri();
  let verificationCode =  tempCode.getVerificationCode();
  
  
  // console.log(duplicate(id) + Date.now());
  console.log(duplicateResult);
  

  if(duplicateResult==0){
 
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
 
  
    app.mailer.send('email', {
     to: id, 
     from: '"no-reply" <no-reply@example.com>',
     subject: '회원가입 인증코드',
     tempCode:verificationCode,
    }, 
    function (err) {
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
  }else if(duplicateResult == 3){
    console.log('id중복');
    
    res.send('Id 중복!');
  }

});

router.post('/duplicateid', async (req, res) => {
  let idCheck = req.body.id;
  let duplicateResult = await duplicate(idCheck);
  return duplicateResult;
});

router.post('/verification', async function(req, res, next) {
  let SIS = req.session.signup;
  let id = SIS.id;
  let temp = req.body.num;
  let confirm = SIS.tempCode;
  let duplicateResult = await duplicate(id);
  if(temp == confirm){

      if(duplicateResult == 0){
        SIS.password = hashPassword.get_hashed_password(SIS.password);
        
        
       sotreResult = await singupStore(SIS.firstName, SIS.lastName, SIS.address, SIS.phone, SIS.id,SIS.password,SIS.birth);    

      if(sotreResult==0){
        
        req.session.destroy((err)=>{
          try{
            req.session["signup"];
            res.clearCookie(req.sessionID);
            res.send('session destroied,');

          }catch{
            console.error(err);
            
          }
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
