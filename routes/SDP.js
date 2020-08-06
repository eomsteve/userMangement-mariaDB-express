const mariadb = require('mariadb');
const pool  = mariadb.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    pasword: 'djatjdgus1!',
    database: `proceduretest`,
    
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