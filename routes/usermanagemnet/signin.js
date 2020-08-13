const express = require('express');
const hash2 = require('../../public/javascripts/hashPassword.js');
const {wSignin,aSignin,passwordCheck} = require('../SDP.js');
const path = require('path');
// const {isLoggedIn} = require('../middleware.js');
let hashPassword = new hash2();

const app =express();

const router = express.Router();

app.set('views', path.join('/Users/seonghyuneom/dev/userMangement/', 'views'));
app.set('view engine', 'pug');


router.post('/:type', async (req,res, next)=>{
    let id = req.body.id;
    let type = req.params.type;
    let pass = await req.body.password;
    let dbPass = await passwordCheck(id);
    let signinResult;
    if(dbPass.result ==0){

        let compareResult = hashPassword.check_password(pass,dbPass.password);
        if(compareResult){
            if(type == "web"){
                 signinResult = await wSignin(id);
            }else{
                 signinResult = await aSignin(id);
            }
        
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

router.get('/',(req, res, next)=>{
    res.render('signin');
})

module.exports = router;