// const byu_id = 249226495;
const axios = require('axios');
const oracle = require('oracledb');
oracle.outFormat = oracle.OBJECT;
oracle.autoCommit =true;
const token = 'RA6xlwrOu2T19plpLNXMwnWlfkc_0lOTp00XKdpfpDA.5Ow6cBL7yQeOHBF9KVtpjoof0ojTX94Kn2BRJ-nDnbg'
const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
const ssm = new AWS.SSM()
let D,club_id,club_name,byu_id,name,keyCount;


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

async function createToTable (params){
    try{
        const conn = await oracle.getConnection(params);
        await conn.execute('CREATE TABLE "OIT#ASKT24"."TEST_4"(	"ID" NUMBER GENERATED ALWAYS AS IDENTITY, "D" VARCHAR2(35 BYTE),  "BYU_ID" VARCHAR2(35 BYTE) NOT NULL ENABLE,  "FULL_NAME" VARCHAR2(100 BYTE), "INTERESTING_CLUB_ID" VARCHAR2(35 BYTE),  "INTERESTING_CLUB_NAME" VARCHAR2(100 BYTE))');
        await conn.close();
        console.log("Successfully added");
    } catch{
        console.log('the table has already created.')
    }
}

async function addToTable (D,byu_id,name,club_id,club_name,params){
    try{
        console.log(`\nAdds something to the table byu_id: ${byu_id} Name: ${name}`);
        const conn = await oracle.getConnection(params);
        await conn.execute('INSERT INTO oit#askt24.TEST_4 (D, BYU_ID, FULL_NAME, INTERESTING_CLUB_ID, INTERESTING_CLUB_NAME)' +
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

async function seeTable (params){
    try{
        const conn = await oracle.getConnection(params);
        let a = await conn.execute('select "ID", D as "Day",BYU_ID,full_name,interesting_club_id,interesting_club_name from oit#askt24.TEST_4');
        console.log(a);
        await conn.close();
    } catch (e){
        console.error(e)
        intro();
    }
}

async function delete_db(params){
    await testOracleConnectivity(params);
    while(true){
        try{await seeTable(params);
            let t_id;
            t_id = await input(`What ID would you like to delete? if you won't, please enter 'n'>> `);
            if(t_id == 'n' || t_id == 'N'){break;}else{
                const conn = await oracle.getConnection(params);
                await conn.execute(`delete test_4 where id = ${t_id}`);
                await conn.close();
                console.log(`Successfully deleted`)
            }
        }catch(e){
            console.error('failed to delete')
            console.error(e);
        }
    }
}



function input(question){                                                                                           // we need this function to use input method
    const readline = require('readline').createInterface({
        input:process.stdin,
        output:process.stdout
    });
    return new Promise( res => {
        readline.question(question,(answer)=> {
            res(answer);
            readline.close();
        });
    });
}

async function detail(byu_id,name,params){                                                                          // show more detail about the clubs, and if people are interested in it, it is possible to save into this information into the database.
    let question, interest;
    while(true){
        try{if(question == 'N'|| question == 'n'){
            break;}

        club_id = await input('What is your favorite ID? >> ');
        console.log(`Now we are shoing the information about ${club_id}!`);
        const club_s = {                                                                                            // call club API to show Details about single club
            url: `https://api.byu.edu:443/domains/byusa/clubs/v1/clubs/${club_id}`,
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }
        const b = axios(club_s).then(i => {
            return i.data
        });
        club_name = await b.then(i =>{return i.name});
        let today = new Date();                                                                                     // stock carrent time into variable.
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        D = today;

        await b.then(i => {                                                                                         // show the information
            console.log(`\n\nID: ${i.id}\nName:${i.name}\nPurpose: ${i.purpose}\n\nCreated: ${i.created}`);
        });

        interest = await input(`\nAre you interested in ${await b.then(i => i.id)}: ${club_name} ?? (y or n)`);
        if (interest == 'y' ||interest == 'Y' ){
            console.log(`${await b.then(i => i.id)}: ${await b.then(i => i.name)} is great!!`);
            await addToTable (D,byu_id,name,club_id,club_name,params);                                             // save the information into the database.
        }
        question ='';
        question =  await input("\nDo you want to see more another club information ? (y or n) >> ");
        console.clear();
    }catch(e){
        console.log('\nThis club_id is not existed. Please enter again.')                                         // if the club id people enter is not exsited, go back the first question in this function.
        continue;
    }
  }
}
async function page(clubs){                                                                                        // show the 20 club list in a page. By using switch, we can choose what people want to see the page.
    const a = axios(clubs).then(i =>{
        return i.data
    });
    let question;
    while(true){
        if( Number(question) >0 ) {
            switch(question){
                case question:
                    await a.then(i =>{
                        i.forEach(i =>{
                            if(i.id > Number(question)*20 -20 && i.id < Number(question)*20+1){
                                console.log(i.id,i.name)
                            }
                        })
                    })
                    break;
                default:
                    continue;
            }
        }

        if(question == 'n' || question =='N'){
            break;}else{
                question = await input(`Please choose page number(1-${Math.floor(Number(keyCount)/20+1)}). If you want to see detail, please write 'n' >> `);  // it shows how many pages there are.
                console.clear();
            }
    }
}

async function main (params){
    createToTable (params);                                                                                               // To save the information into database, create new table.
    console.clear();
    await testOracleConnectivity(params);                                                                           //check wether it is possible to access to the database
    while(true){
        try{
            byu_id = await input('What is your BYU ID? >> ');                                                       // collect student's information with person v3 API
            let question_1;
            const options ={
                url:`https://api.byu.edu:443/byuapi/persons/v3/${byu_id}`,
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
            const persons = axios(options).then(i => {
                return i.data
            });
            name = await persons.then(i =>{ return i.basic.name_fnf.value});                                       // stock name value in the variable
            question_1 = await input(`Your name is ${name}. Is it correct name?? >> (y or n)`);
            console.clear();
            if(question_1 == 'y'|| question_1 == 'Y'){
                console.clear();
                break;
            }
        }catch{                                                                                                   // if the id people enter is not existed, the process go back to the first question.
            console.log(`byu_id:${byu_id} is not existed. please enter your id again.\nif you fail many times, it should be that token is expired.`);
            continue;
        }
    }

    const clubs ={                                                                                                 // get the club information from clubs (v1) API
        url: `https://api.byu.edu:443/domains/byusa/clubs/v1/clubs`,
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }

    const a = axios(clubs).then(i =>{
        return i.data
    })

    await a.then(i => {                                                                                         // show the club information
        i.forEach(i => {
            if(i.id < 21){
                console.log(i.id,i.name);
            }
        })
        keyCount  = i.slice(-1)[0].id;                                                                          // show how many club activity are there
            console.log(`\nLast club_id is ${keyCount}`);
    });


    await page(clubs);                                                                                         // this function can separate the list from the API to be able to understand more easily.
    await detail(byu_id,name,params);                                                                          // this function can show more detail information of the clubs.
    console.log('Thank you for your corpolation.')

};


(async function intro(){
    const params_aws = {                                                                                       // fetch database id and pass word from AWS.
        Name: '/ask-technical-challenge/dev/DB-USERNAME',
        WithDecryption: true
        };
        const params_aws_p = {
          Name: '/ask-technical-challenge/dev/Pass',
          WithDecryption: true
          };
        let db_name = ssm.getParameter(params_aws).promise()
        db_name = db_name.then(data =>{
            return data.Parameter;
        });
        let db_pass = ssm.getParameter(params_aws_p).promise()
        db_pass = db_pass.then(data =>{
            return data.Parameter;
        });
      const params = {
          user: await db_name.then(i => i.Value),
          password: await db_pass.then(i =>i.Value),
          connectString: 'cman1-dev.byu.edu:31200/cescpy1.byu.edu'
      }
    let choose;
    while(true){
        choose = await input(`Please choose function number\n1:Survey\n2:See database\n >>`);
        if (choose == '1' || choose == '2'){
            break;
        }
    }

    if(choose == '1'){
        main(params);
    }else if(choose == '2'){
        delete_db(params);
    }
})();