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
    let result1;
    let conn = await pool.getConnection();
    try{
        let res = await conn.query('CALL DUPL_CHECK(?,@result);SELECT @result',[id]);
        let values = Object.values(res[1][0]['@result']);
        let keys = Object.keys(res[1][0]);
        console.log("key : "+keys,"values: "+values);
        
    } catch(err){
        console.log(err);
    }
    
        // try{
        //     console.log(result[0]);
        //     conn.release();
        //     return result[0];
            
        // }catch(err){
        //     console.error(err);
        // }
    //})
}

exports.singupStore = (fn,ln,addr,phn,id,pw,bdt) =>{
    conn.query('CALL SIGN_UP(?,?,?,?,?,?,?)',[fn,ln,addr,phn,id,pw,bdt],(err,result,fields) =>{
        try{
            console.log(result[0]);
            
        }catch(err){
            console.error(err);
            
        }
    })
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