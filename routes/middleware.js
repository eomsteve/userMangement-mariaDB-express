exports.duplicate=(req, res, next)=>{
    if(!(req.session.signup.id && mysqlquery)){
        next();
    }else{
        res.status(403).send('아이디 중복');
    }
};

exports.isLoggedIn=(req,res,next)=>{
    if(req.session.signin.wnsc){
        res.redirects('/');
    }else{
        next();
    }
}
