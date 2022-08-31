const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
const ssm = new AWS.SSM()

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

exports.db_name = db_name;
exports.db_pass = db_pass;


