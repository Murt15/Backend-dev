const mysql=require('mysql2');

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs',
    password:'murt1234'
})

module.exports=pool.promise();