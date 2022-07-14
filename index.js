const axios = require('axios');
const aracle = require('oracledb');
oracle.outFormat = oracle.OBJECT
oracle.autoCommit = true;

const params = {
    user: process.env.user,
    password: process.env.password,
    connectString: 'cman1-dev.byu.edu:31200/cescpy1.byu.edu'
}

async function testOracleConnectivity(){
    try{
        console.log('Testing connection to on-prem OracleDb')
        const conn = await oracle.getConnection(params)
        const result = await conn.execute('select * from dual ')
        console.log(result.rows)
        await conn.close()
        console.log('Successfully connected to on-prem OracleDB')
    } catch(e) {
        console.error("Unable to create a connection to on-prem OracleDB")
        throw e
    }
}