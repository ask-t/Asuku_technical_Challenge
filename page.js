const inp = require('./input');
const input = inp.input
const axios = require('axios');
const index = require('./token')
const token = index.token;
let keyCount;

const clubs ={                                                                                                 // get the club information from clubs (v1) API
    url: `https://api.byu.edu:443/domains/byusa/clubs/v1/clubs`,
    method: 'GET',
    headers:{
        'Authorization': `Bearer ${token}`
    }
}
async function page(){
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
    });                                                                                    // show the 20 club list in a page. By using switch, we can choose what people want to see the page.

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

module.exports ={page};