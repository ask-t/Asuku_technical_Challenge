/**
 * @file This file has functions controll database with SQL.
 * @author Asuku Takahashi
 * Last edited: August 30, 2022 - orgnized jsdocs and add coments.
 */


const oracle = require('oracledb');
oracle.outFormat = oracle.OBJECT;
oracle.autoCommit =true;
const a = require('./input');
const input = a.input


  /**
 * check whether it is possible to access to the database.
 * @returns {Promise<void>}
 */
async  function testOracleConnectivity(params) {
try {
    console.log(' Testing connecting');
    const conn = await oracle.getConnection(params);
    const result = await conn.execute('SELECT * FROM DUAL');
    console.log(result.rows);
    await conn.close();
    console.log('Successfull to connect');
} catch (e) {
    console.error('Unable to connect into the database');
    throw e;
}
}

  /**
 * create new table if there is not the table for this program.
 * @params it is necessary to use param which is token to be able to accless the database.
 * @returns {Promise<void>}
 */
async function createToTable (params){
    try{
        const conn = await oracle.getConnection(params);
        await conn.execute('CREATE TABLE "OIT#ASKT24"."TABLE_1"(	"ID" NUMBER GENERATED ALWAYS AS IDENTITY, "D" VARCHAR2(35 BYTE),  "BYU_ID" VARCHAR2(35 BYTE) NOT NULL ENABLE,  "FULL_NAME" VARCHAR2(100 BYTE), "INTERESTING_CLUB_ID" VARCHAR2(35 BYTE),  "INTERESTING_CLUB_NAME" VARCHAR2(100 BYTE))');
        await conn.close();
        console.log("Successfully added");
    } catch{
        console.log('the table has already created.')
    }
}

  /**
 * add the table from the student information.
 * @params it is necessary to use param which is token to be able to accless the database. and other parameters from student information are necessary to add new table
 * @returns {Promise<void>}
 */
async function addToTable (D,byu_id,name,club_id,club_name,params){
    try{
        console.log(`\nAdds something to the table byu_id: ${byu_id} Name: ${name}`);
        const conn = await oracle.getConnection(params);
        await conn.execute('INSERT INTO oit#askt24.TABLE_1 (D, BYU_ID, FULL_NAME, INTERESTING_CLUB_ID, INTERESTING_CLUB_NAME)' +
        'VALUES (:D,:byu_id,:name,:club_id,:club_name)',
            [D,byu_id,name,club_id,club_name]);
        await conn.close();
        console.log("Successfully added");
    } catch (e){
        console.error("Unable to create new item on DB");
        console.error(e);
        intro();
    }
}

  /**
 * access the database and show the table.
 * @params it is necessary to use param which is token to be able to accless the database.
 * @returns {Promise<void>}
 */
async function seeTable (params){
    try{
        const conn = await oracle.getConnection(params);
        let a = await conn.execute('select "ID", D as "Day",BYU_ID,full_name,interesting_club_id,interesting_club_name from oit#askt24.TABLE_1');
        console.log(a);
        await conn.close();
    } catch (e){
        console.error(e)

    }
}

  /**
 * Choose ID and then it will be deleted in the database.
 * @params it is necessary to use param which is token to be able to accless the database.
 * @returns {Promise<void>}
 */

async function delete_db(params){
    await testOracleConnectivity(params);
    while(true){
        try{await seeTable(params);
            let t_id;
            t_id = await input(`What ID would you like to delete? if you won't, please enter 'n'>> `);
            if(t_id == 'n' || t_id == 'N'){break;}else{
                const conn = await oracle.getConnection(params);
                await conn.execute(`delete TABLE_1 where id = ${t_id}`);
                await conn.close();
                console.log(`Successfully deleted`)
            }
        }catch(e){
            console.error('failed to delete')
            console.error(e);
        }
    }
}
module.exports = {testOracleConnectivity, createToTable, addToTable, seeTable, delete_db}
