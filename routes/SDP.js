const mariadb = require('mariadb');
require('dotenv').config();

const pool  = mariadb.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
   
    database: `protect_service`,
    
});

let conn = pool.getConnection();

exports.passwordCheck = (password) =>{
    conn.query(`CALL PASSWORD_CHECK(?)`,password,(err,result,fields)=>{
        try{
            console.log(result[0]);
            console.log('passowrd check, it match');
        }catch(err){
            console.error(err);
            
        }
    });

}

exports.duplicate = (sessionId,databaseId)=>{
    conn.query(`CALL DUPLICATE(?)`,req.session.signup.id,password,(err,result,fields)=>{
        try{
            console.log(result[0]);
            console.log('passowrd check, it match');
        }catch(err){
            console.error(err);
        }
    })
}

exports.singupStore = (fn,ln,addr,phn,id,pw,bdt) =>{
    conn.query('CALL SIGNUP_UP(?,?,?,?,?,?,?)',[fn,ln,addr,phn,id,pw,bdt],(err,result,fields) =>{
        try{
            console.log(result[0]);
            
        }catch(err){
            console.error(err);
            
        }
    })
}