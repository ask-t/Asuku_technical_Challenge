
const byu_id = 249226495;
const token = 'aVo7KIX1TBOPDi7kSTf7eeph6I8gVkn8_vtixIOly5k.lI4HW8IjzBJNmVrxzYK7qJRgMLh08dLLd32BHTJ0y0E'
const axios =require('axios');
const options ={
    url:`https://api.byu.edu:443/byuapi/persons/v3/${byu_id}`,
    method: 'GET',
    headers:{
        'Authorization': `Bearer ${token}`
    }
}

const clubs ={
    url: `https://api.byu.edu:443/domains/byusa/clubs/v1/clubs`,
    method: 'GET',
    headers:{
        'Authorization': `Bearer ${token}`
    }

}

axios(clubs).then(i =>{

    console.log(i.data);
})


const vending = {
    url: `https://api.byu.edu:443/domains/byusa/clubs/v1/events/${id}`,
    method:'GET',
    headers:{
        'Authorization': `Bearer ${token}`
    }
}

// axios(options).then(i => {
//     console.log(i.data);
// })

