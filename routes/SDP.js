const mariadb = require('mariadb');
require('dotenv').config();

const pool  = mariadb.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
   multipleStatements:true,
    database: `protect_service`,
    
});

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

exports.duplicate = async (id)=>{
    let conn = await pool.getConnection();
    try{
        let res = await conn.query('CALL DUPL_CHECK(?,@result);SELECT @result',[id]);
        let values = res[1][0]['@result'];
        conn.release();
        return values;
    } catch(err){
        console.log(err);
        conn.release();
    }
}

exports.singupStore = async (fn,ln,addr,phn,id,pw,bdt) =>{
    let conn = await pool.getConnection();
    try{
    let res = conn.query('CALL SIGN_UP(?,?,?,?,?,?,?)',[fn,ln,addr,phn,id,pw,bdt]);
    let values = res[1][0]['@result'];
    conn.release();
    return values;
    
    }catch(err){
    console.error(err);
    conn.release();
    }
}

exports.signin = (id,pw) =>{
    conn.query('CALL LOGIN(?,?)',[id,pw],(err,result,fields)=>{
        try{
            console.log(result[0]);
            
        }catch(err){
            console.error(err);
            
        }
    })
}