const aws = require('./aws');
const axios = require('axios');
const index = require('./token')
const db = require('./database');
const token = index.token;
const page = require('./page');
const detail = require('./detail');
const a = require('./input');
const input = a.input
let byu_id,name;




(async function intro(){
    let choose;
    const params = {
        user: await aws.db_name.then(i => i.Value),
        password: await aws.db_pass.then(i =>i.Value),
        connectString: 'cman1-dev.byu.edu:31200/cescpy1.byu.edu'
    }
    while(true){
        choose = await input(`Please choose function number\n1:Survey\n2:See database\n >>`);
        if (choose == '1' || choose == '2'){
            break;
        }
    }

    if(choose == '1'){
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
            }catch(e){                                                                                                   // if the id people enter is not existed, the process go back to the first question.
                console.log(`byu_id:${byu_id} is not existed. please enter your id again.\nif you fail many times, it should be that token is expired.`);
                continue;
            }
        }
        await db.testOracleConnectivity(params);                                                                           //check wether it is possible to access to the database
        db.createToTable (params);                                                                                               // To save the information into database, create new table.
        console.clear();
       await page.page();    // this function can separate the list from the API to be able to understand more easily.
       await detail.detail(byu_id,name,params);                        // this function can show more detail information of the clubs.
       console.log('Thank you for your corpolation.')
    }else if(choose == '2'){
        db.delete_db(params);
    }
})();
