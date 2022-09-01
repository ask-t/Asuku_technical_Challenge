/**
 * @file call club API, organaize, and show it.
 * @author Asuku Takahashi
 * Last edited: August 30, 2022 - orgnized jsdocs and add coments.
 */


const inp = require('./input');
const input = inp.input
const axios = require('axios');
const index = require('./token')
const token = index.token;
let keyCount;

  /**
 * call club API, organaize, and show it.
 * @returns {Promise<void>}
 */

async function page(){
    const clubs ={                                                                                                 // get the club information from clubs (v1) API
        url: `https://api.byu.edu:443/domains/byusa/clubs/v1/clubs`,
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    const a = axios(clubs).then(i =>{
        return i.data
    });
    let pageNum = 20;  // Please put the number how many club activities you want to show in a page.

    await a.then(i => {                                                                                         // show the club information
        i.forEach(i => {
            if(i.id < pageNum +1){
                console.log(i.id,i.name);
            }
        })
        keyCount  = i.slice(-1)[0].id;                                                                          // this is last number of club_activities.
            console.log(`\nLast club_id is ${keyCount}`);
    });


    let question;            // show the 20 club list in a page. By using switch, we can choose what people want to see the page.
    while(true){
        if( Number(question) >0 ) {
            switch(question){
                case question:
                    await a.then(i =>{
                        i.forEach(i =>{
                            if(i.id > Number(question)*pageNum -pageNum && i.id < Number(question)*pageNum+1){
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
                question = await input(`Please choose page number(1-${Math.floor(Number(keyCount)/pageNum+1)}). If you want to see detail, please write 'n' >> `);  // it shows how many pages there are.
                console.clear();
            }
    }
}

module.exports ={page};
