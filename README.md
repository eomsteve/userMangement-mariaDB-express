# userMangement-mariaDB-express

<h1> maria db 요약</h1>
const mariadb = require('mariadb');
var pool  = mariadb.createPool({
    connectionLimit : 10,
    host: localhost,
    port: `3306`,
    user: `rooy`,
    pasword: `???`,
    database: `BeachDB`
});
let updateBeachInfo = (item) => {
    return new Promise(async (resolve)=> {
        let conn;
        try {
            conn = await pool.getConnection();
            let res = await conn.query(`UPDATE BEACH
                                            SET LASTUPDATE = DATE_FORMAT(NOW(), "%Y-%m-%d %H:%i:%s"),
                                                BEACHSTATE = ?
                                        WHERE BEACHNM = ?;`, [item.beachState, item.beachNm]);
            res = await conn.query(`INSERT INTO TRAFFIC_HISTORY (TRBEACHID, UPDATETIME, BEACHSTATE)
                                    VALUES ((SELECT BEACHID FROM BEACH WHERE BEACHNM = ?),DATE_FORMAT(NOW(), "%Y-%m-%d %H:%i:%s"), ?);`, [item.beachNm, item.beachState]);
        } catch (err) {
            console.log(item);
            console.log(err);
            resolve(false);
          throw err;
        } finally {
            if (conn) conn.release(); //release to pool
            resolve(true);
        }
    })
}
function main () {
    initBeachSignal();
    var j = schedule.scheduleJob('30 * * * *',async function(){
        let objBeachState = await getBeachInfo();
        if(objBeachState === false) return;
        updateBeachSignal(objBeachState);
    });
};
main(); (edited) 
















Message #의료기기사업

Thread
SeonghyunEom

