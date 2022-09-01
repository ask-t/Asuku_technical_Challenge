/**
 * Survey of interest club_activities
 * This program shows the more specific informaiton of club activity.
 * @file Controls the flow of the program
 * @author Asuku Takahashi
 * Last edited: August 30, 2022 - orgnized jsdocs and add coments.
 */


const axios = require('axios');
const index = require('./token')
const token = index.token;
const db = require('./database');
const inp = require('./input');
const input = inp.input;
let D,club_id,club_name;

  /**
 * show more detail of each club activity.
 * @params it is take the data of byu_id and name from persons API also, it is necessary to use param which is token to be able to accless the database.
 * @returns {Promise<void>}
 */

async function detail(byu_id,name,params){                                                                          // show more detail about the clubs, and if people are interested in it, it is possible to save into this information into the database.
    let question, interest;
    console.log(name,byu_id);
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
            await db.addToTable (D,byu_id,name,club_id,club_name,params);                                             // save the information into the database.
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

module.exports = {detail};
