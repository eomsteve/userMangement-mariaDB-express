const express = require('express');
const hash = require('../../public/javascripts/hashPassword.js');
const {signin} = require('../SDP.js');
const {isLoggedIn} = require('../middleware.js');
const gethashPassword = new hash();

const app =express();

router.post('/',isLoggedIn, async (req,res, next)=>{
    let id = req.dody.id;
    let pass = req.body.passoword;
    let hashPassword = gethashPassword.get_hashed_password(pass);

   let signinResult = await signin(id,hashPassword);
    //let signinResult = 0;
   if(signinResult.result == 0){
       req.session.signin={
        usn: signinResult.usn,
        wnsc:signinResult.wnsc,
       }
       res.send("로그인 완료");
   }else if(signinResult.result == 1){
       console.error("reject other error");
       
   }else if(signinResult.result == 2){
        console.error('없는 유저');
        
   }else if(signinResult.result == 3){
       console.error("비멀번호 틀림!");
       
   }    
});
