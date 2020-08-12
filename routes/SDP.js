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
        console.log(values);
        
        return values;
    } catch(err){
        console.log(err);
        conn.release();
    }
}

exports.singupStore = async (fn,ln,addr,phn,id,pw,bdt) =>{
    let conn = await pool.getConnection();
    try{
    let res = await conn.query('CALL SIGN_UP(?,?,?,?,?,?,?,@result);SELECT @result',[fn,ln,addr,phn,id,pw,bdt]);
    console.log(res);
    
    let values = res[1][0]['@result'];
    try {
        conn.release();
    } catch (error) {
        values = 1;
        return values;
    }
    
    console.log(values);
    
    return values;
    }catch(err){
    console.error(err);
    conn.release();
    }
}

exports.signin = async (id,pw) =>{
   let conn = conn.query('CALL LOGIN(?,?,@result);SELECT @result',[id,pw]);
        
    }