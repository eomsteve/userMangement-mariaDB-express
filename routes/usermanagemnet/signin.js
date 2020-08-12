const express = require('express');
const hash2 = require('../../public/javascripts/hashPassword.js');
const {wSignin,passwordCheck} = require('../SDP.js');
// const {isLoggedIn} = require('../middleware.js');
let hashPassword = new hash2();

const app =express();

const router = express.Router();


router.post('/', async (req,res, next)=>{
    let id = req.body.id;
    let pass = await req.body.password;
    let dbPass = await passwordCheck(id);
    if(dbPass.result ==0){

        let compareResult = hashPassword.check_password(pass,dbPass.password);
        if(compareResult){
        let signinResult = await wSignin(id);
          if(signinResult.result ==0){
           req.session.signin={
            usn: signinResult.usn,
            wnsc:signinResult.wnsc,
           }
           res.send("로그인 완료");
        }else if(signinResult.result == 1){
            console.error("reject other error");
        }
           
       }else{
           console.error("비멀번호 틀림!");
           
       }    
    }else{
        console.error("없는 유저입니다.");
        
    }
    

  
});

router.get('/')

module.exports = router;