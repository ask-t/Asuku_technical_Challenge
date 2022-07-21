

const axios = require('axios')

const options = {
    url: 'https://api.byu.edu:443/byuapi/persons/v3/249226495',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer 2bfde3c9859b4619b36b35e01528'
    }
}
axios(options).then(body =>{
    console.log(body.data)
})