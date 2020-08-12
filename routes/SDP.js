const mariadb = require('mariadb');
require('dotenv').config();

const pool  = mariadb.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
   multipleStatements:true,
    database: `protect_service`,
    
});

exports.passwordCheck = async (id) =>{
    let conn = await pool.getConnection();
    try{
        let res = await conn.query('CALL DUPL_CHECK(?,@result,@passowrd);SELECT @result,@password',[id]);
        let values = {
                password:res[1][0]['@password'],
                result:res[1][0]['@result']
            };
        conn.release();
        console.log(values);
        return values;
    } catch(err){
        console.log(err);
        conn.release();
    }
   

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

exports.wSignin = async (id,pw) =>{
   let conn = await pool.getConnection();
   let res = await conn.query('CALL W_LOGIN(?,?,@result,@rwnsc,@rusn);SELECT @result,@rwnsc,@rusn;',[id,pw]);
   try{
    conn.release();
    return values = {
        result:res[1][0]['@result'],
        wnsc:res[1][0]['@rwnsc'],
        usn:res[1][0]['@rusn']
    }
    
   }catch(err){
    console.error(err);
    conn.release(
        
    );

   }
    
        
    }