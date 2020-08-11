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

   
   
   
    
});
